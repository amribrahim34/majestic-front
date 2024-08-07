<!-- src/components/Breadcrumb.vue -->
<template>
  <n-breadcrumb class="text-sm text-gray-500">
    <n-breadcrumb-item v-for="(item, index) in items" :key="index">
      <n-button
        v-if="item.link"
        text
        tag="a"
        :href="item.link"
        class="text-gray-500 hover:text-gray-700"
      >
        {{ item.label }}
      </n-button>
      <span v-else>{{ item.label }}</span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem, NButton } from 'naive-ui'

interface BreadcrumbItem {
  label: string
  link?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
