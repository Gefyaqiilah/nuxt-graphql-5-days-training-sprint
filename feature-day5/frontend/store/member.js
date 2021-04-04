import * as query from '../query/member'

export const state = () => ({
  members: [],
  pagination: {},
})

export const mutations = {
  SET_MEMBERS: (state, members) => {
    if (state.members.length === 0) {
      return (state.members = members)
    }
    state.members.push(...members)
  },
  SET_PAGINATION: (state, pagination) => {
    state.pagination = pagination
  },
}

export const actions = {
  async getAllMembers({ rootState, commit, state, dispatch }, { limit, page }) {
    const variables = { limit, page }
    const resultMembers = await rootState.client.request(
      query.getAllMembers,
      variables
    )
    commit('SET_MEMBERS', resultMembers.members.members)
    commit('SET_PAGINATION', resultMembers.members.pageInfo)

    const totalPage = state.pagination.totalPage
    const currentPage = state.pagination.currentPage + 1
    if (totalPage && totalPage >= currentPage) {
      return dispatch('repeatGetAllMembers', { limit })
    }
  },
  async repeatGetAllMembers({ rootState, commit, state }, { limit }) {
    const totalPage = state.pagination.totalPage
    let currentPage = state.pagination.currentPage + 1
    while (totalPage >= currentPage) {
      const resultMembers = await rootState.client.request(
        query.getAllMembers,
        { limit, page: currentPage }
      )
      commit('SET_MEMBERS', resultMembers.members.members)
      commit('SET_PAGINATION', resultMembers.members.pageInfo)
      currentPage++
    }
  },
}
