const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      title: '管理平台首页',
      icon: ''
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录',
      icon: ''
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About'),
    meta: {
      title: '关于',
      icon: ''
    }
  }
]

export default constantRoutes
