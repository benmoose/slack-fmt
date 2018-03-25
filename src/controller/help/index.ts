import { Request, Response } from 'express'

import { IFormatter } from '../../common/types'
import { createMessage } from '../../utils/msg'
import { createArgumentParser } from '../../utils/parse'

const format = (req: Request, res: Response): Response => {
  const parser = createArgumentParser()
  const message = createMessage(parser.formatHelp())
  return res.json(message)
}

const help: IFormatter = { format }

export default help
