import { createI18n, useI18n } from 'vue-i18n'
import { Ref } from 'vue'

import en from '@/locales/en'
import ar from '@/locales/ar'

export type SupportedLocale = 'en' | 'ar'

export interface MessageSchema {
  [key: string]: any
}

const messages: Record<SupportedLocale, MessageSchema> = {
  ar,
  en
}

// Create the i18n instance
export const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
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
