import usersModel, { usersDocument } from '../models/users'
import { NotFoundError } from '../helpers/apiError'

const createUser = async (user: usersDocument): Promise<usersDocument> => {
  return user.save()
}

const findUser = async (userId: string): Promise<usersDocument> => {
  const foundUser = await usersModel.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

const findAllUsers = async (): Promise<usersDocument[]> => {
  return usersModel.find() //.sort({ firstName: 1 })
}

const updateUser = async (
  userId: string,
  update: Partial<usersDocument>
): Promise<usersDocument | null> => {
  const foundUser = await usersModel.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<usersDocument | null> => {
  const foundUser = usersModel.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

const findOrCreate = async (user: usersDocument) => {
  const foundUser = await usersModel.findOne({ email: user.email })
  //console.log(foundUser, 'founduser')

  if (!foundUser) {
    return createUser(user)
  }
  return foundUser
}

export default {
  createUser,
  findUser,
  findAllUsers,
  updateUser,
  deleteUser,
  findOrCreate,
}
