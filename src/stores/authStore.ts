/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthService from '../services/AuthService'
import { defineStore } from 'pinia'

export interface User {
  gemeente: string | null
}

interface State {
  loggedIn: boolean
  user: User | null
}

interface Credentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    loggedIn: false,
    user: null
  }),
  actions: {
    async login({ email, password }: Credentials) {
      try {
        const loginResponse = await AuthService.login(email, password)
        if (loginResponse.status !== 200) {
          return false
        }
        const token = loginResponse.data.token
        const municipality = loginResponse.data.municipality
        this.setUser({ gemeente: municipality })
        window.localStorage.setItem('token', token)
        this.setLoggedIn(true)
        return loginResponse
      } catch (error) {
        console.error('Error during login:', error)
        throw error
      }
    },
    setLoggedIn(payload: boolean) {
      this.loggedIn = payload
      console.log('loggedIn state changed: ' + this.loggedIn)
    },
    setUser(payload: User) {
      this.user = payload
    }
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn
    },
    getUser(state) {
      return state.user
    },
    getToken() {
      return window.localStorage.getItem('token')
    }
  }
})
