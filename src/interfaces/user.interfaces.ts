import { z } from "zod"

import {
  patchUserSchema,
  requestUserSchema,
  responseUserSchema,
  userSchema,
} from "../schemas/user.schemas"

type IUser = z.infer<typeof userSchema>

type IUserReq = z.infer<typeof requestUserSchema>

type IUserRes = z.infer<typeof responseUserSchema>

type IUserPatch = z.infer<typeof patchUserSchema>

export { IUser, IUserReq, IUserRes, IUserPatch }
