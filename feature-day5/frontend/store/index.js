import { GraphQLClient } from 'graphql-request'

export const state = () => ({
  client: new GraphQLClient(process.env.BASE_URL),
  check: '',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiamhvbiIsImlhdCI6MTYxNzUxMzQ4NywiZXhwIjoxNjE3NTk5ODg3fQ.ZpUnw5GMGEw9-eMMjkj_aCcRzGREC8xNptmFoVQ_e78',
})

export const mutations = {
  SET_CLIENT(state, payload) {
    state.client = payload
  },
}
export const actions = {
  setAuthorization({ state }) {
    const userToken = state.token
    state.client.setHeader('authorization', `Bearer ${userToken}`)
  },
}
