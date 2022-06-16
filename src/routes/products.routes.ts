import { Router } from 'express';
import { createProducts, deleteProducts, getProducts, updatedProducts } from '../controllers/products.controllers';

const router = Router();


router.get('/', getProducts);
router.post('/', createProducts);
router.put('/:id', updatedProducts);

//* soft delete, just updated deleted property to true.
router.put('/:id', deleteProducts);


export default router;