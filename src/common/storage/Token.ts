import jwtDecode from "jwt-decode"

class _Token {

  decode = (token: string) => jwtDecode(token)

  isTokenValid = () => {
    try {
      const token = this.getToken()
      return token && jwtDecode(token) !== undefined
    } catch (e) {
      return false
    }
  }

  getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token')
  }

  setToken(type: string, token: string) {
    if (type === 'local')
      return localStorage.setItem('token', token)
    return sessionStorage.setItem('token', token)
  }
}

export const Token = new _Token()