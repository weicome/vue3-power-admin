import type { AppRouteConfig } from '@/router/types'

const SystemRoute: AppRouteConfig = {
  path: '/admin',
  name: 'Admin',
  component: import('@/layouts/admin/index.vue'),
  meta: {
    title: 'menu.system.root',
    icon: 'ri:settings-4-fill'
  },
  children: [
    {
      path: 'user',
      name: 'AdminUser',
      component: () => import('@/views/admin/user/index.vue'),
      meta: {
        title: 'menu.system.user',
        icon: 'ri:account-pin-box-fill'
      }
    },
    {
      path: 'role',
      name: 'AdminRole',
      component: () => import('@/views/admin/role/index.vue'),
      meta: {
        title: 'menu.system.role',
        icon: 'ri:git-repository-private-line'
      }
    },
    {
      path: 'menu',
      name: 'AdminMenu',
      component: () => import('@/views/admin/menu/index.vue'),
      meta: {
        title: 'menu.system.menu',
        icon: 'ri:menu-unfold-line'
      }
    },
    {
      path: 'user/detail/:id',
      name: 'user_detail',
      component: () => import('@/views/admin/user/detail.vue'),
      meta: {
        title: 'menu.system.userDetail',
        hideMenu: true,
        activeMenu: '/system/user'
      }
    }
  ]
}

export default SystemRoute
