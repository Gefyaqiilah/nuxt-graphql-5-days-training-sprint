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
