import { GraphQLClient } from 'graphql-request'

export const state = () => ({
  client: new GraphQLClient(process.env.BASE_URL),
  check: '',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiamhvbiIsImlhdCI6MTYxNzUwODA5MSwiZXhwIjoxNjE3NTk0NDkxfQ.BrEza2lF6XXysLerInX7eNcV3n-fkIJZrYACjshZcqY',
})

export const mutations = {
  SET_CLIENT(state, payload) {
    state.client = payload
  },
}
