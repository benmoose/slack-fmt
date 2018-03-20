const url = require('url')
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
  // prepare params to call Slack's API
  const params = {
    code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_SECRET
  }
  // call Slack oauth.access API
  axios.get(process.env.SLACK_OAUTH_ACCESS_URL, {
    params,
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
          // success! redirect to FMT's website
          // TODO: change this to redirect to the user's team
          return res.redirect(process.env.FMT_SITE_URL)
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
  const authorizeUrl = url.format({
    ...url.parse(process.env.SLACK_OAUTH_AUTHORISATION_PAGE),
    query: {
      client_id: process.env.SLACK_CLIENT_ID,
      scope: 'commands'
    }
  })

  // 302 to authorise endpoint
  return res.redirect(authorizeUrl)
}

export default { redirect, directInstall }
