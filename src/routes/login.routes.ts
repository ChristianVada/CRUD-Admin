import { Router } from "express"

import { loginController } from "../controllers/login.controllers"
import { ensureUserIsActive } from "../middlewares/ensureUserIsActive.middleware"
import { ensureBodyisValidMiddleware } from "../middlewares/ensureBodyIsValid.middleware"
import { requestLoginSchema } from "../schemas/login.schemas"

const loginRouter = Router()

loginRouter.post(
  "",
  ensureBodyisValidMiddleware(requestLoginSchema),
  ensureUserIsActive,
  loginController
)

export { loginRouter }
