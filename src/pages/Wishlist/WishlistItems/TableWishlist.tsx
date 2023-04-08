import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getAllWishlist } from '../../../api/Wishlist.api'
import ListSpinner from '../../../components/spinner/ListSpinner'
import useStoreInfo from '../../../custom/useStoreInfo'
import { wishlistColumns } from '../../../utils/TableData'
import './TableWishlist.scss'
export default function TableWishlist() {
  const {
    info: { accessToken },
  } = useStoreInfo()
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getAllWishlist(accessToken),
    refetchOnMount: 'always',
  })

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className='cell-action'>
            <Link
              to={`/wishlist/detail/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='view-button'>View</div>
            </Link>
          </div>
        )
      },
    },
  ]
  return (
    <div className='datatable'>
      <div className='datatable-title'>Wishlist List</div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          getRowId={(row: any) => row.userId}
          columns={wishlistColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
