import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './DiscountProduct.scss'
export default function DiscountProduct({ rows }: any) {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>Product ID</TableCell>
            {/* <TableCell className='table-cell'>Product</TableCell>
            <TableCell className='table-cell'>Customer</TableCell>
            <TableCell className='table-cell'>Date</TableCell>
            <TableCell className='table-cell'>Amount</TableCell>
            <TableCell className='table-cell'>Payment Method</TableCell>
            <TableCell className='table-cell'>Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: string) => (
            <TableRow key={row}>
              <TableCell className='table-cell'>{row}</TableCell>
              {/* <TableCell className='table-cell'>Product</TableCell>
              <TableCell className='table-cell'>customer</TableCell>
              <TableCell className='table-cell'>date</TableCell>
              <TableCell className='table-cell'>amount</TableCell>
              <TableCell className='table-cell'>{row.method}</TableCell>
              <TableCell className='table-cell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
