import { Icon } from '@iconify/vue'
import type { SearchItemConfig } from '@/components/SearchModel'
import { useComponent } from '@/components/SearchModel'
import type { MenuModel } from '@/api/_system/model/menuModel'
import type { ColumnAttrs } from '@/components/TableModel'
import { useSlotTag } from '@/components/TableModel'

const { ElInput, ElSelect } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElInput, label: '名称', field: 'title', placeholder: '请输入' },
  { component: ElSelect, label: '类型', field: 'type', clearable: true, options: [{ label: '目录', value: 0 }, { label: '菜单', value: 1 }, { label: '按钮', value: 2 }] }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop: 'id', label: '编号', width: '70', align: 'center' },
  { prop: 'title', label: '名称', width: '120' },
  { prop: 'type', label: '类型', width: '140', slot: ({ row }: ColumnAttrs<MenuModel>) => [useSlotTag(row?.type ? '菜单' : '目录')] },
  { prop: 'icon', label: '图标', width: '80', slot: ({ row }: ColumnAttrs<MenuModel>) => [h(Icon, { icon: row.icon })] },
  { prop: 'component', label: '组件目录', width: '220' },
  { prop: 'path', label: '路由地址' },
  { prop: 'redirect', label: '重定向' },
  {
    prop: 'status',
    label: '状态',
    width: '80',
    slot: ({ row }: ColumnAttrs<MenuModel>) =>
      [h('span', row.status === 1 ? '正常' : '禁用')]
  },
  { prop: 'sort', label: '排序' }
]
