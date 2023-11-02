import type { PhoneModel } from './../../api/phone/model/PhoneModel'
import { leaders } from '@/views/member/user/usePage'
import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import { useSlotTag } from '@/components/TableModel'
import * as phoneApi from '@/api/phone'
import type { ColumnAttrs, Column } from '@/components/TableModel'

const { ElInput, ElSelect } = useComponent()

export const batchs = reactive([{ label: '请选择批次', value: '' }])

phoneApi.getPhoneBatch().then((res) => {
  res?.forEach(item => batchs.push({ label: `第${item.batch}批次`, value: item.batch }))
})

export enum SubmitTypeEnum {
  ADD = '新增数据',
  EXPORT = '导出并清除数据',
  BATCHDEL = '按批次删除'
}

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
  { component: ElSelect, label: '数据归属', field: 'leader_id', clearable: true, options: leaders },
  { component: ElSelect, label: '数据状态', field: 'status', clearable: true, options: dataStatus },
  { component: ElInput, label: '号码', field: 'phone', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'phone', label: '手机号' },
  { prop: 'leader_id', label: '归属组长', slot: ({ row }: ColumnAttrs<PhoneModel>) => [useSlotTag(leaders.find(e => e.value === row.leader_id)?.label || '')] },
  { prop: 'status', label: '数据步骤', slot: ({ row }: ColumnAttrs<PhoneModel>) => [useSlotTag(dataStatus.find(item => item.value === row.status)?.label || '')] },
  { prop: 'batch', label: '批次' },
  { prop: 'created_at', label: '添加时间' }
] as Column[]
