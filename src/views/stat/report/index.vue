<script setup lang="ts" name="StatReport">
  import { config, staticColumns } from './usePage'
  import SearchModel from '@/components/SearchModel'
  import type { ColumnAttrs } from '@/components/TableModel'
  import TableModel, { useSlotButton } from '@/components/TableModel'
  import * as statApi from '@/api/stat'
  import * as memberUserApi from '@/api/member/user'
  import type { MemberUserModel } from '@/api/member/model/MemberModel'

  const tableModelRef = ref()
  const queryData = reactive<Record<string, any>>({
    leader_id: '',
    status: '',
    phone: ''
  })
  const visible = ref(false)
  const loading = ref(false)
  const columns = ref([
    ...staticColumns,
    {
      label: '操作',
      width: '120',
      slot: ({ row }: ColumnAttrs<MemberUserModel>) =>
        [
          useSlotButton('拨打统计', () => {
            handleStat(row)
          }, { type: 'success' })
        ]
    }
  ])
  const StatTatile = ref({ tatile: '统计', count: '0' })
  const statData = reactive<Record<string, any>>({})
  const handleStat = async (row: MemberUserModel) => {
    StatTatile.value = { tatile: '统计', count: '0' }
    const result = await memberUserApi.telMemberUserStat({ id: row.id })
    Object.assign(statData, result)
    StatTatile.value.tatile = `电销员《${row.username}》拨打统计`
    const count = result?.reduce((total, obj) => total + obj.value, 0)
    StatTatile.value.count = `总拨打统计《${count}》`
    visible.value = true
  }
  const tableData = ref<Array<Record<string, any>>>([])
  const pagination = reactive({
    page: 1,
    size: 10,
    total: 0
  })
  function handleReset() {
    Object.assign(queryData, {})
    loadData()
  }
  function handlePageChange(current: number) {
    pagination.page = current
    loadData()
  }
  function handleSizeChange(size: number) {
    pagination.size = size
    loadData()
  }
  function loadData() {
    loading.value = true
    setTimeout(async () => {
      const { data, meta } = await statApi.getPhoneReport({
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
      :width="560"
      :title="StatTatile.tatile"
      :show-close="false"
      :close-on-click-modal="false"
      @closed="visible = false"
    >
      <el-descriptions :title="StatTatile.count" :column="1" border>
        <el-descriptions-item
          v-for="(item, key) in statData"
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
          <el-button @click="visible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
