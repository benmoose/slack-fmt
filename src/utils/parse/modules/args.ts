import { Namespace, ArgumentParser } from 'argparse'
import { IArguments } from '../../../common/types'

/**
 * Creates a parser capable of parsing any valid Fmt message.
 */
function createArgumentParser (): ArgumentParser {
  const parser = new ArgumentParser()
  // default error handler calls exit()
  // override this to throw error instead
  parser.error = (message) => {
    throw Error(message)
  }
  
  parser.addArgument(
    ['-i', '--indent'],
    {
      help: 'Number of spaces to indent with',
      type: 'int'
    }
  )
  parser.addArgument(
    ['-t', '--tag'],
    {
      help: 'Custom tag to add above the formatted JSON'
    }
  )

  return parser
}

/**
 * Parses out the parameters send in the message, returning them as an array.
 * @param msg message to parse
 */
export function parseMessageArgs (msg: string): IArguments {
  const parser = createArgumentParser()
  const defaults: IArguments = {
    indent: 2,
    type: 'json',
    text: ''
  }

  try {
    const args = parser.parseKnownArgs(msg.split(' '), new Namespace(defaults))
    return {
      ...args[0],
      text: args[1].join(' ')
    }
  } catch (error) {
    return {
      ...defaults,
      error
    }
  }
}
