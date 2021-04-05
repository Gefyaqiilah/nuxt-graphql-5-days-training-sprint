import { GraphQLClient } from 'graphql-request'
import * as queryMaster from '../query/master'

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
    const userToken = localStorage.getItem('token')
    state.client.setHeader('authorization', `Bearer ${userToken}`)
  },
  async login({ state }, { username, password }) {
    try {
      const variables = { username, password }
      const token = await state.client.request(queryMaster.login, variables)
      localStorage.setItem('token', token.login.token)
      return Promise.resolve(token.login.token)
    } catch (error) {
      return Promise.reject(error.message)
    }
  },
}
