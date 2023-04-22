import { QueryConfig, QueryResult } from "pg"
import { IUserRes } from "../../interfaces/user.interfaces"
import { client } from "../../database"

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

  return queryResult.rows[0]
}

export { readUserLoggedService }
