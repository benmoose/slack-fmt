import { Request, Response } from 'express'

export interface IFormatter {
  format: (body: object) => object
}

export interface IController {
  help: IFormatter,
  json: IFormatter,
  oauth
}

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

/**
 * Command type
 * @enum {number}
 */
export enum CommandType {
  Help,
  Format
}
