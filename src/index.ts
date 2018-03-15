import * as express from 'express'
import * as bodyParser from 'body-parser'
import routes from './routes'

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// register routes
app.use('/slack/slash-commands', routes)

app.listen(port, () => {
  console.log(`listening on :${port}`)
})
