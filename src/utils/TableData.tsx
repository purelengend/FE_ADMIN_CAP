export const discountColumns = [
  // { field: 'id', headerName: 'ID', width: 230 },
  { field: 'discountName', headerName: 'Name', width: 100 },
  { field: 'startDate', headerName: 'Start Date', width: 230 },
  { field: 'endDate', headerName: 'End Date', width: 230 },
  { field: 'discountType', headerName: 'Type', width: 130 },
  { field: 'discountValue', headerName: 'Value', width: 100 },
]

export const productColumns = [
  { field: 'id', headerName: 'Product ID', width: 230 },
  { field: 'name', headerName: 'Name', width: 230 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  { field: 'reviewed', headerName: 'Reviews', width: 100 },
  {
    field: 'coverPhoto',
    headerName: 'Cover Photo',
    width: 130,
    renderCell: (params: any) => {
      return (
        <div className='cell-with-img'>
          <img className='cell-img' src={params.row.coverPhoto} alt='avatar' />
        </div>
      )
    },
  },
  { field: 'basePrice', headerName: 'Base Price', width: 100 },
  { field: 'sellingPrice', headerName: 'Selling Price', width: 100 },
]

export const inventoryColumns = [
  { field: 'name', headerName: 'Name', width: 230 },
]

export const categoryColumns = [
  { field: 'id', headerName: 'Category ID', width: 230 },
  { field: 'name', headerName: 'Name', width: 460 },
]

export const orderColumns = [
  { field: 'userId', headerName: 'User ID', width: 130 },
  { field: 'country', headerName: 'Country', width: 100 },
  { field: 'streetAddress', headerName: 'Street Address', width: 230 },
  { field: 'city', headerName: 'City', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'phone', headerName: 'Phone', width: 170 },
  { field: 'deliveryFee', headerName: 'Delivery Fee', width: 100 },
]

export const userColumns = [
  { field: 'username', headerName: 'Username', width: 170 },
  { field: 'email', headerName: 'Email', width: 230 },
  {
    field: 'avatarUrl',
    headerName: 'Avatar',
    width: 130,
    renderCell: (params: any) => {
      return (
        <div className='cell-with-img'>
          <img className='cell-img' src={params.row.avatarUrl} alt='avatar' />
        </div>
      )
    },
  },
  { field: 'phoneNumber', headerName: 'Phone', width: 170 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    width: 130,
    renderCell: (params: any) => params.row.role.name,
  },
]

export const wishlistColumns = [
  { field: 'userId', headerName: 'User ID', width: 270 },
]

export const cartColumns = [
  { field: 'userId', headerName: 'User ID', width: 270 },
  { field: 'createdAt', headerName: 'Created At', width: 230 },
  { field: 'updatedAt', headerName: 'Updated At', width: 230 },
]

export const reviewColumns = [
  { field: 'id', headerName: 'Review ID', width: 230 },
  { field: 'productId', headerName: 'Product ID', width: 230 },
  {
    field: 'username',
    headerName: 'Username',
    width: 130,
    renderCell: (params: any) => params.row.user.username,
  },
  {
    field: 'userPhoto',
    headerName: 'User Photo',
    width: 130,
    renderCell: (params: any) => {
      return (
        <div className='cell-with-img'>
          <img
            className='cell-img'
            src={params.row.user.avatarUrl}
            alt='avatar'
          />
        </div>
      )
    },
  },
  { field: 'comment', headerName: 'Comment', width: 230 },
  { field: 'rating', headerName: 'Rating', width: 100 },
]
