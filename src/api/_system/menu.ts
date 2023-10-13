import type { ListQuery, ListResult, ListResuorce } from '../model/baseModel'
import type { MenuModel } from './model/menuModel'
import { useFetch } from '@/utils/http'

enum Api {
  MENU_LIST = '/admin/menu/index',
  MENU_ADD = '/admin/menu/create',
  MENU_SHOW = '/admin/menu/display',
  MENU_MOD = '/admin/menu/modify',
  MENU_DEL = '/admin/menu/delete',
  MENU_TREE = '/admin/menu/tree'
}

export const getMenuList = (data: Object) => {
  return useFetch.POST<ListResuorce<MenuModel>>({
    url: Api.MENU_LIST,
    useMock: false,
    data
  })
}
export const addMenu = (data: MenuModel) => {
  return useFetch.POST<MenuModel>({
    url: Api.MENU_ADD,
    useMock: false,
    data
  })
}
export const updateMenu = (data: MenuModel) => {
  return useFetch.POST<MenuModel>({
    url: Api.MENU_MOD,
    useMock: false,
    data
  })
}
export const deleteMenu = <T>(data: Array<T>) => {
  return useFetch.POST<MenuModel>({
    url: Api.MENU_DEL,
    useMock: false,
    data: { ids: data }
  })
}
export const getMenuTree = () => {
  return useFetch.POST<MenuModel[]>({
    url: Api.MENU_TREE,
    useMock: false
  })
}
