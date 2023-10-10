import type { RoleModel } from './roleModel'
import type { PostModel } from './postModel'

export interface UserInfoModel {
  id: string | number
  account: string
  username: string
  avatar: string
  password: Nullable<string>
  status: number | string
  roles: Partial<RoleModel>[]
  created_at: string
}
