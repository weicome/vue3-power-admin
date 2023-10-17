import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { UserInfoModel } from '@/api/_system/model/userModel'
import type { ColumnAttrs } from '@/components/TableModel'
import { useSlotTag } from '@/components/TableModel'

const { ElInput, ElSelect } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElInput, label: '姓名', field: 'name', placeholder: '请输入' },
  { component: ElInput, label: '账号', field: 'email', placeholder: '请输入' },
  { component: ElSelect, label: '状态', field: 'status', clearable: true, options: [{ label: '正常', value: '1' }, { label: '禁用', value: '0' }] }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'name', label: '名字', width: '180' },
  { prop: 'email', label: '账号', width: '180' },
  {
    prop: 'status',
    label: '状态',
    width: '80',
    slot: ({ row }: ColumnAttrs<UserInfoModel>) =>
      [h('span', row.status === '1' ? '正常' : '禁用')]
  }
]
