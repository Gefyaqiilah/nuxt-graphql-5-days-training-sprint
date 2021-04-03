import { gql } from 'graphql-request'

export const getTasks = gql`
  query getTasks($limit: Int!, $page: Int!) {
    tasks(limit: $limit, page: $page) {
      tasks {
        id
        name
        memberId
        isDone
      }
      pageInfo {
        currentPage
        nextPage
        prevPage
        totalPage
        totalData
      }
    }
  }
`
export const updateStatusTask = gql`
  mutation updateStatusTask($id: Int!, $isDone: Boolean!) {
    updateTask(isDone: $isDone, taskId: $id) {
      id
      name
      memberId
      isDone
    }
  }
`
