import { QueryConfig, QueryResult } from "pg"

import { client } from "../../database"
import { IUserRes } from "../../interfaces/user.interfaces"
import { responseUserSchema } from "../../schemas/user.schemas"

const putUserService = async (userId: number): Promise<IUserRes> => {
  const queryString = `
    UPDATE users
    SET (active) = ROW(true)
    WHERE id = $1
    RETURNING *;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult<IUserRes> = await client.query(queryConfig)

  const result = responseUserSchema.parse(queryResult.rows[0])

  return result
}

export { putUserService }
