import { gql } from 'graphql-request'

export const login = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`
export const createMaster = gql`
  mutation createNewMaster($username: String!, $password: String!) {
    createMaster(username: $username, password: $password) {
      username
      id
    }
  }
`
