import { Router } from 'express'
// import controller from '../controller'
import dispatcher from './dispatch'

const router = Router()

router.post('/', dispatcher)
// router.post('/help', controller.help.format)
// router.post('/json', controller.json.format)

export default router
