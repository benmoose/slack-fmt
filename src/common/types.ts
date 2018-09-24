/**
 * Handler Resonse
 */
export interface IHandlerResponse {
  statusCode: number,
  body?: string,
  headers?: object
}

/**
 * Config for createMessage
 */
export interface IMessageConfig {
  ephemeral?: boolean
}

/**
 * Arguments object to the slash command
 */
export interface IArguments {
  spaces: number,
  type: string,
  text: string
}
