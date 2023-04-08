import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { deleteDiscount, getDiscounts } from '../../../api/Discount.api'
import ListSpinner from '../../../components/spinner/ListSpinner'
import { discountColumns } from '../../../utils/TableData'
import './TableDiscount.scss'
export default function TableDiscount() {
  const discounts = useQuery({
    queryKey: ['discount'],
    queryFn: () => getDiscounts(),
    refetchOnMount: 'always',
  })

  const queryClient = useQueryClient()

  const deleteDiscountMutation = useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      toast.success(`Delete succeed!`)
      queryClient.invalidateQueries({ queryKey: ['discount'], exact: true })
    },
  })
  const handleDelete = (params: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This discount and its children will be removed permanently',
      icon: 'error',
      color: '#6439ff',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#666',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDiscountMutation.mutate(params.id)
      }
    })
  }
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className='cell-action'>
            <Link
              to={`/discounts/detail/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='view-button'>View</div>
            </Link>
            <Link
              to={`/discounts/edit/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='edit-button'>Edit</div>
            </Link>
            <div className='delete-button' onClick={() => handleDelete(params)}>
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className='datatable'>
      <div className='datatable-title'>
        Discount List
        <Link to='/discounts/new' className='link'>
          Add new
        </Link>
      </div>
      {discounts.isLoading && <ListSpinner />}
      {!discounts.isLoading && (
        <DataGrid
          className='datagrid'
          rows={discounts.data?.data ?? []}
          columns={discountColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
