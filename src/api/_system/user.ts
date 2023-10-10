import { fa } from 'element-plus/es/locale'
import type { ListQuery, ListResult, ListResuorce } from '../model/baseModel'
import type { UserInfoModel } from './model/userModel'
import { useFetch } from '@/utils/http'

export enum Api {
  ACCOUNT_INFO = '/sysadmin/user/info',
  USER_LIST = '/admin/user/index',
  USER_ADD = '/admin/user/create',
  USER_SHOW = '/admin/user/display',
  USER_MOD = '/admin/user/modify',
  USER_DEL = '/admin/user/delete',
  USER_PRE = '/sysadmin/user',
  USER_ROLE_PRE = '/sysadmin/user/role',
  UPDATE_USER_PASSWORD = '/sysadmin/user/changePassword'
}

export const getAdminInfo = () => {
  return useFetch.GET<UserInfoModel>({
    url: Api.ACCOUNT_INFO,
    useMock: true
  })
}

export const getUserList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<UserInfoModel>>({
    url: Api.USER_LIST,
    useMock: false,
    data
  })
}

export const addUser = (data: UserInfoModel) => {
  return useFetch.POST<ListResult<UserInfoModel>>({
    url: Api.USER_ADD,
    useMock: false,
    data
  })
}
export const updateUser = (data: UserInfoModel) => {
  return useFetch.POST<ListResult<UserInfoModel>>({
    url: Api.USER_MOD,
    useMock: false,
    data
  })
}
export const deleteUser = <T>(data: Array<T>) => {
  return useFetch.POST<ListResult<UserInfoModel>>({
    url: Api.USER_DEL,
    useMock: false,
    data: { ids: data }
  })
}
