import type { AppRouteConfig } from '@/router/types'

const MemberRoute: AppRouteConfig = {
  path: '/member',
  name: 'Member',
  component: () => import('@/layouts/admin/index.vue'),
  redirect: '/member/users',
  meta: {
    title: '用户管理',
    icon: 'ri:file-user-fill'
  },
  children: [{
    path: 'users',
    name: 'MemberUser',
    component: () => import('@/views/member/user/index.vue'),
    meta: {
      title: '组员管理'
    }
  }, {
    path: 'leader',
    name: 'MemberLeader',
    component: () => import('@/views/member/leader/index.vue'),
    meta: {
      title: '电销组长'
    }
  }]
}

export default MemberRoute
