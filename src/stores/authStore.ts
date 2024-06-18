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

interface RegistrationDetails {
  firstName: string
  lastName: string
  username: string
  password: string
  dob: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    loggedIn: false,
    user: null
  }),
  actions: {
    async login({ email, password }: Credentials) {
      console.log('login() called')
      try {
        const user = await AuthService.login(email, password)
        if (user) this.setUser(user)
        this.loggedIn = !!user
        return this.loggedIn
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
    }
  }
})
