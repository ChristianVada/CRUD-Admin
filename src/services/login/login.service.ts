import { QueryConfig, QueryResult } from "pg"
import * as bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken"

import {
  ILoginRequest,
  ILoginResponse,
} from "../../interfaces/login.interfaces"
import { client } from "../../database"
import { IUser } from "../../interfaces/user.interfaces"
import { AppError } from "../../error"

const loginService = async (
  userData: ILoginRequest
): Promise<ILoginResponse> => {
  const queryString: string = `
    SELECT *
    FROM users
    WHERE email = $1    
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userData.email],
  }

  const queryResult: QueryResult<IUser> = await client.query(queryConfig)

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401)
  }

  const comparePassword = bcrypt.compareSync(
    userData.password,
    queryResult.rows[0].password
  )

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401)
  }

  const token: string = Jwt.sign(
    { email: queryResult.rows[0].email },
    process.env.SECRET_KEY!,
    { expiresIn: "1d", subject: queryResult.rows[0].id.toString() }
  )

  return { token }
}

export { loginService }
