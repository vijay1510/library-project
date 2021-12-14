import mongoose, { Document } from 'mongoose'
//import { authorsModel } from './authors'

export type booksDocument = Document & {
  name: string
  category: string
  publishedYear: number
  edition: number
  borrowers: string[]
  author: string[]
}

const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
  },
  edition: {
    type: Number,
  },
  borrowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors',
    },
  ],
})

const booksModel = mongoose.model<booksDocument>('books', booksSchema)

export default booksModel
