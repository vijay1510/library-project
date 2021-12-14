import mongoose, { Document } from 'mongoose'

export type authorDocument = Document & {
  firstName: string
  lastName: string
  age: number
  activeSince: number
  books: string[]
}

const authorsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },
  activeSice: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'books',
    },
  ],
})

const authorsModel = mongoose.model<authorDocument>('authors', authorsSchema)

export default authorsModel
