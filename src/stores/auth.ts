import { defineStore } from 'pinia'
import api from '@/api'
import type { User } from '@/types/user'

export const useLoginStore = defineStore('login', {
  state: () => ({
    userData: {} as User
  }),
  actions: {
    async handleLogin(email: string, password: string) {
      await api
        .post('/login', { email, password })
        .then((response) => {
          this.userData = response.data
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    async handleSignup(user: Omit<User, 'id'>) {
      await api
        .post('/signup', user)
        .then((response) => {
          this.userData = response.data
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
})
