import * as jsonic from 'jsonic'

import { isStrictJson } from '../../string'


/**
 * Attempts to parse a JSON string, first strictly, then relaxed.
 * Throws a SyntaxError if unable to parse the string.
 * @param str json string to parse, can be strict or relaxed
 */
export function parseJsonString (str: string): object {
  // attempt strict parse
  if (isStrictJson(str)) {
    return JSON.parse(str)
  }
  // not valid 'strict' JSON, try jsonic
  try {
    return jsonic(str)
  } catch {
    throw SyntaxError('Invalid JSON string')
  }
}