import { Namespace, ArgumentParser } from 'argparse'
import { IArguments } from '../../../common/types'

/**
 * Creates a parser capable of parsing any valid Fmt message.
 */
function createArgumentParser (): ArgumentParser {
  const parser = new ArgumentParser({ addHelp: false })
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
 * Takes an IArguments object and returns a copy with sanitised values.
 * @param args: IArguments
 */
function sanitiseArgs (args: IArguments): IArguments {
  const _args = args
  // check values
  if (_args.indent < 0) { _args.indent = Math.abs(_args.indent) }
  if (_args.indent > 8) { _args.indent = 8 }

  return _args
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
    const sanitisedArgs = sanitiseArgs(args[0])
    return {
      ...sanitisedArgs,
      text: args[1].join(' ')
    }
  } catch (error) {
    return {
      ...defaults,
      error
    }
  }
}
