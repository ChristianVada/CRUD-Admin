import { QueryConfig, QueryResult } from "pg"

import { client } from "../../database"
import { IUserRes } from "../../interfaces/user.interfaces"

const deleteUserService = async (userId: number): Promise<boolean> => {
  const queryString = `
    UPDATE users
    SET (active) = ROW(false)
    WHERE id = $1
    RETURNING *;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult<IUserRes> = await client.query(queryConfig)

  const result = queryResult.rows[0].active

  return result
}

export { deleteUserService }
