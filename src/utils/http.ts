import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance
  /**
   *
   */

  constructor(host: string, accessToken: string = '') {
    this.instance = axios.create({
      baseURL: host,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + accessToken
      },
      data: JSON
    })

    this.instance.interceptors
  }
}


export default Http