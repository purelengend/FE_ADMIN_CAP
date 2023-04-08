import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import {
  deleteColor,
  deleteSize,
  getAllColor,
  getAllSize,
} from '../../../api/ProductVariant'
import ListSpinner from '../../../components/spinner/ListSpinner'
import { inventoryColumns } from '../../../utils/TableData'
import './TableSizeColor.scss'
export default function TableSizeColor() {
  const size = useQuery({
    queryKey: ['size'],
    queryFn: () => getAllSize(),
    refetchOnMount: 'always',
  })

  const color = useQuery({
    queryKey: ['color'],
    queryFn: () => getAllColor(),
    refetchOnMount: 'always',
  })

  const queryClient = useQueryClient()

  const deleteColorMutation = useMutation({
    mutationFn: (id: number) => deleteColor(id),
    onSuccess: () => {
      toast.success(`Delete succeed!`)
      queryClient.invalidateQueries({ queryKey: ['color'], exact: true })
    },
  })

  const deleteSizeMutation = useMutation({
    mutationFn: (id: number) => deleteSize(id),
    onSuccess: () => {
      toast.success(`Delete succeed!`)
      queryClient.invalidateQueries({ queryKey: ['size'], exact: true })
    },
  })

  const handleDeleteSize = (params: any) => {
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
        deleteSizeMutation.mutate(params.id)
      }
    })
  }

  const handleDeleteColor = (params: any) => {
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
        deleteColorMutation.mutate(params.id)
      }
    })
    console.log(params.id)
  }
  const actionColumnSize = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className='cell-action'>
            <div
              className='delete-button'
              onClick={() => handleDeleteSize(params)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  const actionColumnColor = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className='cell-action'>
            <div
              className='delete-button'
              onClick={() => handleDeleteColor(params)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <div className='container'>
      <div className='datatable'>
        <div className='datatable-title'>
          Size List
          <Link to='./size/new' className='link'>
            Add Size
          </Link>
        </div>
        {size.isLoading && <ListSpinner />}
        {!size.isLoading && (
          <DataGrid
            className='datagrid'
            rows={size.data?.data ?? []}
            columns={inventoryColumns.concat(actionColumnSize)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        )}
      </div>
      <div className='datatable'>
        <div className='datatable-title'>
          Color List
          <Link to='./color/new' className='link'>
            Add Color
          </Link>
        </div>
        {color.isLoading && <ListSpinner />}
        {!color.isLoading && (
          <DataGrid
            className='datagrid'
            rows={color.data?.data ?? []}
            columns={inventoryColumns.concat(actionColumnColor)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        )}
      </div>
    </div>
  )
}
