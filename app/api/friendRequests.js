const axios = require('axios')
const url = 'http://192.168.1.8:4000/api/v1'

export default class FriendRequestModel {
  // static all = async () => {
  //   try {
  //     const allUsers = await axios.get(`${url}/users`)
  //     return allUsers
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  static create = async (requestData) => {
    console.log('requestData', requestData)
    try {
      const newUser = await axios.post(`${url}/friendRequests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      return newUser
    } catch (error) {
      console.log(error)
    }
  }

  // static show = async (id) => {
  //   try {
  //     const result = await axios.get(`${url}/users/${id}`)
  //     return result.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}