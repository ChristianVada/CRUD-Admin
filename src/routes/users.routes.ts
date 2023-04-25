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
import { ensureCheckPermission } from "../middlewares/ensureCheckPermissiom.middleware"
import { ensureUserIsNotActive } from "../middlewares/ensureUserIsNotActive.middleware"

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
  ensureCheckPermission,
  ensureEmailNotExisits,
  updateUserController
)
userRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureCheckPermission,
  ensureUserIdExisits,
  deleteUserController
)
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValid,
  ensureIsAdmin,
  ensureUserIsNotActive,
  putUserController
)

export { userRoutes }
