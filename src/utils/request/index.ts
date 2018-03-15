import { Request, Response, NextFunction } from 'express'
import { CommandType } from '../../common/types'

/**
 * Takes a request and returns a CommandType.
 */
export function getRequestCommandType (req: Request): CommandType {
  const text = req.body.text
  const isHelpCommand = /^help(?!\S)/i.test(text)
  return isHelpCommand ? CommandType.Help : CommandType.Format
}

export function checkVerificationToken (req: Request, res: Response, next: NextFunction): Response {
  if (req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    return res.status(403).send()
  }
  next()
}
