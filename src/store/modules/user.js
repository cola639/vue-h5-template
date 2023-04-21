import { getToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: 'C和',
    avatar: '',
    role: null,
    signFlag: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_SIGN: (state, signFlag) => {
    state.signFlag = signFlag
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     wxLogin({ username: username.trim(), password })
  //       .then(response => {
  //         const { data } = response
  //         commit('SET_TOKEN', data.token)
  //         setToken(data.token)
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then(() => {
  //         removeToken() // must remove  token  first

  //         commit('RESET_STATE')
  //         resolve()
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
