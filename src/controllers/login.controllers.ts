import { Request, Response } from "express"

import { ILoginRequest, ILoginResponse } from "../interfaces/login.interfaces"
import { loginService } from "../services/login/login.service"

const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: ILoginRequest = req.body
  const token: ILoginResponse = await loginService(userData)
  return res.status(200).json(token)
}

export { loginController }
