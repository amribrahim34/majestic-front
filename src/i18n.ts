import { createI18n, useI18n } from 'vue-i18n'
import { Ref } from 'vue'
import enHeader from '@/locales/en/header.json'
import arHeader from '@/locales/ar/header.json'

export type SupportedLocale = 'en' | 'ar'

export interface MessageSchema {
  header: {}
  [key: string]: any
}

const messages: Record<SupportedLocale, MessageSchema> = {
  ar: {
    ...arHeader
  },
  en: {
    ...enHeader
  }
}

// Create the i18n instance
export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ar']

// Export a simplified useTypedI18n function
export function useTypedI18n() {
  const { t, locale } = useI18n()

  const setLocale = (newLocale: SupportedLocale) => {
    i18n.global.locale.value = newLocale
  }

  return {
    t,
    locale: locale as Ref<SupportedLocale>,
    setLocale
  }
}
