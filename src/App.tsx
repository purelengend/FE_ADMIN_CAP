import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ListDiscount from './pages/Discount/ListDiscount'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import {
  categoryInputs,
  colorAndSizeInputs,
  discountInputs,
  productInputs,
} from './utils/FormData'
import AddDiscount from './pages/Discount/AddDiscount/AddDiscount'
import ViewDiscount from './pages/Discount/ViewDiscount/ViewDiscount'
import EditDiscount from './pages/Discount/EditDiscount/EditDiscount'
import GlobalSpinner from './components/spinner/GlobalSpinner'
import ListProduct from './pages/Product/ListProduct'
import Login from './pages/Auth/Login'
import AddProduct from './pages/Product/AddProduct/AddProduct'
import EditProduct from './pages/Product/EditProduct/EditProduct'
import ViewProduct from './pages/Product/ViewProduct/ViewProduct'
import ListSizeColor from './pages/SizeColor/ListSizeColor'
import AddColor from './pages/SizeColor/AddColor/AddColor'
import ListCategory from './pages/Category/ListCategory'
import AddCategory from './pages/Category/AddCategory/AddCategory'
import ListOrder from './pages/Order/ListOrder'
import ViewOrder from './pages/Order/ViewOrder/ViewOrder'
import { useState } from 'react'
import { Authentication } from './model/Authentication'
import useStoreInfo from './custom/useStoreInfo'
import ListUser from './pages/User/ListUser'
import ViewUser from './pages/User/ViewUser/ViewUser'
import ListWishlist from './pages/Wishlist/ListWishlist'
import ViewWishlist from './pages/Wishlist/ViewWishlist/ViewWishlist'
import ListCart from './pages/Cart/ListCart'
import ViewCart from './pages/Cart/ViewCart/ViewCart'
import AddSize from './pages/SizeColor/AddSize/AddSize'
import ListReview from './pages/Review/ListReview'

function App() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const {
    info: { accessToken },
    setInfo,
  } = useStoreInfo()
  if (!accessToken) {
    return <Login storeInfo={setInfo} />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />

          <Route path='reviews'>
            <Route index element={<ListReview />} />
          </Route>

          <Route path='cart'>
            <Route index element={<ListCart />} />
            <Route path='detail/:uuid' element={<ViewCart />} />
          </Route>

          <Route path='wishlist'>
            <Route index element={<ListWishlist />} />
            <Route path='detail/:uuid' element={<ViewWishlist />} />
          </Route>

          <Route path='users'>
            <Route index element={<ListUser />} />
            <Route path='detail/:uuid' element={<ViewUser />} />
          </Route>
          <Route path='orders'>
            <Route index element={<ListOrder />} />
            <Route path='detail/:uuid' element={<ViewOrder />} />
          </Route>
          <Route path='categories'>
            <Route index element={<ListCategory />} />
            <Route
              path='categories/new'
              element={
                <AddCategory inputs={categoryInputs} title='Add New Category' />
              }
            />
          </Route>
          <Route path='inventory'>
            <Route index element={<ListSizeColor />} />
            <Route
              path='color/new'
              element={
                <AddColor inputs={colorAndSizeInputs} title='Add New Color' />
              }
            />
            <Route
              path='size/new'
              element={
                <AddSize inputs={colorAndSizeInputs} title='Add New Size' />
              }
            />
          </Route>
          <Route path='products'>
            <Route index element={<ListProduct />} />
            <Route path='detail/:uuid' element={<ViewProduct />} />
            <Route
              path='new'
              element={
                <AddProduct inputs={productInputs} title='Add New Product' />
              }
            />
            <Route
              path='edit/:uuid'
              element={
                <EditProduct inputs={productInputs} title='Edit Product' />
              }
            />
          </Route>
          <Route path='discounts'>
            <Route index element={<ListDiscount />} />
            <Route path='detail/:uuid' element={<ViewDiscount />} />
            <Route
              path='new'
              element={
                <AddDiscount inputs={discountInputs} title='Add New Discount' />
              }
            />
            <Route
              path='edit/:uuid'
              element={
                <EditDiscount inputs={discountInputs} title='Edit Discount' />
              }
            />
          </Route>
        </Route>
      </Routes>
      {isMutating + isFetching !== 0 && <GlobalSpinner />}
    </BrowserRouter>
  )
}

export default App
