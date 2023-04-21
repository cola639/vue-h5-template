const state = {
  isReadNotify: false,
  userOnlineVoteTimes: null
}

const mutations = {
  TOGGLE_READ: (state, readStatus) => {
    state.isReadNotify = readStatus
  },
  UPDATE_VOTE_TIMES: (state, userOnlineVoteTimes) => {
    state.userOnlineVoteTimes = userOnlineVoteTimes
  }
}

const actions = {
  toggleRead({ commit }, readStatus) {
    commit('TOGGLE_READ', readStatus)
  },

  updateVoteTimes({ commit }, userOnlineVoteTimes) {
    commit('UPDATE_VOTE_TIMES', userOnlineVoteTimes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
