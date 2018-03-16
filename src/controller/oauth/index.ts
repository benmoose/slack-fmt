import * as url from 'url'
import axios from 'axios'
import { Request, Response } from 'express'

const redirect = (req: Request, res: Response): Response => {
  const code: string = req.query.code
  // check state matches and a code was provided
  if (!code) {
    return res.status(400).json({
      message: 'Missing \'code\' parameter'
    })
  }
  // prepare data to call Slack's API
  const data = {
    code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_SECRET
  }
  // call Slack oauth.access API
  axios.post(process.env.SLACK_OAUTH_ACCESS_URL, data, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response) => {
      const { data, status } = response
      if (status === 200) {
        // slack sent us a response...
        const accessToken = data.access_token
        // check response
        if (data.ok && data.access_token) {
          // success!
          return res.status(200).json({ message: 'App installed!' })
        }
      }
      return res.status(400).json({
        message: data.error || 'Error communicating with Slack'
      })
    })
}

/**
 * Direct install endpoint
 * https://api.slack.com/slack-apps#direct_install
 * @param req
 * @param res
 */
const directInstall = (req: Request, res: Response): void => {
  // build authorisation URL
  const authorizeUrl = url.parse(process.env.SLACK_OAUTH_AUTHORISATION_PAGE)
  authorizeUrl.query = {
    client_id: process.env.SLACK_CLIENT_ID,
    scope: 'commands'
  }
  // 302 to authorise endpoint
  return res.redirect(url.format(authorizeUrl))
}

export default { redirect, directInstall }
