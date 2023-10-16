import type { DateLogModel } from '@/api/model/baseModel'

export interface MemberUserModel extends DateLogModel {
  id: number
  name: string
  email: string
  password: string
  status: string | number
}

export interface MemberPhoneModel extends DateLogModel {
  id: number
  user_id: number
  phone: string
  remark: string
  callback: string | number
}
