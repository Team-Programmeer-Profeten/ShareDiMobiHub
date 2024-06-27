import ApiService from '@/services/ApiService'
import type { AxiosResponse } from 'axios'

class AuthService {
  async login(username: string, password: string): Promise<AxiosResponse> {
    return ApiService.post('http://145.38.194.144/login', { username, password })
  }
}

export default new AuthService()
