import { Router } from "express";
import passport from "passport";
import { passwordUpdateController, userUpdateController, forgotPasswordController, createNewPasswordController } from "../controllers/user.controllers";

const router = Router()

router.put('/update', passport.authenticate('jwt', {session: false}), userUpdateController)
router.post('/password', passport.authenticate('jwt', { session: false }), passwordUpdateController)
router.post('/forgotpassword', forgotPasswordController)
router.post('/newpassword/:token', createNewPasswordController)

export default router