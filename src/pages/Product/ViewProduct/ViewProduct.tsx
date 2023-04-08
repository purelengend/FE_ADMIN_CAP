import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCategories } from '../../../api/Category.api'
import { getProduct } from '../../../api/Product.api'
import { getProductVariantByProductId } from '../../../api/ProductVariant'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import CustomSwiper from '../../../components/swiper/CustomSwiper'
import ProductVariant from './ProductVariant/ProductVariant'
import './ViewProduct.scss'
import { displayDateTime } from '../../../utils/TimeCustom'

export default function ViewProduct() {
  const { uuid } = useParams()
  const listProductPhotoUrls = useRef<string[]>([])

  const product = useQuery({
    queryKey: ['product', uuid],
    queryFn: () => getProduct(uuid as string),
    onSuccess: (product) => {
      listProductPhotoUrls.current.push(product.data.coverPhoto)
      product.data.photoUrls.forEach((value, _) => {
        listProductPhotoUrls.current.push(value)
      })
    },
    staleTime: 0,
  })

  const productVariant = useQuery({
    queryKey: ['productVariant', uuid],
    queryFn: () => getProductVariantByProductId(uuid as string),
    staleTime: 0,
  })

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  })

  const productCategory = categories.data?.data.filter((category) => {
    const matchCategory = product.data?.data.categories.find(
      (prodCategory) => prodCategory === category.id
    )
    return matchCategory
  })

  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <h1 className='title'>Product Information</h1>
            <div className='item'>
              <div className='details'>
                <h1 className='item-title'>{product.data?.data.name}</h1>
                <div className='detail-item'>
                  <span className='item-key'>Id:</span>
                  <span className='item-value'>{product.data?.data.id}</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Category:</span>

                  <span className='item-value'>
                    {productCategory
                      ?.map((category) => category.name)
                      .join(', ')}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Description:</span>
                  <span className='item-value'>
                    {product.data?.data.description}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Base price:</span>
                  <span className='item-value'>
                    {product.data?.data.basePrice}$
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Selling price:</span>
                  <span className='item-value'>
                    {product.data?.data.sellingPrice}$
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Rating:</span>
                  <span className='item-value'>
                    {product.data?.data.rating}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Reviewed:</span>
                  <span className='item-value'>
                    {product.data?.data.reviewed}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Created at:</span>
                  <span className='item-value'>
                    {displayDateTime(
                      product.data?.data.createdAt ?? new Date()
                    )}
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Updated at:</span>
                  <span className='item-value'>
                    {displayDateTime(
                      product.data?.data.updatedAt ?? new Date()
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <CustomSwiper listUrl={listProductPhotoUrls.current} />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Variant of this product</h1>
          <ProductVariant rows={productVariant.data?.data ?? []} />
        </div>
      </div>
    </div>
  )
}
