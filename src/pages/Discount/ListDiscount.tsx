import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TableDiscount from './DiscountItems/TableDiscount'
import './ListDiscount.scss'
export default function ListDiscount() {
  return (
    <div className='list'>
    <Sidebar />
    <div className="list-container">
      <Navbar />
      <TableDiscount />
    </div>
  </div>
  )
}
