import { parse } from 'qs'

import { IHandlerResponse } from './common/types'
import { getServiceEndpoint } from './common/utils/event'
import { formatJson } from './functions/format'
import { getDirectInstallUrl, getAccessTokenFromCode } from './functions/oauth'

const getRedirectUrlFromEvent = event => `${getServiceEndpoint(event)}/oauth/authorise`

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
  const redirectUrl = getRedirectUrlFromEvent(event)
  console.info(`Authorising from code: ${code}`)

  const accessToken = await getAccessTokenFromCode(code, redirectUrl)
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
  const redirectUrl = getRedirectUrlFromEvent(event)
  const directInstallUrl = getDirectInstallUrl(redirectUrl)

  console.info(`redirecting to ${directInstallUrl}`)
  return {
    statusCode: 302,
    headers: { location: directInstallUrl },
    body: null
  }
}
