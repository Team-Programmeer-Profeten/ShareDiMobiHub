import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/stores/authStore'

class AuthService {
  async login(username: string, password: string): Promise<User | null> {
    console.log('AuthService.login() called')
    if (username === 'anmar.noah@gmail.com') {
      if (password === '12345' || password === 'google') {
        return { gemeente: 'Rotterdam' }
      }
    }
    if (username === 'tyler.rijk@gmail.com') {
      if (password === '12345' || password === 'google') {
        return { gemeente: 'Rotterdam' }
      }
    }
    return null
  }
}

export default new AuthService()
