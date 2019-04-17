const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About')
  }
]

export default constantRouterMap
