import type { ListQuery, ListResuorce } from '../model/baseModel'
import type { PhoneModel } from './model/PhoneModel'
import { useFetch } from '@/utils/http'

export enum Api {
  STAT_SUMMARY = '/stat/summary',
  STAT_REOIRT = '/stat/report',
  STAT_BATCH = '/stat/batch'
}

export const getPhoneSummary = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<PhoneModel>>({
    url: Api.STAT_SUMMARY,
    useMock: false,
    data
  })
}

export const getPhoneReport = (data: ListQuery) => {
  return useFetch.POST<ListResuorce<PhoneModel>>({
    url: Api.STAT_REOIRT,
    useMock: false,
    data
  })
}
export const getPhoneBatch = (data: any) => {
  return useFetch.POST<ListResuorce<PhoneModel>>({
    url: Api.STAT_BATCH,
    useMock: false,
    data
  })
}
