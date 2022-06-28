import {Router} from 'express'
import { signinController } from '../controllers/signin.controllers';
import verifyEmail from '../middlewares/verification.middleware';

const router = Router()

router.post('/', verifyEmail, signinController)

export default router;