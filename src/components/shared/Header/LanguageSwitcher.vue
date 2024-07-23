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
import api from '@/api'

const { locale } = useI18n()

const changeLanguage = (lang: SupportedLocale) => {
  locale.value = lang
}

// Function to set the language header
const setLanguageHeader = (lang: string) => {
  // If using axios
  api.defaults.headers.common['Accept-Language'] = lang

  // If using fetch, you might want to store this in a global state
  // or create a custom fetch wrapper
  // For example, using localStorage:
  localStorage.setItem('app-language', lang)
}

watch(locale, (newLocale) => {
  document.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
  // Set the language header whenever the locale changes
  setLanguageHeader(newLocale)
})
// Set the initial language header
setLanguageHeader(locale.value)
</script>
