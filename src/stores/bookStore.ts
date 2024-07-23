import { defineStore } from 'pinia'
import type { Book } from '@/types/Book'
import api from '@/api'
import type { Category } from '@/types/Category'
import type { Publisher } from '@/types/Publisher'
import type { Author } from '@/types/Author'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import qs from 'qs'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],
    latestBooks: [] as Book[],
    bestSellerBooks: [] as Book[],
    currentBook: {} as Book,
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 20,
    loading: false,
    categories: [] as Category[],
    publishers: [] as Publisher[],
    authors: [] as Author[],
    formats: [],
    priceRange: { min: 0, max: 0 },
    yearRange: { min: 0, max: 0 },
    route: null as RouteLocationNormalizedLoaded | null,
    error: '',
    searchQuery: ''
  }),

  actions: {
    async fetchAllBooks(page: number = 1, filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const params = {
          page,
          ...filters,
          search: this.searchQuery
        }
        const response = await api.get('/books', {
          params,
          paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
        })
        this.books = response.data.data
        console.log('Filters sent to API:', params)
        this.updatePaginationInfo(response.data)
      } catch (error) {
        this.error = 'Error fetching books'
        console.error('Error fetching books:', error)
      } finally {
        this.loading = false
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    async fetchBookById(id: number | string) {
      this.loading = true
      try {
        const response = await api.get(`/books/${id}/show`)
        this.currentBook = response.data.data
      } catch (error) {
        this.error = 'Error fetching book details'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchBooksByCategory(categoryId: number, page: number = 1) {
      this.loading = true
      try {
        const response = await api.get(`/books/category/${categoryId}`, { params: { page } })
        this.books = response.data.data
        this.updatePaginationInfo(response.data)
      } catch (error) {
        this.error = 'Error fetching books by category'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async searchBooks(query: string, page: number = 1, filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const response = await api.get('/books/search', { params: { query, page, ...filters } })
        this.books = response.data.data
        this.updatePaginationInfo(response.data)
      } catch (error) {
        this.error = 'Error searching books'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchLatestBooks(page: number = 1) {
      this.loading = true
      try {
        const response = await api.get('/books/latest', { params: { page, limit: 6 } })
        this.latestBooks = response.data.data
        // this.updatePaginationInfo(response.data)
      } catch (error) {
        this.error = 'Error fetching latest books'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchBestSellers(page: number = 1) {
      this.loading = true
      try {
        const response = await api.get('/books/best-sellers', { params: { page, limit: 3 } })
        this.bestSellerBooks = response.data.data
        this.updatePaginationInfo(response.data)
      } catch (error) {
        this.error = 'Error fetching best sellers'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    updatePaginationInfo(data: any) {
      this.currentPage = data.meta.current_page
      this.lastPage = data.meta.last_page
      this.total = data.meta.total
      this.perPage = data.meta.per_page
    },

    setPage(page: number) {
      this.currentPage = page
      this.fetchAllBooks(page)
    },
    async fetchCategories() {
      try {
        const response = await api.get('/categories')
        this.categories = response.data
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async fetchPublishers() {
      try {
        const response = await api.get('/publishers')
        this.publishers = response.data
      } catch (error) {
        console.error('Error fetching publishers:', error)
      }
    },

    async fetchAuthors() {
      try {
        const response = await api.get('/authors')
        this.authors = response.data
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    },

    async fetchFormats() {
      try {
        const response = await api.get('/formats')
        this.formats = response.data
      } catch (error) {
        console.error('Error fetching formats:', error)
      }
    },

    async fetchPriceRange() {
      try {
        const response = await api.get('/price-range')
        this.priceRange = response.data
      } catch (error) {
        console.error('Error fetching price range:', error)
      }
    },

    async fetchYearRange() {
      try {
        const response = await api.get('/year-range')
        this.yearRange = response.data
      } catch (error) {
        console.error('Error fetching year range:', error)
      }
    },
    async fetchAllFilterData() {
      await Promise.all([
        this.fetchCategories(),
        this.fetchPublishers(),
        this.fetchAuthors(),
        this.fetchFormats(),
        this.fetchPriceRange(),
        this.fetchYearRange()
      ])
    },
    updateRouteQuery(query: Record<string, string>) {
      if (this.route) {
        this.route.query = { ...this.route.query, ...query }
      }
    }
  },

  getters: {
    getBookById: (state) => (id: number) => {
      return state.books.find((book) => book.id === id)
    },
    bookCount: (state) => {
      return state.books.length
    },
    hasNextPage: (state) => {
      return state.currentPage < state.lastPage
    },
    hasPreviousPage: (state) => {
      return state.currentPage > 1
    }
  }
})
