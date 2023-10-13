import type { AppRouteConfig, RouteModule } from '@/router/types'

function handleModuleRoutes(modules: RouteModule) {
  const routes: AppRouteConfig[] = []

  Object.keys(modules).forEach((key) => {
    const item = modules[key].default
    if (item) {
      routes.push(item)
    }
    else {
      window.console.error(`路由模块解析出错: key = ${key}`)
    }
  })
  return routes
}
const modules = import.meta.glob('./**/*.ts', { eager: true }) as RouteModule

export const routes = handleModuleRoutes(modules)
