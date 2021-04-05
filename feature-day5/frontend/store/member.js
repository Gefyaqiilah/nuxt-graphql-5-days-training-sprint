import * as query from '../query/member'

export const state = () => ({
  members: [],
  pagination: {},
})

export const mutations = {
  SET_MEMBERS: (state, members) => {
    state.members = members
  },
  PUSH_MEMBERS: (state, members) => {
    state.members.push(...members)
  },
  SET_PAGINATION: (state, pagination) => {
    state.pagination = pagination
  },
}

export const actions = {
  async getAllMembers(
    { rootState, commit, state, dispatch },
    { limit, page, repeat }
  ) {
    dispatch('setAuthorization', null, { root: true })
    const variables = { limit, page }
    const resultMembers = await rootState.client.request(
      query.getAllMembers,
      variables
    )
    commit('SET_MEMBERS', resultMembers.members.members)
    commit('SET_PAGINATION', resultMembers.members.pageInfo)

    const totalPage = state.pagination.totalPage
    const currentPage = state.pagination.currentPage + 1
    if (totalPage && totalPage >= currentPage && repeat === true) {
      return dispatch('repeatGetAllMembers', { limit })
    }
  },
  async repeatGetAllMembers({ rootState, commit, state, dispatch }, { limit }) {
    dispatch('setAuthorization', null, { root: true })
    const totalPage = state.pagination.totalPage
    let currentPage = state.pagination.currentPage + 1
    while (totalPage >= currentPage) {
      const resultMembers = await rootState.client.request(
        query.getAllMembers,
        { limit, page: currentPage }
      )
      commit('PUSH_MEMBERS', resultMembers.members.members)
      commit('SET_PAGINATION', resultMembers.members.pageInfo)
      currentPage++
    }
  },
  async getMemberById({ rootState, dispatch }, { id }) {
    dispatch('setAuthorization', null, { root: true })
    try {
      const variables = { id }
      const member = await rootState.client.request(
        query.getMemberById,
        variables
      )
      return Promise.resolve(member)
    } catch (error) {
      return Promise.reject(error.message)
    }
  },
  async createMember({ rootState, dispatch }, { name }) {
    dispatch('setAuthorization', null, { root: true })
    try {
      const variables = { name }
      const resultCreate = await rootState.client.request(
        query.createMember,
        variables
      )
      Promise.resolve(resultCreate)
    } catch (error) {
      Promise.reject(error.message)
    }
  },
}
