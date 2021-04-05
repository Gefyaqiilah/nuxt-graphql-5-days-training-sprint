import { gql } from 'graphql-request'

export const getAllMembers = gql`
  query getAllMember($limit: Int!, $page: Int!) {
    members(limit: $limit, page: $page) {
      members {
        id
        name
      }
      pageInfo {
        nextPage
        prevPage
        currentPage
        totalData
        totalPage
      }
    }
  }
`
export const getMemberById = gql`
  query getMemberById($id: Int!) {
    member(id: $id) {
      member {
        name
        id
      }
      tasks {
        id
        name
        memberId
        isDone
      }
    }
  }
`
export const createMember = gql`
  mutation createMember($name: String!) {
    createMember(name: $name)
  }
`
