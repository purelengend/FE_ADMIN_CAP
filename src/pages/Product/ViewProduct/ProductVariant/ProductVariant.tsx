import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './ProductVariant.scss'
export default function ProductVariant({ rows }: any) {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell-title'>Color</TableCell>
            <TableCell className='table-cell-title'>Size</TableCell>
            <TableCell className='table-cell-title'>Quantity</TableCell>
            <TableCell className='table-cell-title'>Base Price</TableCell>
            <TableCell className='table-cell-title'>Selling Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell className='table-cell'>{row.color}</TableCell>
              <TableCell className='table-cell'>{row.size}</TableCell>
              <TableCell className='table-cell'>{row.quantity}</TableCell>
              <TableCell className='table-cell'>{row.basePrice}</TableCell>
              <TableCell className='table-cell'>{row.sellingPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
