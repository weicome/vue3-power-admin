import type { RoleModel } from '@/api/_system/model/roleModel'
import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { ColumnAttrs } from '@/components/TableModel'

const { ElInput } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElInput, label: '名称', field: 'name', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'name', label: '名称', width: '180' },
  { prop: 'symbol', label: '代码', width: '140' },
  { prop: 'remark', label: '描述' },
  {
    prop: 'status',
    label: '状态',
    width: '80',
    slot: ({ row }: ColumnAttrs<RoleModel>) =>
      [h('span', row.status === 1 ? '正常' : '禁用')]
  }
]
