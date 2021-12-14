import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'
import { googleStratergy, tokenStratergy } from './config/passport'
import loginRouter from './routers/login'
import movieRouter from './routers/movie'
import usersRouter from './routers/users'
import booksRouter from './routers/books'
import authorsRouter from './routers/authors'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(cors())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(passport.initialize())

//use passport stratergy
passport.use(googleStratergy)
passport.use(tokenStratergy)

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/google/login', loginRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/books', booksRouter)
app.use('/api/v1/authors', authorsRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
