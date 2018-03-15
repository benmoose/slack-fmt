import { Request } from 'express'
import { CommandType } from '../../common/types'

/**
 * Takes a request and returns a CommandType.
 */
export const getRequestCommandType = (req: Request): CommandType => {
  const text = req.body.text
  const isHelpCommand = /^help(?!\S)/i.test(text)
  return isHelpCommand ? CommandType.Help : CommandType.Format
}
