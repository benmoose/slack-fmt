import axios from 'axios'
import { stringify } from 'qs'
import { URL } from 'url'

export const getDirectInstallUrl = () => {
  const qs = stringify({
    client_id: process.env.SLACK_CLIENT_ID,
    scope: 'commands',
    redirect_uri: `${process.env.SERVICE_ENDPOINT}/oauth/authorise`,
  })
  return new URL(`${process.env.SLACK_OAUTH_AUTHORISATION_PAGE}?${qs}`).href
}

export const getAccessTokenFromCode = (code) => {
  const data = {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    redirect_uri: `${process.env.SERVICE_ENDPOINT}/oauth/authorise`,
    code,
  }

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return axios.post('https://slack.com/api/oauth.access', stringify(data), config)
    .then(response => response.data)
    .then((data) => {
      console.info(`Got response from Slack authorisation request: ${JSON.stringify(data)}`)
      return data.ok ? data.access_token : null
    })
    .catch((error) => {
      console.error(`Error from Slack authorisation request: ${error}`)
      return null
    })
}
