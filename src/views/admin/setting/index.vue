<script setup lang="ts" name="SystemSetting">
  import type { FormInstance, FormRules } from 'element-plus'

  const submitForm = reactive({
    size: 15,
    second: 5,
    func: '随机',
    oepn: 0
  })
  const submitFormRef = ref<FormInstance>()
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '账号', trigger: 'blur' }
    ]
  })
  const handleSubmit = () => {

  }
</script>

<template>
  <div page-card>
    <el-form
      ref="submitFormRef"
      :model="submitForm"
      :rules="rules"
      label-width="auto"
      style="width: 95%"
      status-icon
    >
      <el-form-item label="后台每页显示的记录数" prop="size">
        <el-input v-model="submitForm.size" style="width: 60px;" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="电销员获取的时间间隔（秒）" prop="second">
        <el-input v-model="submitForm.second" style="width: 60px;" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="电销员获取方式" prop="phone">
        <el-input v-model="submitForm.func" style="width: 60px;" placeholder="最新批次随机获取" />
      </el-form-item>
      <el-form-item label="平台白名单开启状态" prop="email">
        <el-input v-model="submitForm.oepn" style="width: 60px;" placeholder="关闭" />
      </el-form-item>
    </el-form>
    <el-button class="mt-2 ml-20" @click="handleSubmit">
      保存
    </el-button>
  </div>
</template>

<style scoped>

</style>
