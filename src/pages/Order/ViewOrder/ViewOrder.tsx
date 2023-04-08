import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../../api/Order.api'
import Chart from '../../../components/chart/Chart'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import OrderItem from './OrderItem/OrderItem'
import './ViewOrder.scss'

export default function ViewOrder() {
  const { uuid } = useParams()
  const order = useQuery({
    queryKey: ['order', uuid],
    queryFn: () => getOrderById(uuid as string),
    staleTime: 0,
    refetchOnMount: 'always',
  })

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <h1 className='title'>Order Information</h1>
            <div className='item'>
              <div className='details'>
                <h1 className='item-title'>Order-{order.data?.data.id}</h1>
                <div className='detail-item'>
                  <span className='item-key'>User ID:</span>
                  <span className='item-value'>{order.data?.data.userId}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>First Name:</span>
                  <span className='item-value'>
                    {order.data?.data.firstName}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Last Name:</span>
                  <span className='item-value'>
                    {order.data?.data.lastName}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Company Name:</span>
                  <span className='item-value'>
                    {order.data?.data.companyName}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Country:</span>
                  <span className='item-value'>{order.data?.data.country}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Street Address:</span>
                  <span className='item-value'>
                    {order.data?.data.streetAddress}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>City:</span>
                  <span className='item-value'>{order.data?.data.city}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>State:</span>
                  <span className='item-value'>{order.data?.data.state}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Zip Code:</span>
                  <span className='item-value'>{order.data?.data.zipCode}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Status:</span>
                  <span className='item-value'>{order.data?.data.status}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Phone:</span>
                  <span className='item-value'>{order.data?.data.phone}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Delivery Fee:</span>
                  <span className='item-value'>
                    {order.data?.data.deliveryFee}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Payment Method:</span>
                  <span className='item-value'>
                    {order.data?.data.paymentMethod}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Message:</span>
                  <span className='item-value'>{order.data?.data.message}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Created At:</span>
                  <span className='item-value'>
                    {order.data?.data.createdAt.toString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} title='User Spending (last 6 months)' />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Order Item List</h1>
          <OrderItem rows={order.data?.data.orderItemList ?? []} />
        </div>
      </div>
    </div>
  )
}
