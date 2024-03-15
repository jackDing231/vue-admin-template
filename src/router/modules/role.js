import Layout from '@/layout'

export default {
  path: '/role',
  component: Layout, // 一级路由
  children: [{
    path: '',
    name: 'role',
    component: () => import('@/views/role'),
    meta: {
      title: '角色',
      icon: 'user'
    }
  }]
}
