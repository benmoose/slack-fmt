import querystring from 'querystring'
import formatJson from './functions/format'

export const slashCommand = async (event, context) => {
    const body = querystring.parse(event.body)
    return {
        statusCode: 200,
        body: JSON.stringify(formatJson(body))
    }
}
