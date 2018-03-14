import { Request, Response } from 'express'
import { IFormatter } from '../../common/types'

/**
 * JSON formatter endpoint
 * @param {Request} req
 * @param {Response} res
 */
const format = (req: Request, res: Response) => {
  const responseUrl = req.body.response_url
  const text = req.body.text
  const parsed: object = JSON.parse(text)

  const message = {
    text: `\n${JSON.stringify(parsed, null, '\t')}`
  }
  res.json(message)
}

const jsonFormatter: IFormatter = {
  format
}

export default jsonFormatter
