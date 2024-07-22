// src/types/i18n.ts

export interface HeaderTranslations {
  header: {
    search: {
      placeholder: string
    }
    nav: {
      books: string
      login: string
      signup: string
    }
    cart: {
      title: string
      empty: string
      loading: string
      total: string
      checkout: string
    }
    user: {
      account: string
      orders: string
      logout: string
    }
    languages: {
      en: string
      ar: string
    }
  }
}

export interface MessageSchema extends HeaderTranslations {
  // Add other translation interfaces here as you create them
  // For example:
  // auth: AuthTranslations;
  // products: ProductTranslations;
  // etc.
}
