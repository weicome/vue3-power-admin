import type { DateLogModel } from '@/api/model/baseModel'

export interface PhoneModel extends DateLogModel {
  id: number
  phone: string
  leader_id?: string | number
  user_id?: string | number
  batch?: string
  status: string | number
  callback: string | number
  remark: string
}
