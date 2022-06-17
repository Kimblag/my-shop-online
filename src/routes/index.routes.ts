import { Router } from 'express'
import productsRoutes from './products.routes'
import registerRoutes from './register.routes'
import signinRoutes from './signin.routes'

const router = Router()

router.use('/products', productsRoutes)
router.use('/register', registerRoutes)
router.use('/signin', signinRoutes)



export default router