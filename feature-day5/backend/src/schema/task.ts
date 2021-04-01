import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
        createTask(name:String!,memberId:Int!):String!
        updateTask(isDone:Boolean!, taskId:Int!):Task
    }
    type Task {
        id:Int!
        name:String!
        memberId:Int!
        isDone:Boolean!
    }

`