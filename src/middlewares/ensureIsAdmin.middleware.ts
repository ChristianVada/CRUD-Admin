import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken"
import { QueryConfig, QueryResult } from "pg"

import { AppError } from "../error"
import { client } from "../database"
import { IUser } from "../interfaces/user.interfaces"

const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token: string = res.locals.token

  const decodedToken: any = Jwt.verify(token!, process.env.SECRET_KEY!)

  const userId: string = decodedToken.sub

  const queryString: string = `
    SELECT admin FROM users 
    WHERE id = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult<IUser> = await client.query(queryConfig)

  const result = queryResult.rows[0].admin

  if (!result) {
    throw new AppError("Insufficient Permission", 403)
  }

  return next()
}

export { ensureIsAdmin }
