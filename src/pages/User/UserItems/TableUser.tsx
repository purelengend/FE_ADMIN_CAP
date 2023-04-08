import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { deleteUserById, getAllUser } from '../../../api/User.api'

import ListSpinner from '../../../components/spinner/ListSpinner'
import { userColumns } from '../../../utils/TableData'
import './TableUser.scss'
export default function TableUser() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getAllUser(),
    refetchOnMount: 'always',
  })

  const queryClient = useQueryClient()

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteUserById(id),
    onSuccess: () => {
      toast.success(`Delete succeed!`)
      queryClient.invalidateQueries({ queryKey: ['user'], exact: true })
    },
  })

  const handleDelete = (params: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user and its children will be removed permanently',
      icon: 'error',
      color: '#6439ff',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#666',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(params.id)
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
            {params.row.role.name !== 'ADMIN' && (
              <Link
                to={`/users/detail/${params.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className='view-button'>View</div>
              </Link>
            )}
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
      <div className='datatable-title'>User List</div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
