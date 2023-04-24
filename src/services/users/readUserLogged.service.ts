import { QueryConfig, QueryResult } from "pg"

import { IUserRes } from "../../interfaces/user.interfaces"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/user.schemas"

const readUserLoggedService = async (userId: number): Promise<IUserRes> => {
  const queryString = `
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

  const result = responseUserSchema.parse(queryResult.rows[0])

  return result
}

export { readUserLoggedService }
