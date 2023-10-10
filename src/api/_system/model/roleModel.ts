import type { DateLogModel } from '@/api/model/baseModel'

export interface RoleModel extends DateLogModel {
  id: number
  symbol: string
  name: string
  menus: number[]
  remark?: string
}
