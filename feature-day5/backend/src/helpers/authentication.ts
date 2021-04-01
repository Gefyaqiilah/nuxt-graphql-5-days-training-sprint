import * as jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'

export const authentication = async req => {
    const headerAuth = req.headers['authorization']
    const token = headerAuth.split(' ')[1]
    if (token) {
        try {
            return await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        } catch (error) {
            throw new AuthenticationError('invalid token')
        }
    }
    return null
}