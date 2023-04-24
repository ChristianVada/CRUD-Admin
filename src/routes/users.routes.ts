import { Router } from "express"

import {
  createUsersController,
  deleteUserController,
  putUserController,
  readAllUsersController,
  readUserLoggedController,
  updateUserController,
} from "../controllers/users.controllers"
import { ensureEmailNotExisits } from "../middlewares/ensureEmailNotExisits.middleware"
import { ensureUserIdExisits } from "../middlewares/ensureUserIdExists.midleware"
import { ensureBodyisValidMiddleware } from "../middlewares/ensureBodyIsValid.middleware"
import { patchUserSchema, requestUserSchema } from "../schemas/user.schemas"
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware"
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware"

const userRoutes: Router = Router()

userRoutes.post(
  "",
  ensureBodyisValidMiddleware(requestUserSchema),
  ensureEmailNotExisits,
  createUsersController
)
userRoutes.get("", ensureTokenIsValid, ensureIsAdmin, readAllUsersController)
userRoutes.get("/profile", ensureTokenIsValid, readUserLoggedController)
userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureBodyisValidMiddleware(patchUserSchema),
  ensureUserIdExisits,
  ensureEmailNotExisits,
  updateUserController
)
userRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureUserIdExisits,
  deleteUserController
)
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValid,
  ensureIsAdmin,
  putUserController
)

export { userRoutes }
