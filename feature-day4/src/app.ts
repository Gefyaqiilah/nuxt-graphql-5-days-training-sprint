import * as express from 'express'
import * as cors from 'cors'
import {resolvers} from './configs/resolvers'
import {schema} from './configs/schema'
import models from './models/index' 
import { ApolloServer } from 'apollo-server-express'

export const app = express()

app.use(cors())

const students = {
  1: {
    id: '1',
    username: 'Gefy aqiilah',
    email: 'gefy@gmail.com'
  },
  2: {
    id: '2',
    username: 'sahira',
    email: 'sahira@gmail.com'
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: students[1]
  }
})

server.applyMiddleware({ app, path: '/graphql' })