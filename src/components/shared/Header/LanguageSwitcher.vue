<template>
  <div class="flex items-center space-x-2">
    <button
      v-for="lang in SUPPORTED_LOCALES"
      :key="lang"
      @click="changeLanguage(lang)"
      class="px-2 py-1 rounded"
      :class="{ 'bg-gray-200': locale === lang }"
    >
      {{ $t(`header.languages.${lang}`) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

const { locale } = useI18n()

const changeLanguage = (lang: SupportedLocale) => {
  locale.value = lang
}

watch(locale, (newLocale) => {
  document.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
})
</script>
