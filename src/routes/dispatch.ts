/**
 * Dispatch looks at the incoming command and dispatches the request to the
 * appropriate endpoint.
 */

import { Request, Response } from 'express'
import controller from '../controller'

import { getRequestCommandType } from '../utils/request'
import { CommandType } from '../common/types';

const dispatcher = (req: Request, res: Response): void => {
  const type = getRequestCommandType(req)

  switch (type) {
    case CommandType.Help: {
      controller.help.format(req, res)
      // res.redirect('/help')
      break;
    }
    case CommandType.Format: {
      controller.json.format(req, res)
      // res.redirect('/format')
      break;
    }
    default: {
      res.status(400).send('Unknown command :cry:')
      break;
    }
  }
}

export default dispatcher
