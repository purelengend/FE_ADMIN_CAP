import { Authentication } from './../model/Authentication';

import { useState } from 'react';

export default function useStoreInfo() {
  const getInfo = (): Omit<Authentication, 'id' | 'refreshToken'> => {
    const tokenString = sessionStorage.getItem('token')
    const usernameString = sessionStorage.getItem('username')


    const userInfo: Omit<Authentication, 'id' | 'refreshToken'> = {
      accessToken: tokenString ? JSON.parse(tokenString) : '',
      username: usernameString ? JSON.parse(usernameString) : '',
    }
    return userInfo
  }
  const [info, setInfo] = useState<Omit<Authentication, 'id' | 'refreshToken'>>(getInfo())

  const storeInfo = (data: Omit<Authentication, 'id' | 'refreshToken'>) => {
    sessionStorage.setItem('token', JSON.stringify(data.accessToken))
    sessionStorage.setItem('username', JSON.stringify(data.username))

    setInfo(data)
  }

  const clearInfo = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
  }

  return {
    setInfo: storeInfo,
    info,
    clearInfo
  }
}

