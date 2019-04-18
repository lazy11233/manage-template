import { login, getUserInfo } from '@/api/user'
import { setToken } from '@/lib/auth'

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
        setToken(data.data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { roles, name, avatar, introduction } = data.data
        if (!roles || roles.length <= 0) {
          // 必须是一个非空数组
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_ROLES', roles)
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
