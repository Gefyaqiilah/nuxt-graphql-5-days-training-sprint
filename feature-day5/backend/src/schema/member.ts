import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        members(limit:Int!, page:Int!):[Member!]
        searchMember(name:String!):Member
    }
    extend type Mutation {
        createMember(name:String!):String!
    }
    type Member {
        name:String!
    }
`