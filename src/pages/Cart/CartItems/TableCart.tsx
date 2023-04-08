import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getAllCart } from '../../../api/Cart.api'
import ListSpinner from '../../../components/spinner/ListSpinner'
import { cartColumns } from '../../../utils/TableData'
import './TableCart.scss'
export default function TableCart() {
  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getAllCart(),
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
              to={`/cart/detail/${params.id}`}
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
      <div className='datatable-title'>Cart List</div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          getRowId={(row: any) => row.userId}
          columns={cartColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
