import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { ColumnAttrs } from '@/components/TableModel'
import type { PhoneModel } from '@/api/phone/model/PhoneModel'

const { ElInput, ElSelect } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElSelect, label: '数据归属', field: 'status', clearable: true, options: [{ label: '内部数据', value: '0' }, { label: 'cs', value: '1' }] },
  { component: ElSelect, label: '数据状态', field: 'status', clearable: true, options: [{ label: '已接通', value: '1' }, { label: '已同意', value: '2' }, { label: '未接通(通话中/语音助手/在忙稍后回电)', value: '3' }, { label: '拒绝', value: '4' }, { label: '直接挂断', value: '5' }, { label: '关机/停机/空号', value: '0' }] },
  { component: ElInput, label: '号码', field: 'phone', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'phone', label: '手机号', width: '180' },
  { prop: 'batch', label: '归属组长', width: '180' },
  { prop: 'batch', label: '数据步骤', width: '180' },
  { prop: 'batch', label: '批次', width: '180' },
  { prop: 'created_at', label: '添加时间', width: '180' }
]
