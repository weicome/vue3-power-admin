import type { AppRouteConfig } from '@/router/types'

const HomeRoute: AppRouteConfig = {
  path: '/home',
  name: 'home',
  component: () => import('@/layouts/admin/index.vue'),
  redirect: '/home/workbench',
  meta: {
    title: '首页',
    icon: 'ep:home-filled'
  },
  children: [
  //   {
  //   path: 'dashboard',
  //   name: 'dashboard',
  //   component: () => import('@/views/admin/home/dashboard/index.vue'),
  //   meta: {
  //     title: 'menu.home.dashboard'
  //   }
  // },
    {
      path: 'workbench',
      name: 'workbench',
      component: () => import('@/views/admin/home/workbench/index.vue'),
      meta: {
        title: '工作台',
        hideMenu: true
      }
    }]
}

export default HomeRoute
