import type { DateLogModel } from '@/api/model/baseModel'

export interface MemberUserModel extends DateLogModel {
  id: number
  leader_id: number
  type: number
  username: string
  password: string
  phone: string
  email: string
  status: string | number
  callback?: number
  lasted_at: string
  lasted_ip: string
}

export interface MemberLeaderModel extends DateLogModel {
  id: number
  username: string
  password: string
  phone: string
  email: string
  encry?: number
  upload?: number
  is_leader?: number
  callback?: number
  lasted_at?: string
  lasted_ip?: string
}
