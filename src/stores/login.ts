import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from './api' // Assuming you have an API utility for handling HTTP requests

export const useLoginStore = defineStore('login', {
  state: () => ({
    userData: null // Assuming you want to store user data
  }),
  actions: {
    async handleLogin(login, password) {
      try {
        this.userData = await api.post('/login', { login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
        // Assuming `showTooltip` is a globally available method to show messages
      } catch (error) {
        showTooltip(error.message) // Assuming the error has a message property
        // let the form component display the error
        return error
      }
    }
  }
})
