import type { ListQuery, ListResult, ListResuorce } from '../model/baseModel'
import type { MemberUserModel } from './model/MemberModel'
import { useFetch } from '@/utils/http'

export enum Api {
  USER_INDEX = '/member/user/index',
  USER_ADD = '/member/user/create',
  USER_SHOW = '/member/user/display',
  USER_MOD = '/member/user/modify',
  USER_DEL = '/member/user/delete',
  USER_ROLE_PRE = '/member/user/role',
  UPDATE_USER_PASSWORD = '/member/user/changePassword',
  USER_BATCH = '/member/user/batch'
}

export const getMemberUserList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<MemberUserModel>>({
    url: Api.USER_INDEX,
    useMock: false,
    data
  })
}

export const addMemberUser = (data: MemberUserModel) => {
  return useFetch.POST<MemberUserModel>({
    url: Api.USER_ADD,
    useMock: false,
    data
  })
}
export const updateMemberUser = (data: MemberUserModel) => {
  return useFetch.POST<MemberUserModel>({
    url: Api.USER_MOD,
    useMock: false,
    data
  })
}
export const deleteMemberUser = <T>(data: Array<T>) => {
  return useFetch.POST<MemberUserModel>({
    url: Api.USER_DEL,
    useMock: false,
    data: { ids: data }
  })
}
export const batchAddMemberUser = (data: any) => {
  return useFetch.POST<MemberUserModel>({
    url: Api.USER_BATCH,
    useMock: false,
    data
  })
}
export const telMemberUserStat = <T>(data: T) => {
  return useFetch.POST<MemberLeaderModel>({
    url: Api.Leader_DEL,
    useMock: false,
    data
  })
}
