import { parse } from 'qs'
import axios from 'axios'

import { IHandlerResponse } from './common/types'
import { formatJson } from './functions/format'
import { getDirectInstallUrl, getAccessTokenFromCode } from './functions/oauth'

export const slashCommand = async (event, context): Promise<IHandlerResponse> => {
  const body = parse(event.body)
  const message = formatJson(body)
  return {
    statusCode: 200,
    body: JSON.stringify(message)
  }
}

export const authorise = async (event, content): Promise<IHandlerResponse> => {
  const code = event.queryStringParameters.code
  console.info(`Authorising from code: ${code}`)

  const accessToken = await getAccessTokenFromCode(code)
  if (!accessToken) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: `There was a problem authorising with Slack: could not get access token` })
    }
  }
  return {
    statusCode: 302,
    headers: { location: process.env.FMT_SUCCESS_LANDING_PAGE },
    body: null
  }
}

export const directInstall = async (event, context): Promise<IHandlerResponse> => {
  const directInstallUrl = getDirectInstallUrl()
  console.info(`redirecting to ${directInstallUrl}`)
  return {
    statusCode: 302,
    headers: { location: directInstallUrl },
    body: null
  }
}
