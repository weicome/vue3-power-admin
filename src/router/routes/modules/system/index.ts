import type { AppRouteConfig } from '@/router/types'

const MemberRoute: AppRouteConfig = {
  path: '/system',
  name: 'System',
  component: () => import('@/layouts/admin/index.vue'),
  redirect: '/system/users',
  meta: {
    title: '系统管理',
    icon: 'ri:admin-line'
  },
  children: [{
    path: 'ipwhite',
    name: 'SystemIpWhite',
    component: () => import('@/views/admin/IpWhite/index.vue'),
    meta: {
      title: 'IP白名单'
    }
  }, {
    path: 'setting',
    name: 'SystemSetting',
    component: () => import('@/views/admin/setting/index.vue'),
    meta: {
      title: '系统设置'
    }
  }, {
    path: 'users',
    name: 'SystemUser',
    component: () => import('@/views/admin/user/index.vue'),
    meta: {
      title: '管理员'
    }
  }]
}

export default MemberRoute
