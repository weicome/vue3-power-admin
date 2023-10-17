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
  { component: ElInput, label: '号码', field: 'phone', placeholder: '请输入' },
  {
    component: ElSelect,
    label: '状态',
    field: 'callback',
    clearable: true,
    options: [{ label: '已接通', value: '1' }, { label: '已同意', value: '2' }, { label: '未接通(通话中/语音助手/在忙稍后回电)', value: '3' },
      { label: '拒绝', value: '4' }, { label: '直接挂断', value: '5' }, { label: '关机/停机/空号', value: '0' }]
  }

]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'phone', label: '号码', width: '180' },
  { prop: 'user_id', label: '会员', width: '180' },
  { prop: 'callback', label: '反馈', width: '180' },
  { prop: 'remark', label: '备注', width: '180' },
  { prop: 'updated_at', label: '更新时间', width: '180' }
]
