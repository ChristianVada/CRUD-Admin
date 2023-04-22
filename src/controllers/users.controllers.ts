import { Request, Response } from "express"
import { IUserPatch, IUserReq, IUserRes } from "../interfaces/user.interfaces"
import { createUsersService } from "../services/users/createUsers.service"
import { readAllUsersService } from "../services/users/readAllUsers.service"
import { updataUserService } from "../services/users/updateUsers.service"
import { deleteUserService } from "../services/users/deleteUser.service"
import { requestUserSchema } from "../schemas/user.schemas"

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
  // const id = res.body
  return res.json("entrou nessa rota")
}

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id)
  const newUserData: Partial<IUserPatch> = req.body

  const updateUser = await updataUserService(userId, newUserData)

  return res.json(updateUser)
}

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id)

  const deleteUser = await deleteUserService(userId)

  return res.send()
}

export {
  createUsersController,
  readAllUsersController,
  readUserLoggedController,
  updateUserController,
  deleteUserController,
}
