import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"

import { client } from "../database"
import { AppError } from "../error"

const ensureUserIsNotActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = Number(req.params.id)

  const queryString: string = `
    SELECT active
    FROM users
    WHERE id = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult = await client.query(queryConfig)

  if (queryResult.rows[0].active === true) {
    throw new AppError("User already active", 400)
  }

  res.locals.user = queryResult.rows[0]

  return next()
}

export { ensureUserIsNotActive }
