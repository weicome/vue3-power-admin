import type { MemberUserModel } from '@/api/member/model/MemberModel'
import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { ColumnAttrs } from '@/components/TableModel'
import { useSlotSwitch, useSlotTag } from '@/components/TableModel'
import * as leaderApi from '@/api/member/leader'
import * as memberUserApi from '@/api/member/user'

const { ElInput, ElSelect } = useComponent()
export const leaders = reactive([{ label: '内部数据', value: 0 }])
export const groupType = reactive([{ label: '电销组', value: 0 }, { label: '回访组', value: 1 }])
leaderApi.memberLeaderIndex().then((res) => {
  res.data.forEach(item => leaders.push({ label: item.username, value: item.id }))
})

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑',
  IP = 'IP白名单',
  STAT = '拨打统计',
  BATCH = '批量添加'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElSelect, label: '归属组长', field: 'leader_id', clearable: true, options: leaders },
  { component: ElSelect, label: '组员类型', field: 'type', clearable: true, options: groupType },
  { component: ElInput, label: '组员手机号', field: 'name', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '55' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'leader_id', label: '归属组长', slot: ({ row }: ColumnAttrs<MemberUserModel>) => [useSlotTag(leaders.find(e => e.value === row.leader_id)?.label || '')] },
  { prop: 'type', label: '组员类型', width: '90', slot: ({ row }: ColumnAttrs<MemberUserModel>) => [useSlotTag(row?.type ? '回访组' : '电销组')] },
  { prop: 'username', label: '账号', width: '120' },
  { prop: 'phone', label: '手机号', width: '120' },
  { prop: 'email', label: '邮箱', width: '120' },
  {
    prop: 'status',
    label: '是否启用',
    width: '90',
    slot: ({ row }: ColumnAttrs<MemberUserModel>) =>
      [useSlotSwitch(row.status, (val: any) => {
        const data = { ...row, ...{ status: Number(!row.status) } }
        memberUserApi.updateMemberUser(data).then(() => {
          row.status = Number(!row.status)
        })
      }, { modelValue: !!row.status })]
  },
  {
    prop: 'callback',
    label: '数据复播',
    width: '90',
    slot: ({ row }: ColumnAttrs<MemberUserModel>) =>
      [useSlotSwitch(row.callback, (val: any) => {
        const data = { ...row, ...{ callback: Number(!row.callback) } }
        memberUserApi.updateMemberUser(data).then(() => {
          row.callback = Number(!row.callback)
        })
      }, { modelValue: !!row.callback })]
  },
  { prop: 'created_at', label: '添加时间', width: '180' },
  { prop: 'lasted_at', label: '上次登录时间', width: '120' },
  { prop: 'lasted_ip', label: '上次登录IP', width: '120' }
]
