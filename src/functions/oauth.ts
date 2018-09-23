const assert = require('assert')
import { URL } from 'url'
import { stringify } from 'qs'

export const getDirectInstallUrl = () => {
    const qs = stringify({
        client_id: process.env.SLACK_CLIENT_ID,
        scope: 'commands'
    })
    return new URL(`${process.env.SLACK_OAUTH_AUTHORISATION_PAGE}?${qs}`).href
}
