import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import { useSlotSwitch, type ColumnAttrs } from '@/components/TableModel'
import type { MemberLeaderModel } from '@/api/member/model/MemberModel'
import * as leaderApi from '@/api/member/leader'

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
    width: '120',
    slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
      [useSlotSwitch(row.encry, (val: any) => {
        const data = { ...row, ...{ encry: Number(!row.encry) } }
        leaderApi.updateMemberLeader(data).then(() => {
          row.encry = Number(!row.encry)
        })
      }, { modelValue: !!row.encry })]
  },
  {
    prop: 'upload',
    label: '上传文件',
    width: '120',
    slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
      [useSlotSwitch(row.callback, (val: any) => {
        const data = { ...row, ...{ upload: Number(!row.upload) } }
        leaderApi.updateMemberLeader(data).then(() => {
          row.upload = Number(!row.upload)
        })
      }, { modelValue: !!row.upload })]
  },
  {
    prop: 'is_leader',
    label: '内部组长',
    width: '120',
    slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
      [useSlotSwitch(row.callback, (val: any) => {
        const data = { ...row, ...{ is_leader: Number(!row.is_leader) } }
        leaderApi.updateMemberLeader(data).then(() => {
          row.is_leader = Number(!row.is_leader)
        })
      }, { modelValue: !!row.is_leader })]
  },
  {
    prop: 'callback',
    label: '数据复播',
    width: '90',
    slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
      [useSlotSwitch(row.callback, (val: any) => {
        const data = { ...row, ...{ callback: Number(!row.callback) } }
        leaderApi.updateMemberLeader(data).then(() => {
          row.callback = Number(!row.callback)
        })
      }, { modelValue: !!row.callback })]
  },
  { prop: 'created_at', label: '添加时间', width: '180' },
  { prop: 'lasted_at', label: '上次登录时间', width: '180' },
  { prop: 'lasted_ip', label: '上次登录IP', width: '180' }
]
