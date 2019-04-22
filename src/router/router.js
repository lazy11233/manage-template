import Layout from '@/views/layout/index'
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
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
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Error/error_404.vue')
  }
]

export const asyncRoutes = [
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
  },
  { path: '*', redirect: '/404', hidden: true }
]
