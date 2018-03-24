import { IMessageConfig } from '../../common/types'

export function getFmtCommands (text: string): string[] {
  const sep = /\s*(\r\n)*\/fmt\s*/gi
  const commands = text.split(sep)
  return commands
    .filter(cmd => !!cmd)
    .map(cmd => cmd.trim())
}

/**
 * Prepares a string for sending to Slack.
 * Adds a new line at the beginning and wraps the message
 * in multi-line code markdown.
 * @param {string} msg
 */
export function formatMessageText (text: string, tag?: string): string {
  const wrappedTag = tag && `*${tag}*`
  const wrappedText = `\`\`\`${text}\`\`\``
  return [wrappedTag, wrappedText]
    .filter(part => !!part)
    .join('\n')
}

/**
 * Returns an object which is ready to be serialised to JSON and sent
 * back to Slack.
 * @param {string} msg message to send (make sure it's correctly formatted)
 * @param {IMessageConfig} config configure the message
 */
export function createMessage (msg: string, config: IMessageConfig = {}): object {
  const { ephemeral = true } = config
  return {
    text: msg,
    response_type: ephemeral ? 'ephemeral' : 'in_channel'
  }
}
