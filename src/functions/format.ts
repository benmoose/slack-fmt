import { prepareString } from '../common/utils/string'
import { parseJsonString, parseMessageArgs } from '../common/utils/parse'
import { createMessage, formatAsCodeBlock, isHelpCommand } from '../common/utils/msg'

/**
 * Format JSON from event body
 */
const formatJson = (body) => {
  // parse arguments from the incoming string
  const args = parseMessageArgs(body.text)
  if (isHelpCommand(args.text)) {
    return helpMessage
  }
  // sanitise text to format
  const text = prepareString(args.text)
  try {
    // try to parse the JSON
    const parsed = parseJsonString(text)
    // format the parsed JSON with tabs
    const formattedJson = JSON.stringify(parsed, null, ' '.repeat(args.spaces))
    // wrap in markdown codeblock characters
    const formattedText = formatAsCodeBlock(formattedJson)
    // get the message object to send to Slack
    return createMessage(formattedText, { ephemeral: false })
  } catch {
    // Parsing error, send back an error message to the user
    return createMessage('There was a syntax error in the JSON :cry:', {
      ephemeral: true
    })
  }
}

const helpMessage = createMessage(
  `*To format a string* type \`/fmt [spaces] json\`.
\t\`spaces\` _(optional, default 2)_
\t\tnumber of spaces to indent by. If 0 then the message is not formatted
\t\`json\`
\t\tjson string to format, either strict or relaxed JSON`,
  {ephemeral: true},
)

/**
 * const helpText = `*To format a string* type \`/fmt [spaces] json\`.
\t\`spaces\` _(optional, default 2)_
\t\tnumber of spaces to indent by. If 0 then the message is not formatted
\t\`json\`
\t\tjson string to format, either strict or relaxed JSON
  `
  const message = createMessage(helpText, {
    ephemeral: true
  })
 */

export default formatJson
