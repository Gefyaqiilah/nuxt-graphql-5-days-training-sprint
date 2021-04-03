import { GraphQLClient } from 'graphql-request'

export const state = () => ({
  client: new GraphQLClient(process.env.BASE_URL),
  check: '',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiamhvbiIsImlhdCI6MTYxNzQxOTg4OCwiZXhwIjoxNjE3NTA2Mjg4fQ.h0-B-1Q8THDvIklQgCydtejFZrNJY90W0wBI6Q6Aazg',
})

export const mutations = {
  SET_CLIENT(state, payload) {
    state.client = payload
  },
}
