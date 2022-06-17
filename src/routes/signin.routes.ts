import {Router} from 'express'
import { signinController } from '../controllers/signin.controllers';

const router = Router()

router.post('/', signinController)

export default router;