/* eslint-disable @typescript-eslint/camelcase */
import usersModel, { usersDocument } from '../models/users'
import { NotFoundError } from '../helpers/apiError'
import userService from '../services/users'

const findOrCreate = async (users: any) => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { given_name, family_name, email } = users

  const user = new usersModel({
    firstName: given_name,
    lastName: family_name,
    email,
  })

  await userService.createUser(user)
  const foundUser = userService.findOrCreate(users)
  return foundUser
}

export default findOrCreate
