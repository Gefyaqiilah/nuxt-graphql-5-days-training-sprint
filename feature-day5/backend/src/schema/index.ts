import { gql } from 'apollo-server-express';
import master from './master'
import member from './member'
import task from './task'

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`

export default [linkSchema, master, member, task]