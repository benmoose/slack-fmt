import { Router } from 'express'
import controller from '../../controller'

const router = Router()
router.get('/redirect', controller.oauth.redirect)

export default router
