import { Router } from 'express'
// import controller from '../controller'
import dispatcher from './dispatch'

const router = Router()

router.post('/', dispatcher)

export default router
