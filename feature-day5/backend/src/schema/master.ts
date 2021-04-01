import { gql } from 'apollo-server-express'

export default gql`
    type Query {
        login(username:String!, password:String!):Login
    }
    type Mutation {
        createMaster(username: String!, password: String!): String!
    }
    type Master {
        username: String
        id: Int
    }
    type Login {
        token: String!
    }
`