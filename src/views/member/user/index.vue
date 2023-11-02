<script setup lang="ts" name="MemberUser">
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum, leaders, groupType } from './usePage'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import TableModel, { useSlotButton } from '@/components/TableModel'
  import * as memberUserApi from '@/api/member/user'
  import type { MemberUserModel } from '@/api/member/model/MemberModel'
  import { useMessage } from '@/hooks/web/useMessage'

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
  const StatCount = ref('')
  const StatData = reactive<Record<string, any>>({})
  const handleStat = async (row: MemberUserModel) => {
    const result = await memberUserApi.telMemberUserStat({ id: row.id })
    Object.assign(StatData, result)
    StatCount.value = ''
    submitType.value = { label: `组员《${row.username}》${SubmitTypeEnum.STAT}`, val: 3 }
    const count = result?.reduce((total, obj) => total + obj.value, 0)
    StatCount.value = `总拨打统计《${count}》`
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
  async function handleAdd(val: number) {
    Object.assign(submitForm, { status: 1 })
    submitType.value = { label: val === 0 ? SubmitTypeEnum.ADD : SubmitTypeEnum.BATCH, val }
    visible.value = true
  }
  async function handleUpdate(row: MemberUserModel) {
    submitType.value = { label: SubmitTypeEnum.UPDATE, val: 1 }
    const rowData: Record<string, any> = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '账号', trigger: 'blur' }
    ]
  })
  const submitFormRef = ref<FormInstance>()
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value.val === 0) {
          memberUserApi.addMemberUser(submitForm as MemberUserModel)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
        else {
          memberUserApi.updateMemberUser(submitForm)
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
      <el-button type="primary" @click="handleAdd(0)">
        <div i-ri-add-fill mr-1 /> 新增
      </el-button>
      <el-button type="primary" @click="handleAdd(5)">
        <div i-ri-user-add-line mr-1 /> 批量添加
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
      :width="560"
      :title="submitType.label"
      :show-close="false"
      :close-on-click-modal="false"
      @closed="submitFormRef?.resetFields()"
    >
      <el-form
        v-if="submitType.val === 0 || submitType.val === 1"
        ref="submitFormRef"
        :model="submitForm"
        :rules="rules"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="submitForm.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="submitForm.password" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="归属组长" prop="leader_id">
          <el-select v-model="submitForm.leader_id" style="width: 100%">
            <el-option v-for="(item, index) in leaders" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="组员类型" prop="type">
          <el-select v-model="submitForm.type" style="width: 100%">
            <el-option v-for="(item, index) in groupType" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="submitForm.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="submitForm.email" placeholder="请输入" />
        </el-form-item>
      </el-form>

      <el-form
        v-if="submitType.val === 2 "
        :model="submitFormIP"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="新增IP" prop="ip">
          <el-input v-model="submitFormIP.ip" placeholder="请输入" />
        </el-form-item>
      </el-form>

      <el-descriptions v-if="submitType.val === 3" :title="StatCount" :column="1" border>
        <el-descriptions-item
          v-for="(item, key) in StatData"
          :key="key"
          :label="item.label"
          label-align="center"
          align="center"
          width="150px"
        >
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button v-if="submitType.val !== 3" type="primary" @click="handleSubmit">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
