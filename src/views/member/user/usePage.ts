import type { MemberUserModel } from '@/api/member/model/MemberModel'
import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { ColumnAttrs } from '@/components/TableModel'
import { useSlotTag } from '@/components/TableModel'

const { ElInput, ElSelect } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑',
  IP = 'IP白名单',
  STAT = '拨打统计'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElSelect, label: '归属组长', field: 'leader_id', clearable: true, options: [{ label: '内部数据', value: '0' }, { label: 'cs', value: '1' }] },
  { component: ElSelect, label: '组员类型', field: 'type', clearable: true, options: [{ label: '电销组', value: '0' }, { label: '回访组', value: '1' }] },
  { component: ElInput, label: '组员手机号', field: 'name', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'leader_id', label: '归属组长', width: '180' },
  { prop: 'type', label: '组员类型', width: '180' },
  { prop: 'username', label: '账号', width: '180' },
  { prop: 'phone', label: '手机号', width: '180' },
  { prop: 'email', label: '邮箱', width: '180' },
  {
    prop: 'status',
    label: '是否启用',
    width: '80',
    slot: ({ row }: ColumnAttrs<MemberUserModel>) =>
      [h('el-switch', {
        props: {
          value: row.status === '1',
          activeText: '正常',
          inactiveText: '禁用'
        },
        on: {
          change: (value: any) => {
          // 处理开关状态变化的逻辑
          // value 为开关的新值
            console.log(value)
            row.status = value ? '1' : '0'
          }
        }
      })]
  },
  {
    prop: 'callback',
    label: '数据复播',
    width: '80',
    slot: ({ row }: ColumnAttrs<MemberUserModel>) =>
      [h('el-switch', {
        props: {
          value: row.callback === 0
        },
        on: {
          change: (value: any) => {
          // 处理开关状态变化的逻辑
          // value 为开关的新值
            console.log(value)
            row.status = value ? '1' : '0'
          }
        }
      })]
  },
  { prop: 'created_at', label: '添加时间', width: '180' },
  { prop: 'lasted_at', label: '上次登录时间', width: '180' },
  { prop: 'lasted_ip', label: '上次登录IP', width: '180' }
]
