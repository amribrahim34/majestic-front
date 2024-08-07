<!-- OrderConfirmation.vue -->
<template>
  <n-card>
    <div class="flex flex-col items-center space-y-4">
      <n-icon size="48" color="#18a058">
        <CheckmarkCircle />
      </n-icon>
      <h2 class="text-xl font-semibold">Order Confirmation Received</h2>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NIcon } from 'naive-ui'
import { CheckmarkCircle } from '@vicons/ionicons5'
</script>
