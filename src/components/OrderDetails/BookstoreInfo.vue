<!-- BookstoreInfo.vue -->
<template>
  <n-card title="Bookstore Information">
    <n-descriptions bordered>
      <n-descriptions-item label="Address">
        {{ info.address }}
      </n-descriptions-item>
      <n-descriptions-item label="Email">
        {{ info.email }}
      </n-descriptions-item>
      <n-descriptions-item label="Phone">
        {{ info.phone }}
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NDescriptions, NDescriptionsItem } from 'naive-ui'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const info = orderStore.bookstoreInfo
</script>
