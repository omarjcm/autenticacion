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