<script setup lang="ts" name="MemberPhone">
  import type { FormInstance, FormRules } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum } from './usePage'
  import { getMemberPhoneList, addMemberPhone, updateMemberPhone, deleteMemberPhone } from '@/api/member/phone'
  import type { MemberPhoneModel } from '@/api/member/model/MemberModel'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import { useMessage } from '@/hooks/web/useMessage'
  import TableModel, { useSlotButton } from '@/components/TableModel'

  const { $message, $msgbox } = useMessage()
  const tableModelRef = ref()
  const visible = ref(false)
  const submitType = ref(SubmitTypeEnum.ADD)
  const submitFormRef = ref<FormInstance>()
  const queryData = reactive<Record<string, any>>({
    phone: ''
  })
  const loading = ref(false)
  const tableData = ref<MemberPhoneModel[]>([])
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })
  const initialForm: MemberPhoneModel = {
    id: 0,
    user_id: 0,
    phone: '',
    remark: '',
    callback: '',
    createTime: '',
    created_at: '',
    updateTime: '',
    updated_at: ''
  }
  const submitForm = reactive<MemberPhoneModel>(initialForm)
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<MemberPhoneModel>) =>
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
  const loadData = () => {
    loading.value = true
    setTimeout(async () => {
      const { data, meta } = await getMemberPhoneList({
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
  const handleReset = () => {
    Object.assign(queryData, {})
    loadData()
  }
  function handleSelectionChange(rows: MemberPhoneModel[]) {
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
  const selectedData = ref<MemberPhoneModel[]>([])
  const handleAdd = async () => {
    Object.assign(submitForm, {})
    submitType.value = SubmitTypeEnum.ADD
    visible.value = true
  }
  async function handleUpdate(row: MemberPhoneModel) {
    submitType.value = SubmitTypeEnum.UPDATE
    const rowData = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const handleDelete = (rows: MemberPhoneModel[]) => {
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
      deleteMemberPhone<string | number>(ids).then(() => {
        $message.success('删除成功！')
        loadData()
      }).catch((e) => {
        $message.warning(e)
      })
    })
  }

  const rules = reactive<FormRules>({
    phone: [
      { required: true, message: '请输入号码', trigger: 'blur' }
    ],
    user_id: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ]
  })
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          addMemberPhone(submitForm as MemberPhoneModel)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
        else {
          updateMemberPhone(submitForm)
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
      <el-button type="primary">
        <div i-ri-upload-cloud-fill mr-1 /> 上传
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
        <el-form-item label="号码" prop="phone">
          <el-input v-model="submitForm.phone" placeholder="请输入" />
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

<style scoped>

</style>
