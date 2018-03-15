import { Router } from 'express'
import controller from '../../controller'

const router = Router()
router.get('/redirect', controller.oauth.redirect)
router.get('/direct-install', controller.oauth.directInstall)

export default router
