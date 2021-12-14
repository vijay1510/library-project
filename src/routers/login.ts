import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './../util/secrets'
import { usersDocument } from '../models/users'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as usersDocument
    //console.log(user, 'user')

    const newToken = jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '2h' })

    res.json(newToken)
  }
)

export default router
