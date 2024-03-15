import Layout from '@/layout'

export default {
  path: '/attendance',
  component: Layout, // 一级路由
  children: [
    {
      path: '', // 二级路由
      name: 'attendance',
      component: () => import('@/views/attendance'),
      meta: {
        title: '考勤',
        icon: 'skill' // 图标
      }
    }
  ]
}
