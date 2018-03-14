import { Request, Response } from 'express'

export interface IFormatter {
  format: (req: Request, res: Response) => void
}

export interface IController {
  json: IFormatter
}
