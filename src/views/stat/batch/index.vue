<script setup lang="ts" name="StatBatch">
  import * as statApi from '@/api/stat'

  const tableModelRef = ref()
  const loading = ref(false)
  const tableData = ref<Array<Record<string, any>>>([])
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })
  const columns = ref([
    { prop: 'batch', label: '批次' },
    { prop: 'count', label: '数据总计' },
    { prop: 'created_at', label: '添加时间' }
  ])
  function handlePageChange(current: number) {
    pagination.page = current
    loadData()
  }

  function handleSizeChange(size: number) {
    pagination.size = size
    loadData()
  }
  const loadData = () => {
    loading.value = true
    setTimeout(async () => {
      const { data, meta } = await statApi.getPhoneBatch({ ...pagination })
      tableData.value = data
      loading.value = false
      pagination.page = meta.pagination.current_page
      pagination.size = meta.pagination.per_page
      pagination.total = meta.pagination.count
    }, 300)
  }

  loadData()
</script>

<template>
  <div page-card>
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
  </div>
</template>

<style scoped>

</style>
