import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getAddressByUserId } from '../../../api/Address.api'
import { getOrderByUserId } from '../../../api/Order.api'
import { getUserById } from '../../../api/User.api'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import CustomSwiper from '../../../components/swiper/CustomSwiper'
import createOrderHistory from '../../../utils/CreateOrderHistory'
import OrderHistory from './OrderHistory/OrderHistory'
import './ViewUser.scss'

export default function ViewUser() {
  const { uuid } = useParams()
  const userAvatarUrl = useRef<string[]>([])

  const user = useQuery({
    queryKey: ['user', uuid],
    queryFn: () => getUserById(uuid as string),
    onSuccess: (user) => {
      userAvatarUrl.current.push(user.data.avatarUrl)
    },
    staleTime: 0,
  })

  const address = useQuery({
    queryKey: ['address', uuid],
    queryFn: () => getAddressByUserId(uuid as string),
    staleTime: 0,
  })

  const orderList = useQuery({
    queryKey: ['orderOfUser', uuid],
    queryFn: () => getOrderByUserId(uuid as string),
  })

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <h1 className='title'>User Information</h1>
            <div className='item'>
              <div className='details'>
                <h1 className='item-title'>User-{user.data?.data.id}</h1>
                <div className='detail-item'>
                  <span className='item-key'>Username:</span>
                  <span className='item-value'>{user.data?.data.username}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Role:</span>
                  <span className='item-value'>
                    {user.data?.data.role?.name}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Email:</span>

                  <span className='item-value'>{user.data?.data.email}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Phone:</span>
                  <span className='item-value'>
                    {user.data?.data.phoneNumber}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Gender:</span>
                  <span className='item-value'>{user.data?.data.gender}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Street Address:</span>
                  <span className='item-value'>
                    {address.data?.data.streetAddress}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>District:</span>
                  <span className='item-value'>
                    {address.data?.data.district}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>City:</span>
                  <span className='item-value'>{address.data?.data.city}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>State:</span>
                  <span className='item-value'>{address.data?.data.state}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Country:</span>
                  <span className='item-value'>
                    {address.data?.data.country}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Zip Code:</span>
                  <span className='item-value'>
                    {address.data?.data.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <CustomSwiper listUrl={userAvatarUrl.current} />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Order History of this user</h1>
          <OrderHistory rows={createOrderHistory(orderList.data?.data ?? [])} />
        </div>
      </div>
    </div>
  )
}
