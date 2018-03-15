import { Request, Response } from 'express'

import { IFormatter } from '../../common/types'
import { prepareString } from '../../utils/string'
import { createMessage, formatAsCodeBlock, parseMessageArgs } from '../../utils/msg'

/**
 * JSON formatter endpoint
 * @param {Request} req
 * @param {Response} res
 */
const format = (req: Request, res: Response) => {
  // parse arguments from the incoming string
  const args = parseMessageArgs(req.body.text)
  // sanitise text to format
  const text = prepareString(args.text)

  try {
    // try to parse the JSON
    const parsed = JSON.parse(text)
    // format the parsed JSON with tabs
    const formattedJson = JSON.stringify(parsed, null, ' '.repeat(args.spaces))
    // wrap in markdown codeblock characters
    const formattedText = formatAsCodeBlock(formattedJson)
    // get the message object to send to Slack
    const message = createMessage(formattedText, { ephemeral: false })
    res.json(message)
  } catch {
    // Parsing error, send back an error message to the user
    const message = createMessage('There was a syntax error in the JSON :cry:', {
      ephemeral: true
    })
    res.json(message)
  }
}

const jsonFormatter: IFormatter = { format }

export default jsonFormatter
