import express from 'express'

import {
  createAuthor,
  findAuthor,
  deleteAuthor,
  findAllAuthors,
  updateAuthor,
} from '../controllers/authors'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAllAuthors)
router.get('/:userId', findAuthor)
router.put('/:userId', updateAuthor)
router.delete('/:userId', deleteAuthor)
router.post('/', createAuthor)

export default router
