/**
 * Serverless backend for FMT slash commands and OAUTH integration.
 */

import * as express from 'express'
import * as serverless from 'serverless-http'
import * as bodyParser from 'body-parser'

import routes from './routes'

// load .env file (if in dev environment)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const app = express()

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// install routes
app.use('/oauth', routes.oauth)
app.use('/slash-commands', routes.slashCommands)

if (process.env.NODE_ENV === 'production') {
  module.exports.handler = serverless(app)
} else {
  app.listen(3000, () => {
    console.log('server listening on :3000')
  })
}
