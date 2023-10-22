import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { ColumnAttrs } from '@/components/TableModel'
import type { MemberLeaderModel } from '@/api/member/model/MemberModel'

const { ElInput, ElSelect } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '修改',
  IP = 'IP白名单',
  STAT = '拨打统计'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElInput, label: '账号', field: 'username', placeholder: '请输入' },
  { component: ElInput, label: '手机号', field: 'phone', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { prop: 'username', label: '账号', width: '180' },
  { prop: 'phone', label: '手机号', width: '180' },
  { prop: 'email', label: '邮箱', width: '180' },
  {
    prop: 'encry',
    label: '是否加密',
    width: '180',
    slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
      [h('span', row.encry === 1 ? '是' : '否')]
  },
  {
    prop: 'upload',
    label: '是否上传文件',
    width: '180',
    slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
      [h('span', row.upload === 1 ? '正常' : '禁用')]
  },
  { prop: 'is_leader', label: '内部组长', width: '180' },
  { prop: 'callback', label: '数据复播', width: '180' },
  { prop: 'created_at', label: '添加时间', width: '180' },
  { prop: 'lasted_at', label: '上次登录时间', width: '180' },
  { prop: 'lasted_ip', label: '上次登录IP', width: '180' }
]
