import {Router} from 'express'

const router = Router()

router.post('/', (req, res) => {
    res.send('Signin')
})

export default router;