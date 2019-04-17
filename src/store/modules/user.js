import { login, getUserInfo } from '@/api/user'

const state = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload
  },
  SET_NAME: (state, payload) => {
    state.name = payload
  },
  SET_AVATAR: (state, payload) => {
    state.avatar = payload
  },
  SET_INTRODUCTION: (state, payload) => {
    state.introduction = payload
  },
  SET_ROLES: (state, payload) => {
    state.roles = payload
  }
}
const actions = {
  login: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      login({ username, password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
    })
  }
}

export default {
  state,
  mutations,
  actions
}
