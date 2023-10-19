import type { AppRouteConfig } from '@/router/types'

const StatRoute: AppRouteConfig = {
  path: '/stat',
  name: 'Stat',
  component: () => import('@/layouts/admin/index.vue'),
  redirect: '/phone/index',
  meta: {
    title: '推广统计',
    icon: 'ri:bookmark-line'
  },
  children: [
    {
      path: 'summary',
      name: 'StatSummary',
      component: () => import('@/views/stat/summary/index.vue'),
      meta: {
        title: '批次总览'
      }
    }, {
      path: 'report',
      name: 'StatReport',
      component: () => import('@/views/stat/report/index.vue'),
      meta: {
        title: '电销统计'
      }
    }, {
      path: 'batch',
      name: 'StatBatch',
      component: () => import('@/views/stat/batch/index.vue'),
      meta: {
        title: '批次统计'
      }
    }
  ]
}

export default StatRoute
