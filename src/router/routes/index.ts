import type { AppRouteConfig } from '../types'

import { routes as ModuleRoutes } from './modules'

const RootRoute: AppRouteConfig = {
  path: '/',
  name: 'Root',
  redirect: '/home'
}

const LoginRoute: AppRouteConfig = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'menu.login',
    requiresAuth: false
  }
}
const PageNotFoundRoute = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: () => import('@/views/error/PageNotFound.vue'),
  hidden: true,
  meta: {
    title: 'menu.error.notFound',
    requiresAuth: false
  }
}
// console.log('ModuleRoutes', ModuleRoutes)

export const basicRoutes = [
  RootRoute,
  LoginRoute,
  ...ModuleRoutes,
  PageNotFoundRoute
]
