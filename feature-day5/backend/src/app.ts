import * as http from 'http'
import * as express from 'express'
import * as cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import models from './models/index'
import schema from './schema/index'
import resolvers from './resolvers/index'
import { authentication } from './helpers/authentication'

const app = express()
app.use(cors())

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => {
        const message = error.message
        .replace('SequelizeValidationError :', '')
        .replace('Validation error :', '')

        return { ...error, message }
    },
    context: async ({ req, connection }) => {
        if (connection) {
            return {
                models
            }
        }
        if (req) {
            const userLogin = await authentication(req)
            return {
                models,
                userLogin
            }
        }
    }
})


server.applyMiddleware({app, path: '/graphql'})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

export default httpServer