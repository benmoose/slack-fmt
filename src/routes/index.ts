import { Router } from 'express'

import { checkVerificationToken } from '../utils/request'
import dispatcher from './dispatch'

const router = Router()

router.use(checkVerificationToken)
router.post('/', dispatcher)

export default router
