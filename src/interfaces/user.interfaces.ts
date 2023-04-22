import { TypeOf, z } from "zod"
import {
  requestUserSchema,
  responseUserSchema,
  userSchema,
} from "../schemas/user.schemas"

type IUser = z.infer<typeof userSchema>

type IUserReq = z.infer<typeof requestUserSchema>

type IUserRes = z.infer<typeof responseUserSchema>

// type IUserRes = z.infer<typeof >

// interface IUser {
//   id: number
//   name: string
//   email: string
//   password: string
//   admin: boolean
//   active: boolean
// }

// type IUserReq = Omit<IUser, "id" | "active">

// type IUserRes = Omit<IUser, "password">

// interface IUserPatch {
//   name: string
//   email: string
//   password: string
// }

export { IUser, IUserReq, IUserRes, IUserPatch }
