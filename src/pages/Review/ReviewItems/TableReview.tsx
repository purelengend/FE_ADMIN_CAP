import { DataGrid } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { deleteDiscount, getDiscounts } from '../../../api/Discount.api'
import ListSpinner from '../../../components/spinner/ListSpinner'
import { reviewColumns } from '../../../utils/TableData'
import './TableReview.scss'
import { deteleReviewById, getAllReview } from '../../../api/Review.api'
export default function TableReview() {
  const { data, isLoading } = useQuery({
    staleTime: 0,
    queryKey: ['reviews'],
    queryFn: () => getAllReview(),
    refetchOnMount: 'always',
  })

  const queryClient = useQueryClient()

  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => deteleReviewById(id),
    onSuccess: () => {
      toast.success(`Delete succeed!`)
      queryClient.invalidateQueries({ queryKey: ['reviews'], exact: true })
    },
  })
  // const handleDelete = (params: any) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This discount and its children will be removed permanently',
  //     icon: 'error',
  //     color: '#6439ff',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#666',
  //     confirmButtonText: 'Yes',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteReviewMutation.mutate(params.id)
  //     }
  //   })
  // }
  // const actionColumn = [
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     width: 200,
  //     renderCell: (params: any) => {
  //       return (
  //         <div className='cell-action'>
  //           <div className='delete-button' onClick={() => handleDelete(params)}>
  //             Delete
  //           </div>
  //         </div>
  //       )
  //     },
  //   },
  // ]
  return (
    <div className='datatable'>
      <div className='datatable-title'>Review List</div>
      {isLoading && <ListSpinner />}
      {!isLoading && (
        <DataGrid
          className='datagrid'
          rows={data?.data ?? []}
          columns={reviewColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  )
}
