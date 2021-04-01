import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    todos: [ToDo!]
    todo(id:Int!):ToDo
  }
  extend type Mutation {
    createTask(task: String!):ToDo!
    deleteTask(id:Int!):String!
    updateTask(id:Int!, task:String!):ToDo
  }
  type ToDo {
    id: ID!
    task: String!
    createdAt: String!
    updatedAt: String!
  }
  type Error {
    message: String!
  }
`