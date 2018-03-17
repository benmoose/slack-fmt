import { IMessageConfig, IArguments } from '../../common/types'

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

/**
 * Parses out the parameters send in the message, returning them as an array.
 * @param msg message to parse
 */
export function parseMessageArgs (msg: string): IArguments {
  // arg1 -> spaces
  const arg1 = msg.match(/^\d+/)
  // arg2 -> text to format
  const arg2 = msg.replace(/^\d+\s*/, '')

  // format arg1 as a number if it exists
  const spaces = arg1 ? parseInt(arg1[0]) : 2

  return {
    spaces: spaces,
    type: 'json',
    text: arg2
  }
}
