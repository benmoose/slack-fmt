import { Request, Response } from 'express'

import { IFormatter } from '../../common/types'
import { createMessage, formatAsCodeBlock, parseMessageArgs } from '../../utils/msg'

const format = (req: Request, res: Response) => {
  const helpText = `*To format a string* type \`/fmt [spaces] json\`.
\t\`spaces\` _(optional, default 2)_
\t\tnumber of spaces to indent by. If 0 then the message is not formatted
\t\`json\`
\t\tjson string to format, either strict or relaxed JSON
  `
  const message = createMessage(helpText, {
    ephemeral: true
  })
  res.json(message)
}

const help: IFormatter = { format }

export default help
