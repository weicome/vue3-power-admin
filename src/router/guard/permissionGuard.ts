import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useMenuStore } from '@/store/modules/menu'
import {
  addAsyncRoutes,
  checkAccessToken,
  isRequiresAuthRoute
} from '@/router/helper'

export const createPermissionGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    // fix async route 404 after refresh page
    const nextRoute = to.matched[0].name === 'PageNotFound' ? { path: to.fullPath } : to
    if (isRequiresAuthRoute(to)) {
      console.log('to', to.name)
      if (userStore.invalid) { // 未登录
        console.log('invalid', userStore.invalid)
        return next({ replace: true, name: 'Login' })
      }
      else {
        if (!checkAccessToken()) { // 登录过期
          console.log('checkAccessToken', to.name)
          await userStore.reLogin()
          // await addAsyncRoutes()
          return next()
        }
        else {
          if (!menuStore.hasRoutes) { // 没有生成路由
            await addAsyncRoutes()
          }
          console.log('hasRoutes', to.name)
          return next()
        }
      }
    }
    else {
      if (!userStore.invalid) { // 已登录
        next({ replace: true, name: 'home' })
      }
      else next()
    }
  })
}
