import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { getAllCategories } from '../../../api/Category.api'

import ListSpinner from '../../../components/spinner/ListSpinner'
import { categoryColumns } from '../../../utils/TableData'
import './TableCategory.scss'
export default function TableCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: () => getAllCategories(),
    refetchOnMount: 'always',
  })

  // const queryClient = useQueryClient()

  // const deleteColorMutation = useMutation({
  //   mutationFn: (id: number) => deleteColor(id),
  //   onSuccess: () => {
  //     toast.success(`Delete succeed!`)
  //     queryClient.invalidateQueries({ queryKey: ['color'], exact: true })
  //   },
  // })

  const handleDelete = (params: any) => {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'This discount and its children will be removed permanently',
    //   icon: 'error',
    //   color: '#6439ff',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#666',
    //   confirmButtonText: 'Yes',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     deleteDiscountMutation.mutate(params.id)
    //   }
    // })
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className='cell-action'>
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
        Category List
        <Link to='./categories/new' className='link'>
          Add Category
        </Link>
      </div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          columns={categoryColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
