import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListOrder.scss'
import TableOrder from './OrderItems/TableOrder'
export default function ListOrder() {
  return (
    <div className='list'>
    <Sidebar />
    <div className="list-container">
      <Navbar />
      <TableOrder />
    </div>
  </div>
  )
}
