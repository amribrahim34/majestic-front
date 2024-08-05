<template>
  <button
    type="submit"
    class="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors"
    :disabled="!isFormValid"
  >
    {{ t('shipping.confirmOrder') }} &gt;
  </button>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  isFormValid: boolean
}>()
</script>
