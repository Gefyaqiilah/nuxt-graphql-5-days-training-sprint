import { gql } from 'apollo-server-express'

export default gql`
  union ToDoResult = ToDo | Error
  
  extend type Query {
    todos: [ToDo!]
    todo(id:Int!):ToDo
  }
  extend type Mutation {
    createTask(task: String!):ToDo!
    deleteTask(id:Int!):String!
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