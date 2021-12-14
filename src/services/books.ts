import booksModel, { booksDocument } from '../models/books'
import { NotFoundError } from '../helpers/apiError'

const createBook = async (books: booksDocument): Promise<booksDocument> => {
  return books.save()
}

const findBook = async (bookId: string): Promise<booksDocument> => {
  const foundBooks = await booksModel.findById(bookId)

  if (!foundBooks) {
    throw new NotFoundError(`book ${bookId} not found`)
  }

  return foundBooks
}

const findAllBooks = async (): Promise<booksDocument[]> => {
  return booksModel.find() //.sort({ name: 1, publishedYear: -1 })
}

const updateBook = async (
  bookId: string,
  update: Partial<booksDocument>
): Promise<booksDocument | null> => {
  const foundBook = await booksModel.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<booksDocument | null> => {
  const foundBook = booksModel.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`book ${bookId} not found`)
  }

  return foundBook
}

export default {
  createBook,
  findBook,
  deleteBook,
  findAllBooks,
  updateBook,
}
