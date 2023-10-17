import type { ListQuery, ListResult, ListResuorce } from '../model/baseModel'
import type { MemberPhoneModel } from './model/MemberModel'
import { useFetch } from '@/utils/http'

export enum Api {
  PHONE_INDEX = '/member/phone/index',
  PHONE_ADD = '/member/phone/create',
  PHONE_SHOW = '/member/phone/display',
  PHONE_MOD = '/member/phone/modify',
  PHONE_DEL = '/member/phone/delete'
}

export const getMemberPhoneList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<MemberPhoneModel>>({
    url: Api.PHONE_INDEX,
    useMock: false,
    data
  })
}

export const addMemberPhone = (data: MemberPhoneModel) => {
  return useFetch.POST<MemberPhoneModel>({
    url: Api.PHONE_ADD,
    useMock: false,
    data
  })
}
export const updateMemberPhone = (data: MemberPhoneModel) => {
  return useFetch.POST<MemberPhoneModel>({
    url: Api.PHONE_MOD,
    useMock: false,
    data
  })
}
export const deleteMemberPhone = <T>(data: Array<T>) => {
  return useFetch.POST<MemberPhoneModel>({
    url: Api.PHONE_DEL,
    useMock: false,
    data: { ids: data }
  })
}
