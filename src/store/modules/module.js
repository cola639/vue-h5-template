// import {  } from 'xx'

const getDefaultState = () => {
  return {
    module_state: '默认值'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_MODULE_STATE: (state, payload) => {
    state.module_state = payload
  }
}

const actions = {
  doSomething({ commit }, payload) {
    commit('SET_MODULE_STATE', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
