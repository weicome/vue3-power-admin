import type { ListQuery, ListResult, ListResuorce } from '../model/baseModel'
import type { RoleModel } from './model/roleModel'
import { useFetch } from '@/utils/http'

export enum Api {
  ROLE_INDEX = '/admin/role/index',
  ROLE_ADD = '/admin/role/create',
  ROLE_SHOW = '/admin/role/display',
  ROLE_MOD = '/admin/role/modify',
  ROLE_DEL = '/admin/role/delete',
  ROLE_LIST = '/admin/role/list'
}

export const getRoleList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<RoleModel>>({
    url: Api.ROLE_INDEX,
    useMock: false,
    data
  })
}

export const getRoleInfo = (data: any) => {
  return useFetch.GET<RoleModel>({
    url: Api.ROLE_SHOW,
    useMock: false,
    data
  })
}

export const addRole = (data: RoleModel) => {
  return useFetch.POST<RoleModel>({
    url: Api.ROLE_ADD,
    useMock: false,
    data
  })
}

export const updateRole = (data: RoleModel) => {
  return useFetch.POST<RoleModel>({
    url: Api.ROLE_MOD,
    useMock: false,
    data
  })
}

export const deleteRole = <T>(data: Array<T>) => {
  return useFetch.POST<RoleModel>({
    url: Api.ROLE_DEL,
    useMock: false,
    data: { ids: data }
  })
}

export const getRoles = () => {
  return useFetch.POST<RoleModel[]>({
    url: Api.ROLE_LIST,
    useMock: false
  })
}
