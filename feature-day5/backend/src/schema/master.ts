import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        login(username:String!, password:String!):Login
    }
    extend type Mutation {
        createMaster(username: String!, password: String!): Master!
    }
    type Master {
        username: String
        id: Int
    }
    type Login {
        token: String!
    }
    extend type Subscription {
        masterCreated: MasterCreated!
    }
    type MasterCreated {
        master: Master!
    }
`