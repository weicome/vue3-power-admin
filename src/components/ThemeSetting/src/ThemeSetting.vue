<script setup lang="ts" name="ThemeSetting">
  import ThemeSwitch from '@/components/ThemeSwitch'
  import { MenuLayout } from '@/enums/menuEnum'
  import { useSettingStore } from '@/store/modules/setting'

  const {
    hasBreadcrumb,
    hasTagsView,
    hasFooter,
    hasLocales,
    hasFpLoading,
    hasPageAnimate,
    hasProgress,
    isVerticalMenu,
    setLayout
  } = $(useSettingStore())

  const drawer = ref(false)

</script>

<template>
  <div
    fixed
    z-3
    right-0
    top="1/4"
    w-10
    h-10
    bg-dark
    dark:bg="white"
    rounded-l
    cursor="pointer"
    op="20"
    hover:op="60"
    transition-base
    text="2xl"
    flex
    justify="center"
    items="center"
    @click="drawer = true"
  >
    <i-emoji-artist-palette />
  </div>
  <el-drawer
    v-model="drawer"
    title="项目设置"
    direction="rtl"
    size="20%"
  >
    <div flex="~ col" items="center">
      <el-divider>主题</el-divider>
      <ThemeSwitch type="switch" />
      <el-divider mt-12>导航栏</el-divider>
      <div flex items="center" gap="6" text="5xl regular">
        <el-tooltip
          effect="dark"
          content="侧边菜单"
          placement="bottom"
        >
          <span :class="{ active: isVerticalMenu }" @click="setLayout(MenuLayout.VERTICAL)">
            <i-app-layout cursor="pointer" />
          </span>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="顶部菜单"
          placement="bottom"
        >
          <span :class="{ active: !isVerticalMenu }" @click="setLayout(MenuLayout.HORIZONTAL)">
            <i-app-layout transform rotate-90 cursor="pointer" />
          </span>
        </el-tooltip>
      </div>
      <el-divider mt-12>界面</el-divider>
      <div w-full flex="~ col" gap="2">
        <div flex items="center" justify-between>
          <span>面包屑</span>
          <el-switch
            v-model="hasBreadcrumb"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </div>
        <div flex items="center" justify-between>
          <span>标签页</span>
          <el-switch v-model="hasTagsView" inline-prompt active-text="开" inactive-text="关" />
        </div>
        <div flex items="center" justify-between>
          <span>页脚</span>
          <el-switch v-model="hasFooter" inline-prompt active-text="开" inactive-text="关" />
        </div>
      </div>
      <el-divider mt-12>功能</el-divider>
      <div w-full flex="~ col" gap="2">
        <div flex items="center" justify-between>
          <span>国际化</span>
          <el-switch v-model="hasLocales" inline-prompt active-text="开" inactive-text="关" />
        </div>
      </div>
      <el-divider mt-12>动效</el-divider>
      <div w-full flex="~ col" gap="2">
        <div flex items="center" justify-between>
          <span>首屏动画</span>
          <el-switch v-model="hasFpLoading" inline-prompt active-text="开" inactive-text="关" />
        </div>
        <div flex items="center" justify-between>
          <span>切换动画</span>
          <el-switch v-model="hasPageAnimate" inline-prompt active-text="开" inactive-text="关" />
        </div>
        <div flex items="center" justify-between>
          <span>进度条</span>
          <el-switch v-model="hasProgress" inline-prompt active-text="开" inactive-text="关" />
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.active {
  @apply text-primary;
}
</style>