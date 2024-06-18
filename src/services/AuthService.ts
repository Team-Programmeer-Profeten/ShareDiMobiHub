class AuthService {
  async login(username: string, password: string): Promise<boolean> {
    console.log('AuthService.login() called')
    if (username === 'anmar.noah@gmail.com') {
      if (password === '12345' || password === 'google') {
        return true
      }
    } else {
      return false
    }
  }
}

export default new AuthService()
