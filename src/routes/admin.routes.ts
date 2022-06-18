import { RequestHandler, Router } from 'express'
import passport from 'passport'
import { createProductController, createUserController, deleteProductController, deleteUserController, getUserController, getUsersController, getUsersStatsController, updateProductController, updateUserController } from '../controllers/admin.controllers'
import { roleVerifyService } from '../services/verifyRole.services'

const router = Router()

//User
/**
 * @verifyRoleService - as RequestHandler because it will throw error types.
 */

router.post('/create/user', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, createUserController)
router.put('/update/user', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, updateUserController)
router.put('/delete/user', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, deleteUserController)
router.get('/users', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, getUsersController)
router.get('/users/stats', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, getUsersStatsController)
router.get('/user/:id', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, getUserController)

//Products
router.post('/create/product', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, updateProductController)
router.put('/update/product/:id', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, createProductController)
//*soft delete
router.put('/delete/product/:id', passport.authenticate('jwt', {session: false}), roleVerifyService as RequestHandler, deleteProductController)




export default router