import type { ListQuery, ListResuorce } from '../model/baseModel'
import type { PhoneModel } from './model/PhoneModel'
import { useFetch } from '@/utils/http'

export enum Api {
  PHONE_INDEX = '/phone/index',
  PHONE_ADD = '/phone/create',
  PHONE_EXPORT = '/phone/export',
  PHONE_CLEAR = '/phone/clear',
  PHONE_BATCHDEL = '/phone/delete',
  PHONE_UPLOAD = '/phone/upload',
  PHONE_BATCH = '/phone/batch'
}

export const getPhoneList = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<PhoneModel>>({
    url: Api.PHONE_INDEX,
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
export const exportPhone = (data: Partial<PhoneModel>) => {
  return useFetch.POST<PhoneModel>({
    url: Api.PHONE_EXPORT,
    useMock: false,
    data
  })
}
export const clearPhone = () => {
  return useFetch.POST<PhoneModel>({
    url: Api.PHONE_CLEAR,
    useMock: false
  })
}
export const deletePhone = (data: Partial<PhoneModel>) => {
  return useFetch.POST<PhoneModel>({
    url: Api.PHONE_BATCHDEL,
    useMock: false,
    data
  })
}

export const uploadPhone = (data: any) => {
  return useFetch.POST<Array<any>>({
    url: Api.PHONE_UPLOAD,
    useMock: false,
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
export const getPhoneBatch = () => {
  return useFetch.POST<Array<any>>({
    url: Api.PHONE_BATCH,
    useMock: false
  })
}
