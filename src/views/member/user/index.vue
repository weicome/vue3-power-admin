<script setup lang="ts" name="MemberUser">
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum } from './usePage'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import TableModel, { useSlotButton } from '@/components/TableModel'
  import { getUserList, addUser, updateUser, deleteUser } from '@/api/_system/user'
  import type { UserInfoModel } from '@/api/_system/model/userModel'
  import { useMessage } from '@/hooks/web/useMessage'
  import { getRoles } from '@/api/_system/role'
  import type { RoleModel } from '@/api/_system/model/roleModel'

  const tableModelRef = ref()
  const { $message, $msgbox } = useMessage()

  const roleSelectData = reactive<RoleModel[]>([] as unknown as RoleModel[])
  const queryData = reactive<Record<string, any>>({
    username: '',
    account: '',
    status: '',
    role: ''
  })

  const loading = ref(false)
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<UserInfoModel>) =>
        [
          // useSlotButton('详情', () => {
          //   router.push(`/system/user/detail/${row.id}`)
          // }),
          useSlotButton('编辑', () => {
            handleUpdate(row)
          }),
          useSlotButton('删除', () => {
            handleDelete([row])
          }, { type: 'danger' })
        ]
    }
  ])
  const tableData = ref<UserInfoModel[]>([])
  const selectedData = ref<UserInfoModel[]>([])

  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })

  const visible = ref(false)
  const submitType = ref(SubmitTypeEnum.ADD)

  function handleReset() {
    Object.assign(queryData, {})
    loadData()
  }

  function handleSelectionChange(rows: UserInfoModel[]) {
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

  function handleDelete(rows: UserInfoModel[]) {
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
      deleteUser<string | number>(ids).then(() => {
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
      const { data, meta } = await getUserList({
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
  const initialForm: UserInfoModel = {
    id: '',
    account: '',
    username: '',
    avatar: '',
    password: null,
    status: 1,
    roles: [],
    created_at: ''
  }
  const submitForm = reactive<UserInfoModel>(initialForm)
  async function handleAdd() {
    await getRoleList()
    Object.assign(submitForm, {})
    submitType.value = SubmitTypeEnum.ADD
    visible.value = true
  }
  async function handleUpdate(row: UserInfoModel) {
    await getRoleList()
    submitType.value = SubmitTypeEnum.UPDATE
    const rowData: Record<string, any> = reactive(cloneDeep(toRaw(row)))
    rowData.roles = row.roles.map(r => r.id)
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    account: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择状态', trigger: 'change' }
    ],
    roles: [
      { required: true, message: '请选择角色', trigger: 'change' }
    ]
  })
  const submitFormRef = ref<FormInstance>()
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          addUser(submitForm as UserInfoModel)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
        else {
          updateUser(submitForm)
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
  async function getRoleList(): Promise<void> {
    const { data } = await getRoles()
    Object.assign(roleSelectData, data)
  }
  loadData()
</script>

<template>
  <div page-card>
    <SearchModel
      v-model="queryData"
      :config="config"
      :per-line-count="4"
      @query="loadData"
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
        <el-form-item label="账号" prop="account">
          <el-input v-model="submitForm.account" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="submitForm.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="submitForm.password" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="submitForm.roles" multiple style="width: 100%">
            <el-option v-for="(item, index) in roleSelectData" :key="index" :label="item.name" :value="item.id" />
          </el-select>
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
