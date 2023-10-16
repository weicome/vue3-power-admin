import type { ListQuery, ListResuorce } from '../model/baseModel'
import type { PhoneModel } from './model/PhoneModel'
import { useFetch } from '@/utils/http'

export enum Api {
  PHONE_INDEX = '/phone/index',
  PHONE_ADD = '/phone/create',
  PHONE_SHOW = '/phone/display',
  PHONE_MOD = '/phone/modify',
  PHONE_DEL = '/phone/delete',
  PHONE_UP = '/phone/upload'
}

export const getPhoneList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<PhoneModel>>({
    url: Api.PHONE_INDEX,
    useMock: false,
    data
  })
}

export const getPhoneInfo = (data: any) => {
  return useFetch.GET<PhoneModel>({
    url: Api.PHONE_SHOW,
    useMock: false,
    data
  })
}

export const addPhone = (data: PhoneModel) => {
  return useFetch.POST<PhoneModel>({
    url: Api.PHONE_ADD,
    useMock: false,
    data
  })
}

export const updatePhone = (data: PhoneModel) => {
  return useFetch.POST<PhoneModel>({
    url: Api.PHONE_MOD,
    useMock: false,
    data
  })
}

export const deletePhone = <T>(data: Array<T>) => {
  return useFetch.POST<PhoneModel>({
    url: Api.PHONE_DEL,
    useMock: false,
    data: { ids: data }
  })
}

export const uploadPhone = () => {
  return useFetch.POST({
    url: Api.PHONE_UP,
    useMock: false
  })
}
