<script setup lang="ts" name="MemberLeader">
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { staticColumns, SubmitTypeEnum } from './usePage'
  import * as leaderApi from '@/api/member/leader'
  import type { MemberLeaderModel } from '@/api/member/model/MemberModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import { useMessage } from '@/hooks/web/useMessage'
  import TableModel, { useSlotButton } from '@/components/TableModel'

  const { $message, $msgbox } = useMessage()
  const tableModelRef = ref()
  const loading = ref(false)
  const tableData = ref<MemberLeaderModel[]>([])
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<MemberLeaderModel>) =>
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
  const loadData = () => {
    // loading.value = true
    setTimeout(async () => {
      const { data, meta } = await leaderApi.getMemberLeaderList({ ...pagination })
      pagination.page = meta.pagination.current_page
      pagination.size = meta.pagination.per_page
      pagination.total = meta.pagination.count
      loading.value = false
      tableData.value = data
    }, 300)
  }
  const submitFormIP = reactive<Record<string, any>>({})
  const handleIpChange = (row: MemberLeaderModel) => {
    submitFormIP.value = { ip: '', id: row.id }
    submitType.value = { label: SubmitTypeEnum.IP, val: 2 }
    visible.value = true
  }
  const statData = reactive<Record<string, any>>({})
  const handleStat = (row: MemberLeaderModel) => {
    statData.value = leaderApi.telMemberLeaderStat({ id: row.id })
    submitType.value = { label: `组长《${row.username}》${SubmitTypeEnum.STAT}`, val: 3 }
    visible.value = true
  }
  const visible = ref(false)
  const submitType = ref({ label: SubmitTypeEnum.ADD as string, val: 0 })
  const submitFormRef = ref<FormInstance>()
  const submitForm = reactive<MemberLeaderModel>({} as unknown as MemberLeaderModel)

  function handlePageChange(current: number) {
    pagination.page = current
    loadData()
  }
  function handleSizeChange(size: number) {
    pagination.size = size
    loadData()
  }
  const handleAdd = async () => {
    Object.assign(submitForm, {})
    submitType.value = { label: SubmitTypeEnum.ADD, val: 0 }
    visible.value = true
  }
  async function handleUpdate(row: MemberLeaderModel) {
    submitType.value = { label: SubmitTypeEnum.UPDATE, val: 1 }
    const rowData = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const handleDelete = (rows: MemberLeaderModel[]) => {
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
      leaderApi.deleteMemberLeader<string | number>(ids).then(() => {
        $message.success('删除成功！')
        loadData()
      }).catch((e) => {
        $message.warning(e)
      })
    })
  }
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
      { required: false, message: '请输入请输入密码', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号码', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' }
    ]
  })
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          leaderApi.addMemberLeader(submitForm as MemberLeaderModel)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
        else {
          leaderApi.updateMemberLeader(submitForm)
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
    <div flex items="center">
      <el-button type="primary" @click="handleAdd">
        <div i-ri-add-fill mr-1 /> 添加组长
      </el-button>
    </div>
    <TableModel
      ref="tableModelRef"
      v-model:pagination="pagination"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      row-key="id"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />
    <el-dialog
      v-model="visible"
      :width="600"
      :title="submitType.label"
      :show-close="false"
      :close-on-click-modal="false"
      @closed="submitFormRef?.resetFields()"
    >
      <el-form
        v-if="submitType.val === 1 || submitType.val === 0"
        ref="submitFormRef"
        :model="submitForm"
        :rules="rules"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="号码" prop="phone">
          <el-input v-model="submitForm.phone" placeholder="请输入" />
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

      <el-form
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-table v-if="submitType.val === 3" :data="statData" border style="width: 200px">
          <el-table-column prop="item" label="拨打结果统计" width="180" />
        </el-table>
      </el-form>
      <template v-if="submitType.val !== 2" #footer>
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

<style scoped>

</style>
