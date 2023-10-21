<script setup lang="ts" name="Phone">
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
  const handleButton = async (id: number) => {
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
      <el-button type="success" @click="handleButton(0)">
        <div i-ri-add-fill mr-1 /> 新增
      </el-button>
      <el-button type="primary" @click="handleButton(1)">
        <div i-ri-exchange-box-fill mr-1 /> 导出并清除所有数据
      </el-button>
      <el-button type="danger" @click="handleButton(2)">
        <div i-ri-format-clear mr-1 /> 清除所有数据
      </el-button>
      <el-button type="danger" @click="handleButton(3)">
        <div i-ri-delete-bin-line mr-1 /> 批次删除
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
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="号码" prop="phone">
          <el-input v-model="submitForm.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="批次" prop="batch">
          <el-input v-model="submitForm.batch" placeholder="请输入" />
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

<style scoped>

</style>
