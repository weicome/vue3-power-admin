<script setup lang="ts" name="StatSummary">
  import { genFileId, type FormInstance, type FormRules, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
  import { config, staticColumns, SubmitTypeEnum } from './usePage'
  import { getPhoneList, addPhone, updatePhone, deletePhone, uploadPhone } from '@/api/phone'
  import type { PhoneModel } from '@/api/phone/model/PhoneModel'
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
  const tableData = ref<PhoneModel[]>([])
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })

  const submitForm = reactive<Record<string, any>>({
    leader_id: 0
  })
  const columns = ref([
    ...staticColumns,
    {
      fixed: 'right',
      label: '操作',
      width: '160',
      slot: ({ row }: ColumnAttrs<PhoneModel>) =>
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
      const { data, meta } = await getPhoneList({
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
  function handleSelectionChange(rows: PhoneModel[]) {
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
  const selectedData = ref<PhoneModel[]>([])
  const handleAdd = async () => {
    Object.assign(submitForm, {})
    submitType.value = SubmitTypeEnum.ADD
    visible.value = true
  }
  async function handleUpdate(row: PhoneModel) {
    submitType.value = SubmitTypeEnum.UPDATE
    const rowData = reactive(cloneDeep(toRaw(row)))
    Object.assign(submitForm, rowData)
    visible.value = true
  }
  const handleDelete = (rows: PhoneModel[]) => {
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
      deletePhone<string | number>(ids).then(() => {
        $message.success('删除成功！')
        loadData()
      }).catch((e) => {
        $message.warning(e)
      })
    })
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
  function handleSubmit() {
    submitFormRef.value?.validate((valid) => {
      if (valid) {
        if (submitType.value === SubmitTypeEnum.ADD) {
          addPhone(submitForm as PhoneModel)
            .then(() => {
              visible.value = false
              $message.success('保存成功！')
              loadData()
            }).catch((e) => {
              $message.warning(e)
            })
        }
        else {
          updatePhone(submitForm)
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
  const uploadRef = ref<UploadInstance>()
  const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value?.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
  }
  const submitUpload = () => {
    uploadRef.value!.submit()
  }
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
  </div>
</template>

<style scoped>

</style>
