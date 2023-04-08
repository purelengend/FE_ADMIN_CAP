import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { deleteProduct, getProducts } from '../../../api/Product.api'
import ListSpinner from '../../../components/spinner/ListSpinner'
import { productColumns } from '../../../utils/TableData'
import './TableProduct.scss'
export default function TableProduct() {
  const { data, isLoading } = useQuery({
    staleTime: 0,
    queryKey: ['product'],
    queryFn: () => getProducts(),
    refetchOnMount: 'always',
  })

  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success(`Delete succeed!`)
      queryClient.invalidateQueries({ queryKey: ['product'], exact: true })
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
        deleteProductMutation.mutate(params.id)
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
              to={`/products/detail/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='view-button'>View</div>
            </Link>
            <Link
              to={`/products/edit/${params.id}`}
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
        Product List
        <Link to='/products/new' className='link'>
          Add new
        </Link>
      </div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          columns={productColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
