import type { DateLogModel } from '@/api/model/baseModel'

export interface PhoneModel extends DateLogModel {
  id: number
  phone: string
  batch: string
  status: string | number
}
