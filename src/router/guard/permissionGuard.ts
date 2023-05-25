import type { RouteLocationNormalized, Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useMenuStore } from '@/store/modules/menu'
import {
  addAsyncRoutes,
  checkAccessToken,
  isRequiresAuthRoute
} from '@/router/helper'

export const createPermissionGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { invalid, setUserInfo, reLogin } = $(useUserStore())
    const menuStore = useMenuStore()
    // fix async route 404 after refresh page
    const goAsyncRoute = (route: RouteLocationNormalized) => route.matched[0].name === 'PageNotFound' ? router.replace(to.fullPath) : next({ ...to, replace: true })
    if (isRequiresAuthRoute(to)) {
      if (!checkAccessToken()) {
        await reLogin()
        await addAsyncRoutes()
        goAsyncRoute(to)
      } else {
        invalid && (await setUserInfo())
        if (!menuStore.hasRoutes) {
          await addAsyncRoutes()
          goAsyncRoute(to)
        } else {
          next()
        }
      }
    } else {
      next()
    }
  })
}
