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
  async getTasks({ rootState, commit, dispatch }, { limit, page }) {
    dispatch('setAuthorization', null, { root: true })
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
    dispatch('setAuthorization', null, { root: true })
    const variables = { id, isDone }
    const updateTask = await rootState.client.request(
      taskQuery.updateStatusTask,
      variables
    )
    return Promise.resolve(updateTask)
  },
  async createTask({ rootState, dispatch }, { memberId, name }) {
    dispatch('setAuthorization', null, { root: true })
    try {
      const variables = { memberId, name }
      const newTask = await rootState.client.request(
        taskQuery.createTask,
        variables
      )
      return Promise.resolve(newTask)
    } catch (error) {
      return Promise.reject(error.message)
    }
  },
}

export const getters = {
  tasks: (state) => state.tasks,
}
