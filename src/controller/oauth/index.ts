import axios from 'axios'
import { Request, Response } from 'express'

const redirect = (req: Request, res: Response): Response => {
  const code: string = req.query.code
  const state: string = req.query.state
  const expectedState = 'commands'
  // check state matches and a code was provided
  if (state !== expectedState || !code) {
    return res.status(400).send()
  }
  const data = {
    code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_SECRET
  }
  // call Slack oauth.access API
  axios.post(process.env.SLACK_OAUTH_ACCESS_URL, data)
    .then((response) => {
      const { data, status } = response
      if (status === 200) {
        // slack sent us a response...
        const accessToken = data.access_token
        console.log(data)
        // check response
        if (data.ok && data.access_token) {
          // success!
          return res.status(200).send()
        }
      }
      return res.status(400).json({
        message: data.error || 'Error communicating with Slack'
      })
    })
}

export default { redirect }
