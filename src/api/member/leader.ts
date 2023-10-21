import type { ListQuery, ListResult, ListResuorce } from '../model/baseModel'
import type { MemberLeaderModel } from './model/MemberModel'
import { useFetch } from '@/utils/http'

export enum Api {
  Leader_INDEX = '/member/leader/index',
  Leader_ADD = '/member/leader/create',
  Leader_SHOW = '/member/leader/display',
  Leader_MOD = '/member/leader/modify',
  Leader_DEL = '/member/leader/delete'
}

export const getMemberLeaderList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<MemberLeaderModel>>({
    url: Api.Leader_INDEX,
    useMock: false,
    data
  })
}

export const addMemberLeader = (data: MemberLeaderModel) => {
  return useFetch.POST<MemberLeaderModel>({
    url: Api.Leader_ADD,
    useMock: false,
    data
  })
}
export const updateMemberLeader = (data: MemberLeaderModel) => {
  return useFetch.POST<MemberLeaderModel>({
    url: Api.Leader_MOD,
    useMock: false,
    data
  })
}
export const deleteMemberLeader = <T>(data: Array<T>) => {
  return useFetch.POST<MemberLeaderModel>({
    url: Api.Leader_DEL,
    useMock: false,
    data: { ids: data }
  })
}
export const updateMemberLeaderIP = <T>(data: Array<T>) => {
  return useFetch.POST<MemberLeaderModel>({
    url: Api.Leader_DEL,
    useMock: false,
    data: { ids: data }
  })
}
export const telMemberLeaderStat = <T>(data: T) => {
  return useFetch.POST<MemberLeaderModel>({
    url: Api.Leader_DEL,
    useMock: false,
    data
  })
}
