import * as jsonic from 'jsonic'

import { IArguments } from '../../../common/types'


/**
 * Attempts to parse a JSON string, first strictly, then relaxed.
 * Throws a SyntaxError if unable to parse the string.
 * @param str json string to parse, can be strict or relaxed
 */
export function parseJsonString (str: string): object {
  // attempt strict parse
  const strictJson = safeParseStrictJson(str)
  if (strictJson !== null || str === 'null') {
    return strictJson
  }
  // not valid 'strict' JSON, try jsonic
  try {
    return jsonic(str)
  } catch {
    throw SyntaxError('Invalid JSON string')
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
  const arg2 = msg.replace(/^\d+\s*/, '').trim()
  // format arg1 as a number if it exists
  const spaces = arg1 ? parseInt(arg1[0]) : 2

  return {
    spaces: spaces,
    type: 'json',
    text: arg2
  }
}

export function safeParseStrictJson (str: string): object {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

