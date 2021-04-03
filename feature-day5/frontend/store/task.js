import * as taskQuery from '../query/task'

export const state = () => ({
  tasks: [],
  pagination: {
    totalData: 0,
  },
})

export const mutations = {
  SET_TASKS(state, payload) {
    state.tasks = payload
  },
  SET_PAGE_INFO(state, payload) {
    state.pagination = payload
  },
}

export const actions = {
  setAuthorization({ rootState }) {
    const userToken = rootState.token
    rootState.client.setHeader('authorization', `Bearer ${userToken}`)
  },
  async getTasks({ rootState, commit, dispatch }, { limit, page }) {
    dispatch('setAuthorization')
    const variables = { limit, page }
    const resultTasks = await rootState.client.request(
      taskQuery.getTasks,
      variables
    )
    commit('SET_TASKS', resultTasks.tasks.tasks)
    // set pagination
    dispatch('setPagination', { limit, page, ...resultTasks.tasks.pageInfo })

    return Promise.resolve(resultTasks)
  },
  setPagination({ commit }, payload) {
    const paginationOptions = {
      totalData: payload.totalData,
    }
    commit('SET_PAGE_INFO', paginationOptions)
  },
  async updateStatusTask({ dispatch, rootState }, { id, isDone }) {
    dispatch('setAuthorization')
    const variables = { id, isDone }
    const updateTask = await rootState.client.request(
      taskQuery.updateStatusTask,
      variables
    )
    return Promise.resolve(updateTask)
  },
}

export const getters = {
  tasks: (state) => state.tasks,
}
