import passport from 'passport'
import googleTokenStratergy from 'passport-google-id-token'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import findOrCreate from '../controllers/login'
import userService from '../services/users'
import { NotFoundError } from '../helpers/apiError'
import usersModel, { usersDocument } from '../models/users'

import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from './../util/secrets'

export const googleStratergy = new googleTokenStratergy(
  {
    clientId: process.env.GOOGLE_CLINET_ID,
  },
  async (parsedToekn: any, googleId: any, done: any) => {
    //console.log(parsedToekn.payload.email)
    //console.log(parsedToekn.payload)
    const userDetail = parsedToekn.payload

    const user = await findOrCreate(userDetail)

    done(null, user) //2 arguments error and data u want to forward
  }
)

export const tokenStratergy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    //console.log('payload', payload)
    const email = payload.data.email
    const user = await usersModel.findOne({ email: email })
    if (!user) {
      throw new NotFoundError('user not found')
    }
    done(null, user)
  }
)
