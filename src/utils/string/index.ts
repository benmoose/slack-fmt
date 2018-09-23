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

export function safeParseStrictJson (str: string): object {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}
