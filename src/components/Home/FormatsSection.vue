<template>
  <section class="bg-white py-12 md:py-20" :dir="direction">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="format in bookFormats" :key="format.id" class="text-center">
          <img
            :src="format.image"
            :alt="t(`home.formatsSection.${format.id}.alt`)"
            class="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
          />
          <h3 class="text-lg font-semibold mb-2">
            {{ t(`home.formatsSection.${format.id}.title`) }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ t(`home.formatsSection.${format.id}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

const bookFormats = [
  { id: 'audio', image: new URL('@/assets/home/audioBook.jpeg', import.meta.url).href },
  { id: 'hardcopy', image: new URL('@/assets/home/hardcopyBook.jpeg', import.meta.url).href },
  { id: 'pdf', image: new URL('@/assets/home/pdf.png', import.meta.url).href }
]
</script>
