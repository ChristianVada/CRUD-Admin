import { Request, Response } from "express"
import Jwt from "jsonwebtoken"

import { IUserPatch, IUserReq, IUserRes } from "../interfaces/user.interfaces"
import { createUsersService } from "../services/users/createUsers.service"
import { readAllUsersService } from "../services/users/readAllUsers.service"
import { updataUserService } from "../services/users/updateUsers.service"
import { deleteUserService } from "../services/users/deleteUser.service"
import { readUserLoggedService } from "../services/users/readUserLogged.service"
import { putUserService } from "../services/users/putUser.service"

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserReq = req.body
  const newUser: IUserRes = await createUsersService(userData)
  return res.status(201).json(newUser)
}

const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userResponse: Array<IUserRes> = await readAllUsersService()

  return res.status(200).json(userResponse)
}

const readUserLoggedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: string = res.locals.token

  const decodedToken: any = Jwt.verify(token!, process.env.SECRET_KEY!)

  const userId: number = Number(decodedToken.sub)

  const useResponse = await readUserLoggedService(userId)

  return res.status(200).json(useResponse)
}

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id)
  const newUserData: IUserPatch = req.body

  const updateUser = await updataUserService(userId, newUserData)

  return res.json(updateUser)
}

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id)

  const deleteUser = await deleteUserService(userId)

  if (!deleteUser) {
    return res.status(204).send()
  }

  return res.send()
}

const putUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id)

  const activeUser = await putUserService(userId)

  return res.status(200).json(activeUser)
}

export {
  createUsersController,
  readAllUsersController,
  readUserLoggedController,
  updateUserController,
  deleteUserController,
  putUserController,
}
