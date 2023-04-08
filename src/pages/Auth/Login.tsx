import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { login, signUp } from '../../api/Auth.api'
import LoginImage from '../../assets/LoginImage.svg'
import { Admin } from '../../model/Admin'
import { Authentication } from '../../model/Authentication'
import { User } from '../../model/User'
import { errorNotify } from '../../utils/ToastPopup'
import './Login.scss'
const defaultRegisterInput: Omit<User, 'id'> = {
  username: '',
  password: '',
  email: '',
  phoneNumber: '0123456789',
  gender: 'MALE',
  avatarUrl:
    'https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png',
  streetAddress: '02 Wall st',
  district: 'Hai Chau',
  city: 'Da Nang',
  country: 'Vietnam',
}
export default function Login({
  storeInfo,
}: {
  storeInfo: (data: Authentication) => void
}) {
  const [toggle, setToggle] = useState(true)
  const { handleSubmit, register } = useForm<any>()

  const loginMutation = useMutation({
    mutationFn: (data: Admin): any => {
      return login(data)
    },
  })
  const registerMutation = useMutation({
    mutationFn: (data: User): any => {
      return signUp(data)
    },
  })
  const onSubmitLogin: SubmitHandler<Admin> = (data: Admin) => {
    loginMutation.mutate(data, {
      onSuccess: (data: any) => {
        const authentication: Authentication = data.data
        storeInfo(authentication)
      },
      onError: (error: any) => {
        errorNotify(error.response.data.message)
      },
    })
  }

  const onSubmitRegister: SubmitHandler<User> = (data: User) => {
    const registerData: User = {
      ...defaultRegisterInput,
      ...data,
      email: `${data.username}@gmail.com`,
    }

    registerMutation.mutate(registerData, {
      onSuccess: (data: any) => {
        window.location.reload()
      },
      onError: (error: any) => {
        errorNotify(error.response.data.message)
      },
    })
  }
  return (
    <div className='content'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img src={LoginImage} alt='Image' className='img-fluid' />
          </div>
          <div className='col-md-6 contents'>
            <div className='row justify-content-center'>
              {toggle ? (
                <div className='col-md-8 form-input'>
                  <div className='mb-4 title-login'>
                    <h1>Admin Login</h1>
                  </div>
                  <form onSubmit={handleSubmit(onSubmitLogin)}>
                    <div className='form-group first'>
                      <input
                        placeholder='Username'
                        type='text'
                        className='form-control'
                        id='username'
                        {...register('username')}
                      />
                    </div>
                    <div className='form-group last mb-4'>
                      <input
                        placeholder='Password'
                        type='password'
                        className='form-control'
                        id='password'
                        {...register('password')}
                      />
                    </div>
                    <span className='mb-4'>
                      Does not have an admin account yet?
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          setToggle((prev) => !prev)
                        }}
                      >
                        Register
                      </a>
                    </span>
                    <input
                      type='submit'
                      value='Log In'
                      className='btn btn-login'
                    />
                  </form>
                </div>
              ) : (
                <div className='col-md-8 form-input'>
                  <div className='mb-4'>
                    <h3>Sign Up</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmitRegister)}>
                    <div className='form-group first'>
                      <input
                        placeholder='Username'
                        type='text'
                        className='form-control'
                        id='username'
                        {...register('username')}
                      />
                    </div>
                    <div className='form-group last mb-4'>
                      <input
                        placeholder='Password'
                        type='password'
                        className='form-control'
                        id='password'
                        {...register('password')}
                      />
                    </div>
                    <span className='mb-4'>
                      Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                      consectetur adipisicing.
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          setToggle((prev) => !prev)
                        }}
                      >
                        Login
                      </a>
                    </span>
                    <input
                      type='submit'
                      value='Register'
                      className='btn btn-login'
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
