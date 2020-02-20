import cookie from 'js-cookie'

// save token in cookies, local storage
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    })
  }
}
//remove from cookies
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    })
  }
}
//get from cookie
export const getCookie = (key) => {
  if (window !== undefined) {
    return cookie.get(key)
  }
}
// will be useful when we need to make request to server with token
//---------------------------------------
//set in local storage
export const setLocalStorage = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
//remove from local storage
export const removeLocalStorage = (key) => {
  if (window !== undefined) {
    localStorage.removeItem(key)
  }
}
//---------------------------------------

//authenticate user by passing data to cookie and local storage during sign in
//pass setcookies setLocalStorage function here
export const authenticate = (response, func) => {
  console.log('AUTHENTICATE HELPER RESPONSE OBJ', response)
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  func()
}
//access user info from local storage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}
export const signout = next => {
  removeCookie('token')
  removeLocalStorage('user')
  next()
}

