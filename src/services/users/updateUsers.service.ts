import format from "pg-format"
import { IUserPatch, IUserRes } from "../../interfaces/user.interfaces"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"

const updataUserService = async (
  userId: number,
  newUserData: Partial<IUserPatch>
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
        "id", "name", "email", "admin", "active";
    `,
    Object.keys(newUserData),
    Object.values(newUserData)
  )

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  }

  const queryResult: QueryResult<IUserRes> = await client.query(queryConfig)

  return queryResult.rows[0]
}

export { updataUserService }
