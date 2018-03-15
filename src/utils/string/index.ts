const jsonic = require('jsonic')

/**
 * Takes a string and returns a copy with preceding / trailing quotes removed.
 * will err if the string has quotes.
 * @param str string to strip
 */
export function stripQuotes (str: string): string {
  // does the string start with
  return str
    .replace(/^("|')/, '')
    .replace(/("|')$/, '')
}

/**
 * Prepares a string for JSON.parse by removing extronous whitespace and
 * any outside quotes that would cause an error.
 * @param str string to prepare
 */
export function prepareString (str: string): string {
  return stripQuotes(str.trim())
}

function isValidJson (str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Attempts to parse a JSON string, first strictly, then relaxed.
 * Throws a SyntaxError if unable to parse the string.
 * @param str json string to parse, can be strict or relaxed
 */
export function parseJsonString (str: string): object {
  // attempt strict parse
  if (isValidJson(str)) {
    return JSON.parse(str)
  }
  // not valid 'strict' JSON, try jsonic
  try {
    return jsonic(str)
  } catch {
    throw SyntaxError('Invalid JSON string')
  }
}
