import { parse } from 'qs'

import { IHandlerResponse } from './common/types'
import formatJson from './functions/format'
import { getDirectInstallUrl } from './functions/oauth'

export const slashCommand = async (event, context): Promise<IHandlerResponse> => {
    const body = parse(event.body)
    return {
        statusCode: 200,
        body: JSON.stringify(formatJson(body))
    }
}

export const directInstall = async (event, context): Promise<IHandlerResponse> => {
    return {
        statusCode: 302,
        headers: { location: getDirectInstallUrl() },
        body: null
    }
}
