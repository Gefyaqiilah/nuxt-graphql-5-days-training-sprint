import * as express from 'express'
import * as cors from 'cors'
import resolvers from './resolvers/index'
import schema from './schema/index'
import models from './models/index'
import { ApolloServer } from 'apollo-server-express'

export const app = express()

app.use(cors())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models
  }
})

server.applyMiddleware({ app, path: '/graphql' })