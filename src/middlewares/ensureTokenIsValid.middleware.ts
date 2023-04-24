import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken"

import { AppError } from "../error"

const ensureTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization

  if (!token) {
    throw new AppError("Missing Bearer Token", 401)
  }

  token = token.split(" ")[1]

  Jwt.verify(token, process.env.SECRET_KEY!, (err: any, decode: any) => {
    if (err) {
      throw new AppError(err.message, 401)
    }
  })

  res.locals.token = token

  return next()
}

export { ensureTokenIsValid }
