import { StorageService } from "../storage/storage-service"

const apiUrl = 'https://demo-api-work-test.herokuapp.com'
class Api {

  async post(endpoint: string, data: any, isFormUrlencoded = false) {
    const token = await StorageService.getItem('token')

    let formBody: any = []
    if (isFormUrlencoded) {
      for (let property in data) {
        let encodedKey = encodeURIComponent(property)
        let encodedValue = encodeURIComponent(data[property])
        formBody.push(encodedKey + "=" + encodedValue)
      }
      formBody = formBody.join("&")
    }

        const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      body: isFormUrlencoded ? formBody : JSON.stringify(data),
      headers: new Headers({
        'authorization': token || '',
        'Content-Type': isFormUrlencoded ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json'
      })
    })

    const body = await response.json()

    if (response.ok) {
      return body
    } else {
      throw Error(body.message)
    }
  }

  async patch(endpoint: string, data: any, isFormUrlencoded = false) {
    const token = await StorageService.getItem('token')

    let formBody: any = []
    if (isFormUrlencoded) {
      for (let property in data) {
        let encodedKey = encodeURIComponent(property)
        let encodedValue = encodeURIComponent(data[property])
        formBody.push(encodedKey + "=" + encodedValue)
      }
      formBody = formBody.join("&")
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'PATCH',
      body: isFormUrlencoded ? formBody : JSON.stringify(data),
      headers: new Headers({
        'authorization': token || '',
        'Content-Type': isFormUrlencoded ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json'
      })
    })

    const body = await response.json()

    if (response.ok) {
      return body
    } else {
      throw Error(body.message)
    }
  }

  async get(endpoint: string) {
    const token = await StorageService.getItem('token')

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: new Headers({
        'authorization': token || ''
      })
    })

    const body = await response.json()

    if (response.ok) {
      return body
    } else {
      throw Error(body.message)
    }
  }

  async delete(endpoint: string) {
    const token = await StorageService.getItem('token')

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'DELETE',
      headers: new Headers({
        'authorization': token || ''
      })
    })

    const body = await response.json()

    if (response.ok) {
      return body
    } else {
      throw Error(body.message)
    }
  }
}

export default new Api()