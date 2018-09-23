import { parse } from 'qs'
import formatJson from './functions/format'

export const slashCommand = async (event, context) => {
    const body = parse(event.body)
    return {
        statusCode: 200,
        body: JSON.stringify(formatJson(body))
    }
}
