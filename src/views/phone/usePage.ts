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
  { component: ElInput, label: '批次', field: 'batch', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'phone', label: '号码', width: '180' },
  { prop: 'batch', label: '批次', width: '180' },
  {
    prop: 'status',
    label: '状态',
    width: '80',
    slot: ({ row }: ColumnAttrs<PhoneModel>) =>
      [h('span', row.status === '1' ? '正常' : '禁用')]
  },
  { prop: 'updated_at', label: '更新时间', width: '180' }
]
