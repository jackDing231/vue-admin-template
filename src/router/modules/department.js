import Layout from '@/layout'

export default {
  // 路由信息
  path: '/department',
  component: Layout, // 一级路由
  children: [{
    path: '', // 二级路由 什么都不写 代表二级路由的默认组件
    component: () => import('@/views/department'), // 按需加载
    name: 'department',
    meta: {
      title: '组织', // 左侧导航会读取此处title
      icon: 'tree' // 左侧导航图标
    } // 路由元信息
  }]
}
