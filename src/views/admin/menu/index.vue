<script setup lang="ts" name="Menu">
  import { match } from 'assert'
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum } from './usePage'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import TableModel, { useSlotButton } from '@/components/TableModel'
  import { getMenuList, addMenu, updateMenu, deleteMenu } from '@/api/_system/menu'
  import type { MenuModel } from '@/api/_system/model/menuModel'
  import { useMessage } from '@/hooks/web/useMessage'

  const tableModelRef = ref()
  const { $message } = useMessage()

  const queryData = reactive({
    title: '',
    type: ''
  })

  const loading = ref(false)
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<MenuModel>) =>
        [
          useSlotButton('编辑', () => {
            handleUpdate(row)
          }),
          useSlotButton('删除', () => {
            handleDelete([row])
          }, { type: 'danger' })
        ]
    }
  ])
  const tableData = ref<MenuModel[]>([])
  const selectedData = ref<MenuModel[]>([])

  const visible = ref(false)
  const submitType = ref(SubmitTypeEnum.ADD)

  function handleQuery() {
    loadData()
  }

  function handleReset() {
    loadData()
  }

  function handleSelectionChange(rows: MenuModel[]) {
    selectedData.value = rows
  }

  function handleDelete(rows: MenuModel[]) {
    const { $msgbox } = useMessage()
    $msgbox.confirm(
      '确认删除选中数据条目吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      const ids: Array<string | number> = []
      rows.forEach((item) => {
        ids.push(item.id as number)
      })
      deleteMenu<string | number>(ids).then(() => {
        $message.success('删除成功！')
        loadData()
      }).catch((e) => {
        $message.warning(e)
      })
      loadData()
    })
  }

  function loadData() {
    loading.value = true
    setTimeout(async () => {
      const { data } = await getMenuList({ query: queryData })
      loading.value = false
      tableData.value = data
    }, 300)
  }

  loadData()

  const submitForm = reactive<MenuModel>({
    title: '',
    name: '',
    path: '',
    icon: '',
    component: '',
    redirect: '',
    pid: 0,
    route: '',
    type: 0,
    status: 0,
    sort: 1
  } as unknown as MenuModel)

  function handleAdd() {
    submitType.value = SubmitTypeEnum.ADD
    visible.value = true
  }

  const submitFormRef = ref<FormInstance>()

  const rules = reactive<FormRules>({
    title: [
      { required: true, message: '请输入菜单名称', trigger: 'blur' }
    ],
    leaf: [
      { required: true, message: '请选择类型', trigger: 'change' }
    ],
    path: [
      { required: true, message: '请输入路由地址', trigger: 'blur' }
    ],
    component: [
      { required: true, message: '请输入页面组件目录', trigger: 'blur' }
    ]
  })

  function handleUpdate(row: MenuModel) {
    submitType.value = SubmitTypeEnum.UPDATE
    const rowData = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }

  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          addMenu(submitForm).then((res) => {
            visible.value = false
            $message.success('保存成功！')
            loadData()
          }).catch((e) => {
            $message.warning(e)
          })
        }
        else {
          updateMenu(submitForm)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
      }
      else {
        $message.warning('请完善必填选项！')
      }
    })
  }

  const pidSelect = reactive([
    { label: '根目录', value: 0 }
  ])
  function selectTypeChange(row: number) {
    Object.assign(pidSelect, [])
    tableData.value.forEach(e =>
      e.type === row && pidSelect.push({ label: e.title, value: e.id as number }
      ))
  }
</script>

<template>
  <div page-card>
    <SearchModel
      v-model="queryData"
      :config="config"
      :per-line-count="4"
      @query="handleQuery"
      @reset="handleReset"
    />
    <div flex items="center">
      <el-button type="primary" @click="handleAdd">
        <div i-ri-add-fill mr-1 /> 新增
      </el-button>
      <el-button type="danger" :disabled="!selectedData.length" @click="handleDelete(selectedData)">
        <div i-ri-delete-bin-line mr-1 /> 删除
      </el-button>
    </div>
    <TableModel
      ref="tableModelRef"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      row-key="id"
      @selection-change="handleSelectionChange"
    />
    <el-dialog
      v-model="visible"
      :width="600"
      :title="submitType"
      :show-close="false"
      :close-on-click-modal="false"
      @closed="submitFormRef?.resetFields()"
    >
      <el-form
        ref="submitFormRef"
        :model="submitForm"
        :rules="rules"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="submitForm.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="submitForm.name" placeholder="请输入路由名称" />
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input v-model="submitForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="submitForm.type" @change="selectTypeChange">
            <el-radio :label="0" border>
              目录
            </el-radio>
            <el-radio :label="1" border>
              菜单
            </el-radio>
            <el-radio :label="2" border>
              按钮
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="submitForm.pid" style="width: 100%">
            <el-option v-for="(item, index) in pidSelect" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirect">
          <el-input v-model="submitForm.redirect" placeholder="请输入重定向地址" />
        </el-form-item>
        <el-form-item label="组件目录" prop="component">
          <el-input v-model="submitForm.component" placeholder="请输入组件目录" />
        </el-form-item>
        <el-form-item label="接口地址" prop="route">
          <el-input v-model="submitForm.route" placeholder="请输入接口地址" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="submitForm.sort" placeholder="请输入排序号" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="submitForm.status">
            <el-radio :label="1" border>
              正常
            </el-radio>
            <el-radio :label="0" border>
              禁用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
