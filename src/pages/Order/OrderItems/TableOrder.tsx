import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { getAllOrder } from '../../../api/Order.api'

import ListSpinner from '../../../components/spinner/ListSpinner'
import { orderColumns } from '../../../utils/TableData'
import './TableOrder.scss'
export default function TableOrder() {
  const { data, isLoading } = useQuery({
    queryKey: ['order'],
    queryFn: () => getAllOrder(),
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
              to={`/orders/detail/${params.id}`}
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
      <div className='datatable-title'>Order List</div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          columns={orderColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
