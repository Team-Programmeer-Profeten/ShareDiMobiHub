/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthService from '../services/AuthService'
import { defineStore } from 'pinia'

interface State {
  loggedIn: boolean
  gemeente: string
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
    gemeente: ''
  }),
  actions: {
    async login({ email, password }: Credentials) {
      console.log('login() called')
      try {
        const loggedIn = await AuthService.login(email, password)
        if (loggedIn) this.setLoggedIn(loggedIn)
        return loggedIn
      } catch (error) {
        console.error('Error during login:', error)
        throw error
      }
    },
    setLoggedIn(payload: boolean) {
      this.loggedIn = payload
      console.log('loggedIn state changed: ' + this.loggedIn)
    },
    setGemeente(payload: string) {
      this.gemeente = payload
    }
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn
    },
    getGemeente(state) {
      return state.gemeente
    }
  }
})
