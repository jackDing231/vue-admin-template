import Layout from '@/layout'

export default {
  path: '/approval',
  component: Layout, // 一级路由
  children: [
    {
      path: '', // 二级路由不写，表示二级路由的默认路由
      name: 'approval', // 路由的名字
      component: () => import('@/views/approval'), // 路由的组件
      meta: {
        title: '审批', // 菜单标题
        icon: 'tree-table' // 菜单图标
      }
    }
  ]
}
