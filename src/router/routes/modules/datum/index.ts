import type { AppRouteConfig } from '@/router/types'

const PhoneRoute: AppRouteConfig = {
  path: '/phone',
  name: 'Phone',
  component: () => import('@/layouts/admin/index.vue'),
  redirect: '/phone/index',
  meta: {
    title: '数据管理',
    icon: 'ri:bookmark-line'
  },
  children: [
    {
      path: 'index',
      name: 'PhoneList',
      component: () => import('@/views/phone/index.vue'),
      meta: {
        title: '数据列表',
        hideMenu: true
      }
    }
  ]
}

export default PhoneRoute
