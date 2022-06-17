import {Router} from 'express'
import { registerController } from '../controllers/register.controllers'
import { verifyEmailcontroller } from '../controllers/verifyEmail.controllers'

const router = Router()

router.post('/', registerController)


export default router;