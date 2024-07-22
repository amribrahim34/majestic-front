<!-- CartSummary.vue -->
<template>
  <div class="mt-6 border-t border-gray-200 pt-4">
    <div class="flex justify-between mb-2">
      <span>{{ t('cart.subtotal') }}:</span>
      <span>{{ t('cart.price', { price: subtotal.toFixed(2) }) }}</span>
    </div>
    <div class="flex justify-between mb-2">
      <span>{{ t('cart.shipping') }}:</span>
      <span>{{ t('cart.price', { price: shipping.toFixed(2) }) }}</span>
    </div>
    <div class="flex justify-between font-bold text-lg">
      <span>{{ t('cart.total') }}:</span>
      <span>{{ t('cart.price', { price: total.toFixed(2) }) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  subtotal: number
  shipping: number
  total: number
}>()
</script>
