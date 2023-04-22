import format from "pg-format"
import { IUserReq, IUserRes } from "../../interfaces/user.interfaces"
import { QueryResult } from "pg"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/user.schemas"

const createUsersService = async (userData: IUserReq): Promise<IUserRes> => {
  const queryString: string = format(
    `
      INSERT INTO users(%I)
      VALUES (%L)
      RETURNING *;
    `,
    Object.keys(userData),
    Object.values(userData)
  )

  const queryResult: QueryResult<IUserRes> = await client.query(queryString)

  const newUser = responseUserSchema.parse(queryResult.rows[0])

  return newUser
}

export { createUsersService }
