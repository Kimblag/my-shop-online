import { Router } from "express";
import passport from "passport";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/wishlist.controllers";

const router = Router()

router.post('/add',passport.authenticate('jwt', {session: false}), addFavorite)
router.put('/remove', passport.authenticate('jwt', {session: false}), removeFavorite)
router.get('/:userId', passport.authenticate('jwt', {session: false}), getFavorites) 

export default router