import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"

import { client } from "../database"
import { AppError } from "../error"

const ensureUserIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userEmail: string = req.body.email

  const queryString: string = `
    SELECT active
    FROM users
    WHERE email = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userEmail],
  }

  const queryResult: QueryResult = await client.query(queryConfig)

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401)
  }

  res.locals.user = queryResult.rows[0]

  return next()
}

export { ensureUserIsActive }
