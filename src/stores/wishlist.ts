// src/stores/wishlist.ts
import { defineStore } from 'pinia'
import api from '@/api'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as number[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async toggleWishlistItem(bookId: number) {
      this.loading = true
      try {
        if (this.items.includes(bookId)) {
          await api.delete(`/wishlist/${bookId}`)
          this.items = this.items.filter((id) => id !== bookId)
        } else {
          await api.post('/wishlist', { book_id: bookId })
          this.items.push(bookId)
        }
      } catch (error) {
        this.error = 'Failed to update wishlist'
        console.error('Error updating wishlist:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchWishlist() {
      this.loading = true
      try {
        const response = await api.get('/wishlist')
        this.items = response.data.data
      } catch (error) {
        this.error = 'Failed to fetch wishlist'
        console.error('Error fetching wishlist:', error)
      } finally {
        this.loading = false
      }
    },

    isItemWishlisted(bookId: number): boolean {
      return this.items.includes(bookId)
    }
  }
})
