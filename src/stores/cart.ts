// src/stores/cart.ts
import { defineStore } from 'pinia'
import api from '@/api' // Assuming you have an api service set up
import type { Cart } from '@/types/Cart'

export const useCartStore = defineStore('cartStore', {
  state: (): Cart => ({
    items: [],
    total: 0,
    loading: false,
    error: null
  }),

  getters: {
    cartItemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.total
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/cart')
        this.items = response.data.data.items
        this.total = response.data.total
      } catch (error) {
        this.error = 'Failed to fetch cart'
        console.error('Error fetching cart:', error)
      } finally {
        this.loading = false
      }
    },

    async addItem(bookId: number, quantity: number) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/cart/add', { book_id: bookId, quantity })
        this.items = response.data.data.items
        this.total = response.data.data.total
      } catch (error) {
        this.error = 'Failed to add item to cart'
        console.error('Error adding item to cart:', error)
      } finally {
        this.loading = false
      }
    },

    async updateItemQuantity(bookId: number, quantity: number) {
      this.loading = true
      this.error = null
      try {
        const response = await api.put('/cart/update', { book_id: bookId, quantity })
        this.items = response.data.data.items
        this.total = response.data.data.total
      } catch (error) {
        this.error = 'Failed to update item quantity'
        console.error('Error updating item quantity:', error)
      } finally {
        this.loading = false
      }
    },

    async removeItem(bookId: number) {
      this.loading = true
      this.error = null
      try {
        const response = await api.delete('/cart/remove', { data: { book_id: bookId } })
        this.items = response.data.data.items
        this.total = response.data.data.total
      } catch (error) {
        this.error = 'Failed to remove item from cart'
        console.error('Error removing item from cart:', error)
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        await api.post('/cart/clear')
        this.items = []
        this.total = 0
      } catch (error) {
        this.error = 'Failed to clear cart'
        console.error('Error clearing cart:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
