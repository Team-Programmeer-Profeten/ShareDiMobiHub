import ApiService from '@/services/ApiService'
import type { AxiosResponse } from 'axios'

class AuthService {
  async login(username: string, password: string): Promise<AxiosResponse> {
    return ApiService.post('https://crowreporting.stoopstestdomein.online/api/login', { username, password })
  }
}

export default new AuthService()
