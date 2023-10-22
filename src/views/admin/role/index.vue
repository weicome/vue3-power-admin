<script setup lang="ts" name="Role">
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum } from './usePage'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import TableModel, { useSlotButton } from '@/components/TableModel'
  import { getRoleList, getRoleInfo, addRole, updateRole, deleteRole } from '@/api/_system/role'
  import type { RoleModel } from '@/api/_system/model/roleModel'
  import { useMessage } from '@/hooks/web/useMessage'
  import { getMenuTree } from '@/api/_system/menu'

  const tableModelRef = ref()
  const { $message } = useMessage()
  const loading = ref(false)
  const queryData = reactive({
    name: ''
  })
  const menuTree = reactive([])
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<RoleModel>) =>
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
  const tableData = ref<RoleModel[]>([])
  const selectedData = ref<RoleModel[]>([])

  const pagination = reactive({
    page: 1,
    size: 10,
    total: 100
  })

  const visible = ref(false)
  const submitType = ref(SubmitTypeEnum.ADD)

  function handleQuery() {
    loadData()
  }

  function handleReset() {
    Object.assign(queryData, {})
    loadData()
  }

  function handleSelectionChange(rows: RoleModel[]) {
    selectedData.value = rows
  }

  function handlePageChange(current: number) {
    pagination.page = current
    loadData()
  }

  function handleSizeChange(size: number) {
    pagination.size = size
    loadData()
  }

  function handleDelete(rows: RoleModel[]) {
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
        ids.push(item.id)
      })
      deleteRole<string | number>(ids).then(() => {
        $message.success('删除成功！')
        loadData()
      }).catch((e) => {
        $message.warning(e)
      })
    })
  }

  function loadData() {
    loading.value = true
    setTimeout(async () => {
      const { data, meta } = await getRoleList({
        query: queryData,
        ...pagination
      })
      pagination.page = meta.pagination.current_page
      pagination.size = meta.pagination.per_page
      pagination.total = meta.pagination.count
      loading.value = false
      tableData.value = data
    }, 300)
  }

  loadData()
  const initialForm: RoleModel = {
    name: '',
    symbol: '',
    menus: [],
    remark: '',
    status: 1,
    id: 0,
    created_at: '',
    updated_at: ''
  }
  const submitForm = reactive<RoleModel>(initialForm)
  async function handleAdd() {
    await getMenuS()
    Object.assign(submitForm, initialForm)
    submitType.value = SubmitTypeEnum.ADD
    visible.value = true
  }
  async function handleUpdate(row: RoleModel) {
    await getMenuS()
    submitType.value = SubmitTypeEnum.UPDATE
    const rowData = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: '请输入权限名称', trigger: 'blur' }
    ],
    symbol: [
      { required: true, message: '请输入权限代码', trigger: 'blur' }
    ],
    menus: [
      { required: true, message: '请选择权限关联菜单', trigger: 'change' }
    ]
  })
  const submitFormRef = ref<FormInstance>()
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          addRole(submitForm).then((res) => {
            visible.value = false
            $message.success('保存成功！')
            loadData()
          }).catch((e) => {
            $message.warning(e)
          })
        }
        else {
          updateRole(submitForm)
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

  async function getMenuS() {
    const menus = await getMenuTree()
    Object.assign(menuTree, menus)
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
      v-model:pagination="pagination"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      row-key="id"
      @selection-change="handleSelectionChange"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="submitForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="代码" prop="symbol">
          <el-input v-model="submitForm.symbol" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="菜单" prop="menus">
          <el-tree
            v-model="submitForm.menus"
            style="width: 100%"
            :data="menuTree"
            show-checkbox
            node-key="id"
            :default-expanded-keys="submitForm.menus"
            :default-checked-keys="submitForm.menus"
            :props="{
              children: 'children',
              label: 'label',
            }"
          />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="submitForm.remark" type="textarea" placeholder="请输入" />
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
