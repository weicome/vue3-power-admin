import type { AppRouteConfig } from '@/router/types'

const MemberRoute: AppRouteConfig = {
  path: '/member',
  name: 'Member',
  component: () => import('@/layouts/admin/index.vue'),
  redirect: '/member/user',
  meta: {
    title: '会员中心',
    icon: 'ri:checkbox-multiple-fill'
  },
  children: [{
    path: 'user',
    name: 'MemberUser',
    component: () => import('@/views/member/user/index.vue'),
    meta: {
      title: '会员列表'
    }
  }, {
    path: 'phone',
    name: 'MemberPhone',
    component: () => import('@/views/member/phone/index.vue'),
    meta: {
      title: '会员电话'
    }
  }]
}

export default MemberRoute
