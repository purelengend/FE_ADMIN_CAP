import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './CartItem.scss'
export default function CartItem({ rows }: any) {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell-title'>Product Name</TableCell>
            <TableCell className='table-cell-title'>Product Photo</TableCell>
            <TableCell className='table-cell-title'>Product Quantity</TableCell>
            <TableCell className='table-cell-title'>Product Color</TableCell>
            <TableCell className='table-cell-title'>Product Size</TableCell>
            <TableCell className='table-cell-title'>Selling Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.productId}>
              <TableCell className='table-cell'>{row.productName}</TableCell>
              <TableCell className='table-cell'>
                <img src={row.productPhotoUrl} alt='' className='image' />
              </TableCell>
              <TableCell className='table-cell'>{row.quantity}</TableCell>
              <TableCell className='table-cell'>{row.color}</TableCell>
              <TableCell className='table-cell'>{row.size}</TableCell>
              <TableCell className='table-cell'>{row.sellingPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
