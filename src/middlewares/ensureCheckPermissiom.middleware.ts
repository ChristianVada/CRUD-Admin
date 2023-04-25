import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import Jwt from "jsonwebtoken"

import { client } from "../database"
import { AppError } from "../error"
import { IUser } from "../interfaces/user.interfaces"

const ensureCheckPermission = async (
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

  const isAdms = queryResult.rows[0].admin

  if (!isAdms && userId !== req.params.id) {
    throw new AppError("Insufficient Permission", 403)
  }

  return next()
}

export { ensureCheckPermission }
