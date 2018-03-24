import * as argparse from 'argparse'
import { Request, Response } from 'express'

import { IFormatter } from '../../common/types'
import { prepareString } from '../../utils/string'
import { parseJsonString, parseMessageArgs } from '../../utils/parse'
import { getFmtCommands, createMessage, formatMessageText } from '../../utils/msg'

/**
 * JSON formatter endpoint
 * @param {Request} req
 * @param {Response} res
 */
const format = (req: Request, res: Response): Response => {
  const commands = getFmtCommands(req.body.text)
  const responses = []
  // iterate over each command
  commands.map((command) => {
    // parse arguments from the incoming string
    const args = parseMessageArgs(command)
    // check for parse errors
    if (args.error) {
      const message = createMessage(
  `There was a problem parsing your arguments, please double check them and try again.
  Remember, you can always type \`/help\` for extra info.`)
      return res.json(message)
    }
    // sanitise text to format
    const text = prepareString(args.text)
  
    try {
      // try to parse the JSON
      const parsed = parseJsonString(text)
      // format the parsed JSON with tabs
      const formattedJson = JSON.stringify(parsed, null, ' '.repeat(args.indent))
      // wrap in markdown codeblock characters
      const formattedText = formatMessageText(formattedJson, args.tag)
      responses.push(formattedText)
    } catch {
      // Parsing error, send back an error message to the user
      const message = createMessage(`Sorry, I couldn\'t parse \`${args.text}\``, {
        ephemeral: true
      })
      return res.json(message)
    }
  })
  // get the message object to send to Slack
  const message = createMessage(responses.join('\n \n'), { ephemeral: false })
  return res.json(message)
}

const jsonFormatter: IFormatter = { format }

export default jsonFormatter
