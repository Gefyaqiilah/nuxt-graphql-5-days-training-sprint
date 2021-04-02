import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        members(limit:Int!, page:Int!):MembersFormat!
        member(id:Int!):MemberAndTaskFormat!
        searchMember(name:String!):Member
    }
    extend type Mutation {
        createMember(name:String!):String!
    }
    type MembersFormat {
        members: [Member!]
        pageInfo:pagination
    }
    type MemberAndTaskFormat {
        member: Member
        tasks: [Task!]
    }
    type Member {
        id: Int
        name:String!
    }
`