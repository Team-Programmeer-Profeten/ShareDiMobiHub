import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosError } from 'axios'
import axios from 'axios'

class ApiService {
  private apiClient: AxiosInstance

  constructor() {
    this.apiClient = axios.create({
      baseURL: '/'
    })
  }

  async post(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await this.apiClient.post(endpoint, data, config)
      return response
    } catch (error: unknown) {
      console.error('Error during POST request:', error)
      if ((error as AxiosError).response?.status == 401) {
        ;(error as AxiosError).message = 'Invalid Login Credentials'
      }
      throw error
    }
  }

  async get(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await this.apiClient.get(endpoint, config)
      return response
    } catch (error: unknown) {
      console.error('Error during GET request:', error)
      // if (error.response.status == 401) {
      //     error.message = "User Unauthorized";
      // }
      throw error
    }
  }

  async delete(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await this.apiClient.delete(endpoint, config)
      return response
    } catch (error: unknown) {
      console.error('Error during DELETE request:', error)
      throw error
    }
  }
}

export default new ApiService()
