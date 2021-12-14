import authorsModel, { authorDocument } from '../models/authors'
import { NotFoundError } from '../helpers/apiError'

const createAuthor = async (
  author: authorDocument
): Promise<authorDocument> => {
  return author.save()
}

const findAuthor = async (authorId: string): Promise<authorDocument> => {
  const foundMovie = await authorsModel.findById(authorId)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${authorId} not found`)
  }

  return foundMovie
}

const findAllAuthors = async (): Promise<authorDocument[]> => {
  return authorsModel.find() //.sort({ name: 1, publishedYear: -1 })
}

const updateAuthor = async (
  authorId: string,
  update: Partial<authorDocument>
): Promise<authorDocument | null> => {
  const foundMovie = await authorsModel.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${authorId} not found`)
  }

  return foundMovie
}

const deleteAuthor = async (
  authorId: string
): Promise<authorDocument | null> => {
  const foundMovie = authorsModel.findByIdAndDelete(authorId)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${authorId} not found`)
  }

  return foundMovie
}

export default {
  createAuthor,
  findAuthor,
  deleteAuthor,
  findAllAuthors,
  updateAuthor,
}
