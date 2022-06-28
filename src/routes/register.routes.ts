import {Router} from 'express'
import { registerController } from '../controllers/register.controllers'
import { verifyEmailcontroller } from '../controllers/verifyEmail.controllers'

const router = Router()

router.post('/', registerController)
router.get('/verify-email', verifyEmailcontroller)


export default router;