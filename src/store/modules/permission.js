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
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log(state)
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes: ({ commit }, roles) => {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoute(asyncRoutes, roles)
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
