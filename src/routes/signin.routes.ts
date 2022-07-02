import {Router} from 'express'

import { getUserInfoController, signinController } from '../controllers/signin.controllers';

import verifyEmail from '../middlewares/verification.middleware';

const router = Router()

router.post('/', signinController)

router.get('/user/:id', getUserInfoController)


export default router;