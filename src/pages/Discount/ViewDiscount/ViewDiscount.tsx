import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getDiscount, getProductsOfDiscount } from '../../../api/Discount.api'
import Chart from '../../../components/chart/Chart'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import DiscountProduct from './DiscountProduct/DiscountProduct'
import './ViewDiscount.scss'
import { displayDateTime } from '../../../utils/TimeCustom'

export default function ViewDiscount() {
  const { uuid } = useParams()
  const discount = useQuery({
    queryKey: ['discount', uuid],
    queryFn: () => getDiscount(uuid as string),
    staleTime: 0,
    refetchOnMount: 'always',
  })

  const listProductsOfDiscount = useQuery({
    queryKey: ['discountproduct', uuid],
    queryFn: () => getProductsOfDiscount(uuid as string),
  })
  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <h1 className='title'>Discount Information</h1>
            <div className='item'>
              <div className='details'>
                <h1 className='item-title'>
                  {discount.data?.data.discountName}
                </h1>
                <div className='detail-item'>
                  <span className='item-key'>Id:</span>
                  <span className='item-value'>{discount.data?.data.id}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Start Date:</span>
                  <span className='item-value'>
                    {displayDateTime(
                      discount.data?.data.startDate ?? new Date()
                    )}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>End Date:</span>
                  <span className='item-value'>
                    {displayDateTime(discount.data?.data.endDate ?? new Date())}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Discount Type:</span>
                  <span className='item-value'>
                    {discount.data?.data.discountType}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Discount Value:</span>
                  <span className='item-value'>
                    {discount.data?.data.discountValue}
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
          <h1 className='title'>Products of this discount</h1>
          <DiscountProduct rows={listProductsOfDiscount.data?.data ?? []} />
        </div>
      </div>
    </div>
  )
}
