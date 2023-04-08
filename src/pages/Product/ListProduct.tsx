import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListProduct.scss'
import TableProduct from './ProductItems/TableProduct'
export default function ListProduct() {
  return (
    <div className='list'>
    <Sidebar />
    <div className="list-container">
      <Navbar />
      <TableProduct />
    </div>
  </div>
  )
}
