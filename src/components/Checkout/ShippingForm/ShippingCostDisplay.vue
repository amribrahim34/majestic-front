<template>
  <div>
    <input
      type="text"
      id="shippingCost"
      :value="shippingCost"
      class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
      :placeholder="t('shipping.shippingCost')"
      :aria-label="t('shipping.shippingCost')"
      disabled
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  shippingCost: number
}>()
</script>
