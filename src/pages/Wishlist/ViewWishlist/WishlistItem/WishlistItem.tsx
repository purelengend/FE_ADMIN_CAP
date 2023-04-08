import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './WishlistItem.scss'
export default function WishlistItem({ rows }: any) {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>Product ID</TableCell>
            <TableCell className='table-cell'>Product Name</TableCell>
            <TableCell className='table-cell'>Product Photo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.productId}>
              <TableCell className='table-cell'>{row.productId}</TableCell>
              <TableCell className='table-cell'>{row.productName}</TableCell>
              <TableCell className='table-cell'>
                <img src={row.productPhotoUrl} alt='' className='image' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
