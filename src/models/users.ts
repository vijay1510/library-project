import mongoose, { Document } from 'mongoose'

export type usersDocument = Document & {
  firstName: string
  lastName: string
  email: string
  phone?: number
  age?: number
  libraryPass?: boolean
  borrowedBooks?: string[]
}

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  age: {
    type: Number,
  },
  libraryPass: {
    type: Boolean,
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'books',
    },
  ],
})

const usersModel = mongoose.model<usersDocument>('users', usersSchema)

export default usersModel
