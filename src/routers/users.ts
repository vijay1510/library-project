import express from 'express'

import {
  createUser,
  findUser,
  deleteUser,
  findAllUsers,
  updateUser,
} from '../controllers/users'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAllUsers)
router.get('/:userId', findUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/', createUser)

export default router
