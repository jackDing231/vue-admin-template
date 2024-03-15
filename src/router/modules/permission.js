import Layout from '@/layout'

export default {
  path: '/permission', // 路径
  component: Layout,
  children: [
    {
      path: '', // 默认子路由
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限',
        icon: 'lock'
      }
    }
  ]
}
