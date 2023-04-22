import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { AppError } from "../error"

const ensureUserIdExisits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = req.params.id

  const queryString: string = `
    SELECT 
      *
    FROM
      users
    WHERE
      id = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult = await client.query(queryConfig)

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404)
  }

  res.locals.user = queryResult.rows[0]

  return next()
}

export { ensureUserIdExisits }
