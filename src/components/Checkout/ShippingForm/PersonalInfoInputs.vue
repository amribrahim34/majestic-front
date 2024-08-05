<template>
  <div class="space-y-4">
    <div>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
        :placeholder="t('shipping.name')"
        :aria-label="t('shipping.name')"
      />
    </div>
    <div>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
        :placeholder="t('shipping.email')"
        :aria-label="t('shipping.email')"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>
    <div>
      <input
        type="tel"
        id="phone"
        v-model="form.phone"
        required
        class="w-full border-b border-gray-500 p-2 appearance-none bg-transparent text-white"
        :placeholder="t('shipping.phone')"
        :aria-label="t('shipping.phone')"
      />
      <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  form: {
    name: string
    email: string
    phone: string
  }
  errors: {
    email: string
    phone: string
  }
}>()
</script>
