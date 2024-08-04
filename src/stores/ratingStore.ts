import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api' // Assuming you have an api instance set up

interface RatingState {
  userRating: number | null
  loading: boolean
  error: string | null
}

export const useRatingStore = defineStore('rating', () => {
  const state = ref<RatingState>({
    userRating: null,
    loading: false,
    error: null
  })

  const rateBook = async (bookId: number, rating: number) => {
    state.value.loading = true
    state.value.error = null
    try {
      await api.post(`/books/${bookId}/rate`, { rating })
      state.value.userRating = rating
    } catch (error) {
      state.value.error = 'Failed to rate book'
      console.error('Error rating book:', error)
    } finally {
      state.value.loading = false
    }
  }

  const getUserRating = async (bookId: number) => {
    state.value.loading = true
    state.value.error = null
    try {
      const response = await api.get(`/books/${bookId}/rating`)
      state.value.userRating = response.data.rating
    } catch (error) {
      state.value.error = 'Failed to get user rating'
      console.error('Error getting user rating:', error)
    } finally {
      state.value.loading = false
    }
  }

  const updateRating = async (bookId: number, rating: number) => {
    state.value.loading = true
    state.value.error = null
    try {
      await api.put(`/books/${bookId}/rating`, { rating })
      state.value.userRating = rating
    } catch (error) {
      state.value.error = 'Failed to update rating'
      console.error('Error updating rating:', error)
    } finally {
      state.value.loading = false
    }
  }

  const deleteRating = async (bookId: number) => {
    state.value.loading = true
    state.value.error = null
    try {
      await api.delete(`/books/${bookId}/rating`)
      state.value.userRating = null
    } catch (error) {
      state.value.error = 'Failed to delete rating'
      console.error('Error deleting rating:', error)
    } finally {
      state.value.loading = false
    }
  }

  return {
    state,
    rateBook,
    getUserRating,
    updateRating,
    deleteRating
  }
})
