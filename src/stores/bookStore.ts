import { defineStore } from 'pinia'
import type { Book } from '@/types/Book'
import api from '@/api'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],
    currentBook: {} as Book,
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 20,
    loading: false,
    error: ''
  }),

  actions: {
    async fetchAllBooks(page: number = 1, filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const response = await api.get('/books', { params: { page, ...filters } })
        this.books = response.data.data
        this.updatePaginationInfo(response.data)
      } catch (error) {
        this.error = 'Error fetching books'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchBookById(id: number) {
      this.loading = true
      try {
        const response = await api.get(`/books/${id}`)
        this.currentBook = response.data
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
        const response = await api.get('/books/latest', { params: { page } })
        this.books = response.data.data
        this.updatePaginationInfo(response.data)
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
        const response = await api.get('/books/best-sellers', { params: { page } })
        this.books = response.data.data
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
