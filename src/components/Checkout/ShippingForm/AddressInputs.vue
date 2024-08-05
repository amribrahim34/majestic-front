<template>
  <div class="space-y-4">
    <div class="flex gap-4">
      <div class="flex-1">
        <input
          type="text"
          id="address"
          v-model="form.address"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.address')"
        />
      </div>
      <div class="flex-1">
        <input
          type="text"
          id="special_mark"
          v-model="form.special_mark"
          required
          class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
          :placeholder="t('shipping.specialMark')"
        />
      </div>
    </div>
    <div>
      <button
        type="button"
        @click="$emit('get-geolocation')"
        class="mt-2 bg-gray-700 text-white py-1 px-2 rounded text-sm w-full"
      >
        {{ t('shipping.useMyLocation') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  form: {
    address: string
    special_mark: string
  }
}>()

defineEmits<{
  (e: 'get-geolocation'): void
}>()
</script>
