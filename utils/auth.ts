import Cookie from 'js-cookie'

const TOKEN_KEY = 'f-token'
const REFRESH_TOKEN_KEY = 'r-token'
const USER_INFO = 'userInfo'

const parse = JSON.parse
const stringify = JSON.stringify

const auth = {
  clear(key: string) {
    Cookie.remove(key, { domain: location.hostname })
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey)
  },

  clearRefreshToken(tokenKey = REFRESH_TOKEN_KEY) {
    return auth.clear(tokenKey)
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo)
  },

  get(key: string) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key) || '') || null
    }

    return null
  },

  getToken(tokenKey = TOKEN_KEY) {
    return Cookie.get(tokenKey)
  },

  getUserInfo(userInfo = USER_INFO) {
    let user = Cookie.get(userInfo)
    if(typeof user === 'string') user = JSON.parse(user)
    return user ? JSON.parse(user) : null
  },

  set(value: string, key: string, isLocalStorage: boolean) {
    if (!value) {
      return null
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value))
    }

    return null
  },

  setToken(value = '', options: any) {
    const now = new Date()
    now.setDate(now.getDate() + 60)
    Cookie.set(TOKEN_KEY, value, { domain: location.hostname, expires: now, ...options})
  },

  setRefreshToken(value = '', options: any) {
    const now = new Date()
    now.setDate(now.getDate() + 60)
    Cookie.set(REFRESH_TOKEN_KEY, value, { domain: location.hostname, expires: now, ...options })
  },

  setUserInfo(value = '') {
    const now = new Date()
    now.setDate(now.getDate() + 60)
    Cookie.set(USER_INFO, JSON.stringify(value), { domain: location.hostname, expires: now })
  },

  updateToken(value = '') {
    return value
  }
}

export default auth
