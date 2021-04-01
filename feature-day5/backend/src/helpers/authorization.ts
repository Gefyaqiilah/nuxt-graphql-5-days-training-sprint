import { ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const authorization = (_, args, { userLogin }) => {
    return userLogin? skip : new ForbiddenError('not an authenticated user') 
}