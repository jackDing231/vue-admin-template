import Layout from '@/layout'

export default {
  path: '/employee',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employee',
      component: () => import('@/views/employee'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    }

  ]
}
