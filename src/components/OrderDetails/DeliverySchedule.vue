<!-- DeliverySchedule.vue -->
<template>
  <n-card title="Delivery Schedule">
    <n-timeline>
      <n-timeline-item
        v-for="item in schedule"
        :key="item.status"
        :type="item.status === 'Delivered' ? 'success' : 'info'"
      >
        <template #header>
          {{ item.status }}
        </template>
        <template #content>
          {{ item.date }}
        </template>
      </n-timeline-item>
    </n-timeline>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NTimeline, NTimelineItem } from 'naive-ui'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const schedule = orderStore.deliverySchedule
</script>
