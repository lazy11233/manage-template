const asyncRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin.vue'),
    meta: {
      title: '管理员页面',
      icon: '',
      roles: ['admin']
    }
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor.vue'),
    meta: {
      title: '编辑页面',
      icon: '',
      roles: ['editor']
    }
  },
  {
    path: '/visitor',
    name: 'visitor',
    component: () => import('@/views/visitor.vue')
  }
]

export default asyncRoutes
