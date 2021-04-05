import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        tasks(limit:Int!, page:Int!):TasksFormat
    }
    extend type Mutation {
        createTask(name:String!,memberId:Int!):String!
        updateTask(isDone:Boolean!, taskId:Int!):Task
    }
    type TasksFormat {
        tasks: [Task!]
        pageInfo: pagination
    }
    type Task {
        id:Int!
        name:String!
        memberId:Int!
        isDone:Boolean!
    }
    Member:Member

`