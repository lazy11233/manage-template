import Vue from 'vue'
import Router from 'vue-router'
import constantRoutes from './router'
import store from '@/store'
import NProgress from 'nprogress'
import { setTilte } from '@/lib/util'
import { getToken } from '@/lib/auth'

Vue.use(Router)

const router = new Router({
  routes: constantRoutes
})

// 路由白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // nprogress 开始
  NProgress.start()
  // 设置 title
  to.meta && setTilte(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    // 已经登录过
    if (to.path === '/login') {
      next(`/`)
      NProgress.done()
    } else {
      // 用户要去的不是登录页面，校验用户权限
      try {
        // 取得用户权限
        const { roles } = await store.dispatch('getInfo')
        // 取得需要动态添加的路由列表
        const { accessedRoutes } = await store.dispatch('generateRoutes', roles)
        // TODO delete it
        console.log(accessedRoutes)
      } catch (error) {
        console.log(error)
      }
    }
  } else {
    // 尚未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
