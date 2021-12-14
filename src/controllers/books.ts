import { Request, Response, NextFunction } from 'express'

import booksModel from '../models/books'
import bookServices from '../services/books'
import { BadRequestError } from '../helpers/apiError'

// POST /movies
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, publishedYear, edition, borrowers, author } =
      req.body

    const book = new booksModel({
      name,
      category,
      publishedYear,
      edition,
      borrowers,
      author,
    })

    await bookServices.createBook(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /movies/:movieId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    //console.log('update', update)
    //console.log(bookId, 'bookid')
    const updatedBook = await bookServices.updateBook(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /movies/:movieId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookServices.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /movies/:movieId
export const findBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.findBook(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /movies
export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.findAllBooks())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
