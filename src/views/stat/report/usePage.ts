import type { MemberUserModel } from '@/api/member/model/MemberModel'
import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { ColumnAttrs } from '@/components/TableModel'
import { useSlotTag } from '@/components/TableModel'
import { leaders } from '@/views/member/user/usePage'

const { ElInput, ElSelect } = useComponent()

export const dataStatus = [
  { label: '等待处理', value: 0 },
  { label: '已接通', value: 1 },
  { label: '已同意', value: 2 },
  { label: '未接通(通话中/语音助手/在忙稍后回电)', value: 3 },
  { label: '拒绝', value: 4 },
  { label: '直接挂断', value: 5 },
  { label: '关机/停机/空号', value: -1 }
]

// search model config
export const config: SearchItemConfig[] = [
  { component: ElSelect, label: '归属组长', field: 'leader_id', clearable: true, options: leaders },
  { component: ElSelect, label: '数据状态', field: 'status', clearable: true, options: dataStatus },
  { component: ElInput, label: '组员手机号', field: 'phone', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'leader_id', label: '归属组长', slot: ({ row }: ColumnAttrs<MemberUserModel>) => [useSlotTag(leaders.find(e => e.value === row.leader_id)?.label || '')] },
  { prop: 'type', label: '组员类型', slot: ({ row }: ColumnAttrs<MemberUserModel>) => [useSlotTag(row?.type ? '回访组' : '电销组')] },
  { prop: 'username', label: '电销员' },
  { prop: 'phone', label: '手机号' },
  { prop: 'status', label: '是否启用', slot: ({ row }: ColumnAttrs<MemberUserModel>) => [useSlotTag(row?.status ? '正常' : '禁用')] },
  { prop: 'created_at', label: '添加时间' }
]
