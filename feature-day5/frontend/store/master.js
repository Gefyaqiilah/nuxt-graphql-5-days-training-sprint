import * as masterQuery from '../query/master'

export const actions = {
  async createNewMaster({ rootState }, { username, password }) {
    try {
      const variables = { username, password }
      const dataMaster = await rootState.client.request(
        masterQuery.createMaster,
        variables
      )
      return Promise.resolve(dataMaster)
    } catch (error) {
      console.log('error.message :>> ', error.message)
      return Promise.reject(error.message)
    }
  },
}
