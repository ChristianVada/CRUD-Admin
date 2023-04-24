import format from "pg-format"
import { QueryResult } from "pg"
import * as bcrypt from "bcryptjs"

import { IUserReq, IUserRes } from "../../interfaces/user.interfaces"
import { client } from "../../database"
import { responseUserSchema } from "../../schemas/user.schemas"

const createUsersService = async (userData: IUserReq): Promise<IUserRes> => {
  userData.password = bcrypt.hashSync(userData.password, 10)

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
