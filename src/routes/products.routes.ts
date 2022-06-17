import { Router } from 'express'
import { createProducts, deleteProduct, getProduct, getProducts, updatedProducts } from '../controllers/products.controllers'

const router = Router()


router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', createProducts)
router.put('/:id', updatedProducts)

//* soft delete, just updated deleted property to true.
router.put('/delete/:id', deleteProduct)


export default router;