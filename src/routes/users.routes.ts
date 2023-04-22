import { Router } from "express"
import {
  createUsersController,
  deleteUserController,
  readAllUsersController,
  readUserLoggedController,
  updateUserController,
} from "../controllers/users.controllers"
import { ensureEmailNotExisits } from "../middlewares/ensureEmailNotExisits.middleware"
import { ensureUserIdExisits } from "../middlewares/ensureUserIdExists.midleware"
import { ensureBodyisValidMiddleware } from "../middlewares/ensureBodyIsValid.middleware"
import { requestUserSchema } from "../schemas/user.schemas"

const userRoutes: Router = Router()

userRoutes.post(
  "",
  ensureBodyisValidMiddleware(requestUserSchema),
  ensureEmailNotExisits,
  createUsersController
)
userRoutes.get("", readAllUsersController)
userRoutes.get("/profile", readUserLoggedController)
userRoutes.patch("/:id", ensureUserIdExisits, updateUserController)
userRoutes.delete("/:id", ensureUserIdExisits, deleteUserController)
userRoutes.put("/:id/recover")

export { userRoutes }
