import { SearchItemConfig, useComponent } from '@/components/SearchModel'

const { ElInput, ElSelect } = useComponent()

export enum SubmitTypeEnum {
  ADD = '新增',
  UPDATE = '编辑'
}

// search model config
export const config: SearchItemConfig[] = [
  { component: ElInput , label: '用户名', field: 'username', placeholder: '请输入' },
  { component: ElInput , label: '姓名', field: 'name', placeholder: '请输入' },
  { component: ElSelect , label: '性别', field: 'gender', clearable: true, options: [{ label: '男', value: '1' }, { label: '女', value: '0' }] },
  { component: ElSelect , label: '权限', field: 'role', clearable: true, options: [{ label: '用户', value: '1' }, { label: '管理员', value: '0' }] },
  { component: ElInput , label: '部门', field: 'deptName', placeholder: '请输入' },
  { component: ElInput , label: '岗位', field: 'posts', placeholder: '请输入' }
]

// table model static column config
export const staticColumns = [
  { fixed: true, type: 'selection', width: '50' },
  { fixed: true, prop:'id', label:'编号', width:'70', align:'center' },
  { prop: 'username', label:'用户名', width:'180' },
  { prop: 'name', label:'姓名', width:'140' },
  { prop: 'gender', label:'性别', width:'80' },
  { prop: 'mobile', label:'联系电话' },
  { prop: 'roles', label:'权限' },
  { prop: 'deptName', label:'所在部门' },
  { prop: 'posts', label:'就职岗位' }
]
