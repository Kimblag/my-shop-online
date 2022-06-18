import { Router } from 'express'
import passport from 'passport'
import { createCartController, deleteCartController, getAllCartsController, getCartController, updateCartController } from '../controllers/cart.controllers'

const router = Router()

router.post('/', passport.authenticate('jwt', { session: false }), createCartController)

router.put('/:id', passport.authenticate('jwt', { session: false }), updateCartController)

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCartController)

router.get('/find/:userId', passport.authenticate('jwt', { session: false }), getCartController)

router.get('/', passport.authenticate('jwt', { session: false }), getAllCartsController)

export default router