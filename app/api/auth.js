//home
const url = `http://192.168.1.8:4000/api/v1`
//queensroom
// const url = 'http://192.168.1.203:4000/api/v1'
const axios = require('axios')

export default class AuthModel {
  static register = async (userData) => {
    try {
      const newUser = await axios.post(`${url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      return newUser
    } catch (error) {
      console.log(error)
    }
  }

  static async login(credentials) {
    const res = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    })
    return await res.json()
  }

  static async logout() {
    const res = await fetch(`${url}/auth/logout`, {
      method: 'DELETE',
      credentials: 'include',
    })
    return await res.json()
  }
}
