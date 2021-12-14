import express from 'express'
import passport from 'passport'

import {
  createBook,
  findBook,
  deleteBook,
  findAllBooks,
  updateBook,
} from '../controllers/books'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAllBooks)
router.get('/:bookId', findBook)
router.put(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  updateBook
)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
