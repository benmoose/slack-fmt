import { parseJsonString, parseMessageArgs } from '../common/utils/parse'
import { createMessage, formatAsCodeBlock, isHelpCommand } from '../common/utils/msg'

/**
 * Format JSON from event body
 */
export const formatJson = (body) => {
  // parse arguments from the incoming string
  const args = parseMessageArgs(body.text)
  if (isHelpCommand(args.text)) {
    return helpMessage
  }
  if (!args.text.length) {
    return createMessage(formatAsCodeBlock('null'), { ephemeral: false })
  }
  try {
    const parsed = parseJsonString(args.text)
    const formattedJson = JSON.stringify(parsed, null, ' '.repeat(args.spaces))
    const formattedText = formatAsCodeBlock(formattedJson)

    return createMessage(formattedText, { ephemeral: false })
  } catch {
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
