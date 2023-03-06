# Autorizacion & Autenticacion

## Autenticación

Se hace el uso de las funciones:

```javascript
userSchema.statics.encrypted_password = (password) => {
    const salt = bcryptjs.genSaltSync()
    return bcryptjs.hashSync(password, salt)
}

userSchema.statics.compare_password = (password, received_password) => {
    return bcryptjs.compareSync(password, received_password)
}
```

Que permiten encriptar el password y luego comparar la clave ingresada en el formulario con la clave encriptada en la base de datos.

```javascript
export const signUp = async (req, res) => {
    try {
        const {username, email, password, roles} = req.body
        const new_user = new User({ 
            username, 
            email, 
            password: User.encrypted_password(password) 
        })
        if (roles) {
            const found_roles = await Role.find({name: {$in: roles}})
            new_user.roles = found_roles.map( role => role._id )
        } else {
            const role = await Role.find({name: 'user'})
            new_user.roles = [role._id]
        }
        const saved_user = await new_user.save()
        const token = jwt.sign({ id:saved_user._id }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        })
        res.status(200).json({token})
    } catch(error) {
        console.log(error);
        return res.status(500).json({token: null, message: 'Internal server error'});
    }
}
```

## Autorización

En cambio, para que se pueda ingresar a alguna funcionalidad se debe utilizar los routeos de la siguiente manera:

```javascript
import { Router } from "express"
const router = Router()

import * as productCtrl from '../controllers/products.controller'
import { auth_jwt } from '../middlewares'

router.get('/:productId', auth_jwt.verify_token, productCtrl.getProductById)
router.get('/', auth_jwt.verify_token, productCtrl.getProducts)
router.post('/', [auth_jwt.verify_token, auth_jwt.is_moderator], productCtrl.createProduct)
router.put('/:productId', [auth_jwt.verify_token, auth_jwt.is_admin], productCtrl.updateProductById)
router.delete('/:productId', [auth_jwt.verify_token, auth_jwt.is_admin], productCtrl.deleteProductById)

export default router
```

Dependiendo, del rol que se tenga, se tiene acceso a la funcionalidad correspondiente.
