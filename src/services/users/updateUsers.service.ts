import format from "pg-format"
import { QueryConfig, QueryResult } from "pg"

import { IUserPatch, IUserRes } from "../../interfaces/user.interfaces"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/user.schemas"

const updataUserService = async (
  userId: number,
  newUserData: IUserPatch
): Promise<IUserRes> => {
  const queryString: string = format(
    `
      UPDATE 
        users
      SET 
        (%I) = ROW(%L)
      WHERE 
        id = $1
      RETURNING
        *
    `,
    Object.keys(newUserData),
    Object.values(newUserData)
  )

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult<IUserRes> = await client.query(queryConfig)

  const parseUser = responseUserSchema.parse(queryResult.rows[0])

  return parseUser
}

export { updataUserService }
