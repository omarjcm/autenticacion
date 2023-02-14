import { Router } from "express"
const router = Router()

import * as productCtrl from '../controllers/products.controller'

router.get('/:productId', productCtrl.getProductById)
router.get('/', productCtrl.getProducts)
router.post('/', productCtrl.createProduct)
router.put('/:productId', productCtrl.updateProductById)
router.delete('/:productId', productCtrl.deleteProductById)

export default router