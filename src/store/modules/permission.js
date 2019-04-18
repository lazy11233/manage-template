import constantRoutes from '@/router/router'
import asyncRoutes from '@/router/asyncRouter'

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有meta属性，说明不需要权限校验
    return true
  }
}

const filterAsyncRoutes = (routes, roles) => {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
