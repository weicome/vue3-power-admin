<script setup lang="ts" name="Phone">
  import { type FormInstance, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus'
  import { leaders } from '../member/user/usePage'
  import { config, staticColumns, SubmitTypeEnum, dataStatus, batchs } from './usePage'
  import * as phoneApi from '@/api/phone'
  import type { PhoneModel } from '@/api/phone/model/PhoneModel'
  import SearchModel from '@/components/SearchModel'
  import { useMessage } from '@/hooks/web/useMessage'
  import TableModel from '@/components/TableModel'

  const { $message, $msgbox } = useMessage()
  const tableModelRef = ref()
  const visible = ref(false)
  const submitType = ref({ label: SubmitTypeEnum.ADD as string, val: 0 })
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
    leader_id: 0,
    file: ''
  })
  const loadData = () => {
    loading.value = true
    setTimeout(async () => {
      const { data, meta } = await phoneApi.getPhoneList({
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
  const handleButton = async (val: number) => {
    Object.assign(submitForm, {})
    visible.value = true
    if (val === 0) {
      submitType.value = { label: SubmitTypeEnum.ADD, val }
    }
    else if (val === 1) {
      submitType.value = { label: SubmitTypeEnum.EXPORT, val }
    }
    else if (val === 2) {
      visible.value = false
      submitType.value = { label: SubmitTypeEnum.ADD, val }
      $msgbox.confirm(
        '确定要清除所有的数据吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        phoneApi.clearPhone().then(() => {
          $message.success('删除成功！')
          loadData()
        }).catch((e) => {
          $message.warning(e)
        })
      })
    }
    else if (val === 3) {
      submitType.value = { label: SubmitTypeEnum.BATCHDEL, val }
    }
  }
  async function handleSubmit() {
    let result: PhoneModel | null = null
    if (submitType.value.val !== 2) {
      submitFormRef.value?.validate(async (valid) => {
        if (valid) {
          if (submitType.value.val === 0) {
            result = await phoneApi.addPhone(submitForm as PhoneModel)
          }
          else if (submitType.value.val === 1) {
            result = await phoneApi.exportPhone(submitForm as PhoneModel)
          }
          else if (submitType.value.val === 3) {
            result = await phoneApi.deletePhone(submitForm as PhoneModel)
          }
          if (result !== undefined || result !== null) {
            visible.value = false
            $message.success('操作成功！')
            loadData()
          }
          else {
            $message.warning('出现错误，请重试')
          }
        }
        else {
          $message.warning('请完善必填选项！')
        }
      })
    }
  }
  const uploadRef = ref<UploadInstance>()
  const formDatas = new FormData()
  const submitUpload = () => {
    if (submitForm.files !== '') {
      phoneApi.uploadPhone(formDatas)
        .then((res) => {
          submitForm.file = res![0]
          $message.success('上传成功')
        }).catch((e) => {
          $message.warning(e)
        })
    }
  }
  const fileChange = (val: any, fileList: any) => {
    formDatas.append('file', val.raw)
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
      :columns="staticColumns"
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
        v-if="submitType.val === 0"
        ref="submitFormRef"
        :model="submitForm"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="归属组长" prop="leader_id">
          <el-select v-model="submitForm.leader_id" style="width: 100%">
            <el-option v-for="(item, index) in leaders" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="号码文件" prop="file">
          <el-upload
            ref="uploadRef"
            :auto-upload="false"
            :limit="1"
            accept=".txt"
            :with-credentials="true"
            :on-change="fileChange"
          >
            <template #trigger>
              <el-input v-model="submitForm.file" placeholder="请选择文件" />
            </template>

            <el-button class="ml-3" type="success" @click="submitUpload">
              <div i-ri-upload-cloud-fill mr-1 /> 上传
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form
        v-if="submitType.val === 1"
        ref="submitFormRef"
        :model="submitForm"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="归属组长" prop="leader_id">
          <el-select v-model="submitForm.leader_id" style="width: 100%">
            <el-option v-for="(item, index) in leaders" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据状态" prop="status">
          <el-select v-model="submitForm.status" style="width: 100%">
            <el-option v-for="(item, index) in dataStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        v-if="submitType.val === 3"
        ref="submitFormRef"
        :model="submitForm"
        label-width="100px"
        style="width: 95%"
        status-icon
      >
        <el-form-item label="批次信息" prop="leader_id">
          <el-select v-model="submitForm.batch" style="width: 100%">
            <el-option v-for="(item, index) in batchs" :key="index" :label="item.label" :value="item.value" />
          </el-select>
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
