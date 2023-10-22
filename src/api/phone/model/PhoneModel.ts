import type { DateLogModel } from '@/api/model/baseModel'

export interface PhoneModel extends DateLogModel {
  id: number
  phone: string
  leader_id: number
  status?: number
  batch: number
}
