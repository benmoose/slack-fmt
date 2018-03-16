import { Router, Response, Request } from 'express'

import controller from '../../controller'
import { checkVerificationToken } from '../../utils/request'
import { getRequestCommandType } from '../../utils/request'
import { CommandType } from '../../common/types'

const router = Router()

router.use(checkVerificationToken)
router.post('/', (req: Request, res: Response) => {
  const type = getRequestCommandType(req)

  switch (type) {
    case CommandType.Help: {
      return controller.help.format(req, res)
    }
    case CommandType.Format: {
      return controller.json.format(req, res)
    }
  }
  return res.status(400).send('Unknown command :cry:')
})

export default router
