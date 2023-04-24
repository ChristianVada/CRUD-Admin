import { QueryResult } from "pg"

import { client } from "../../database"
import { IUserRes } from "../../interfaces/user.interfaces"
import { arrayResponseUserSchema } from "../../schemas/user.schemas"

const readAllUsersService = async (): Promise<Array<IUserRes>> => {
  const queryString = `
    SELECT 
      *
    FROM
      users;
  `

  const queryResult: QueryResult<IUserRes> = await client.query(queryString)

  const userResponse = arrayResponseUserSchema.parse(queryResult.rows)

  return userResponse
}

export { readAllUsersService }
