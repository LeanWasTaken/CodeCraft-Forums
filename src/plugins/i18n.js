import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import lv from '@/locales/lv.json'

export default createI18n({
  legacy: false,
  locale: 'lv',
  fallbackLocale: 'en',
  messages: {
    en,
    lv
  }
})