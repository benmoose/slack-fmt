import { IController } from '../common/types'
import oauth from './oauth'
import help from './help'
import json from './json'

const controller: IController = {
  oauth,
  help,
  json
}

export default controller
