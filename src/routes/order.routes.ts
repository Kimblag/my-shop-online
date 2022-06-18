import { RequestHandler, Router } from 'express'
import passport from 'passport'
import { createOrderController, deleteOrderController, getIncomeController, getOrdersController, getOrderUserController, updateOrderController } from '../controllers/order.controller'
import { roleVerifyService } from '../services/verifyRole.services'

const router = Router()

router.post('/', passport.authenticate('jwt', { session: false }), createOrderController)
router.put('/:id', passport.authenticate('jwt', { session: false }), roleVerifyService as RequestHandler, updateOrderController)
router.delete('/:id', passport.authenticate('jwt', { session: false }), roleVerifyService as RequestHandler, deleteOrderController)
router.get('/find/:userId', passport.authenticate('jwt', { session: false }), getOrderUserController)
router.get('/', passport.authenticate('jwt', { session: false }), roleVerifyService as RequestHandler, getOrdersController)

router.get('/income', passport.authenticate('jwt', { session: false }), roleVerifyService as RequestHandler, getIncomeController)


export default router