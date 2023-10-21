<script setup lang="ts" name="MemberUser">
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum } from './usePage'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import TableModel, { useSlotButton } from '@/components/TableModel'
  import * as memberUserApi from '@/api/member/user'
  import type { MemberUserModel } from '@/api/member/model/MemberModel'
  import { useMessage } from '@/hooks/web/useMessage'
  import { router } from '@/router'

  const tableModelRef = ref()
  const { $message, $msgbox } = useMessage()
  const submitType = ref({ label: SubmitTypeEnum.ADD as string, val: 0 })

  const queryData = reactive<Record<string, any>>({
    leader_id: '',
    type: '',
    phone: ''
  })

  const loading = ref(false)
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<MemberUserModel>) =>
        [
          useSlotButton('修改', () => {
            handleUpdate(row)
          }, { type: 'success' }),
          useSlotButton('删除', () => {
            handleDelete([row])
          }, { type: 'danger' }),
          useSlotButton('IP白名单', () => {
            handleIpChange(row)
          }, { type: 'success' }),
          useSlotButton('拨打统计', () => {
            handleStat(row)
          }, { type: 'success' })
        ]
    }
  ])
  const submitFormIP = reactive<Record<string, any>>({})
  const handleIpChange = (row: MemberUserModel) => {
    submitFormIP.value = { ip: '', id: row.id }
    submitType.value = { label: SubmitTypeEnum.IP, val: 2 }
    visible.value = true
  }
  const statData = reactive<Record<string, any>>({})
  const handleStat = (row: MemberUserModel) => {
    statData.value = memberUserApi.telMemberUserStat({ id: row.id })
    submitType.value = { label: `组长《${row.username}》${SubmitTypeEnum.STAT}`, val: 3 }
    visible.value = true
  }
  const tableData = ref<MemberUserModel[]>([])
  const selectedData = ref<MemberUserModel[]>([])

  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })

  const visible = ref(false)

  function handleReset() {
    Object.assign(queryData, {})
    loadData()
  }

  function handleSelectionChange(rows: MemberUserModel[]) {
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

  function handleDelete(rows: MemberUserModel[]) {
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
      memberUserApi.deleteMemberUser<string | number>(ids).then(() => {
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
      const { data, meta } = await memberUserApi.getMemberUserList({
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
  const submitForm = reactive<MemberUserModel>({} as unknown as MemberUserModel)
  async function handleAdd() {
    Object.assign(submitForm, {})
    submitType.value = { label: SubmitTypeEnum.ADD, val: 0 }
    visible.value = true
  }
  async function handleUpdate(row: MemberUserModel) {
    submitType.value = { label: SubmitTypeEnum.UPDATE, val: 1 }
    const rowData: Record<string, any> = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: '名称', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择状态', trigger: 'change' }
    ]
  })
  const submitFormRef = ref<FormInstance>()
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          addMemberUser(submitForm as MemberUserModel)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
        else {
          updateMemberUser(submitForm)
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="submitForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="账号" prop="email">
          <el-input v-model="submitForm.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="submitForm.password" placeholder="请输入" />
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
