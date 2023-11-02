<script setup lang="ts" name="StatSummary">
  import { ElSelect } from 'element-plus'
  import * as statApi from '@/api/stat'
  import type { PhoneModel } from '@/api/phone/model/PhoneModel'
  import type { SearchItemConfig } from '@/components/SearchModel'
  import SearchModel from '@/components/SearchModel'
  import { leaders } from '@/views/member/user/usePage'

  const queryData = reactive<Record<string, any>>({
    leader_id: ''
  })
  const config: SearchItemConfig[] = [
    { component: ElSelect, label: '归属组长', field: 'leader_id', clearable: true, options: leaders }
  ]
  const loading = ref(false)
  const tableData = ref<Array<Record<string, any>>>([])

  const loadData = () => {
    loading.value = true
    setTimeout(async () => {
      const result = await statApi.getPhoneSummary({
        query: queryData,
        page: 0,
        size: 0
      }) as unknown as []
      console.log(Array.from(result))
      tableData.value = Array.from(result)
      loading.value = false
    }, 300)
  }
  const handleReset = () => {
    Object.assign(queryData, {})
    loadData()
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
    <el-table
      v-loading="loading" :data="tableData" fixed
      stripe
      border
      w-full
      mt-4
      size="large"
    >
      <el-table-column prop="batch" label="批次" width="150" />
      <el-table-column prop="created_at" label="添加时间" width="150" />
      <el-table-column prop="leader_id" label="归属小组" />
      <el-table-column label="拨打统计">
        <el-table-column prop="a0" label="等待处理" width="120" />
        <el-table-column prop="a1" label="已接通" width="120" />
        <el-table-column prop="a2" label="已同意" width="120" />
        <el-table-column prop="a3" label="未接通" width="120" />
        <el-table-column prop="a4" label="拒绝" width="120" />
        <el-table-column prop="a5" label="直接挂断" width="120" />
        <el-table-column prop="a-1" label="关机/停机/空号" width="120" />
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
