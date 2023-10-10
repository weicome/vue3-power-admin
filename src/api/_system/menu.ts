import type { ListQuery, ListResult } from '../model/baseModel'
import type { BuildMenuModel, MenuModel } from './model/menuModel'
import { useFetch } from '@/utils/http'

enum Api {
  MENU_LIST = '/admin/menu/index',
  MENU_ADD = '/admin/menu/create',
  MENU_SHOW = '/admin/menu/display',
  MENU_MOD = '/admin/menu/modify',
  MENU_DEL = '/admin/menu/delete'

}

export const getMenuList = (data: ListQuery) => {
  return useFetch.POST<ListResult<MenuModel>>({
    url: Api.MENU_LIST,
    useMock: false,
    data
  })
}
export const addMenu = (data: ListQuery) => {
  return useFetch.POST<ListResult<MenuModel>>({
    url: Api.MENU_ADD,
    useMock: false,
    data
  })
}
export const updateMenu = (data: ListQuery) => {
  return useFetch.POST<ListResult<MenuModel>>({
    url: Api.MENU_MOD,
    useMock: false,
    data
  })
}
export const deleteMenu = (data: ListQuery) => {
  return useFetch.POST<ListResult<MenuModel>>({
    url: Api.MENU_DEL,
    useMock: false,
    data
  })
}
