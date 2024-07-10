import { defineStore } from 'pinia'
import type { Book } from '@/types/Book'
import api from '@/api'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],
    currentBook: {} as Book,
    loading: false,
    error: ''
  }),

  actions: {
    async fetchAllBooks(filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const response = await api.get('/books', { params: filters })
        this.books = response.data.data
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

    async fetchBooksByCategory(categoryId: number) {
      this.loading = true
      try {
        const response = await api.get(`/books/category/${categoryId}`)
        this.books = response.data.data
      } catch (error) {
        this.error = 'Error fetching books by category'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async searchBooks(query: string, filters: Record<string, any> = {}) {
      this.loading = true
      try {
        const response = await api.get('/books/search', { params: { query, ...filters } })
        this.books = response.data.data
      } catch (error) {
        this.error = 'Error searching books'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchLatestBooks() {
      this.loading = true
      try {
        const response = await api.get('/books/latest')
        this.books = response.data
      } catch (error) {
        this.error = 'Error fetching latest books'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchBestSellers() {
      this.loading = true
      try {
        const response = await api.get('/books/best-sellers')
        this.books = response.data
      } catch (error) {
        this.error = 'Error fetching best sellers'
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getBookById: (state) => (id: number) => {
      return state.books.find((book) => book.id === id)
    },
    bookCount: (state) => {
      return state.books.length
    }
    // Add more getters as needed
  }
})
