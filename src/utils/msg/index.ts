import { IMessageConfig } from '../../common/types'

/**
 * Prepares a string for sending to Slack.
 * Adds a new line at the beginning and wraps the message
 * in multi-line code markdown.
 * @param {string} msg
 */
export function formatAsCodeBlock (msg: string): string {
  return `\`\`\`${msg}\`\`\``
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
