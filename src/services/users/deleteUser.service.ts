import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { IUserRes } from "../../interfaces/user.interfaces"

const deleteUserService = async (userId: number): Promise<void> => {
  const queryString = `
    DELETE FROM users
    WHERE id = $1;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult<IUserRes> = await client.query(queryConfig)

  return
}

export { deleteUserService }
