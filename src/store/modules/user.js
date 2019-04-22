import { login, getUserInfo } from '@/api/user'
import { setToken, remveToken } from '@/lib/auth'
import { constantRoutes, asyncRoutes } from '@/router/router'

const hasPermission = (route, roles) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 如果没有meta属性，就不需要权限
    return true
  }
}

const filterAsyncRoute = (routes, roles) => {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoute(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  routes: [],
  addRoutes: []
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
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
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
  },
  generateRoutes: ({ commit }, roles) => {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoute(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  resetToken: ({ commit }) => {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      remveToken()
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
