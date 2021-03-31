import { gql } from 'apollo-server-express'

export const schema = gql`
type Query {
  students: [User!]
  me: User
  student(id: ID!): User
  messages: [Message!]!
  message(id: ID!): Message!
}
type User {
  username: String
  email: String
}
type Message {
  id: ID!,
  text: String!
  user: User!
}
type Mutation {
  createMessage(text: String!, id:Int!): Message!
}
`