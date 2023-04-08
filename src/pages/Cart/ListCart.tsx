import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TableCart from './CartItems/TableCart'
import './ListCart.scss'

export default function ListCart() {
  return (
    <div className='list'>
      <Sidebar />
      <div className='list-container'>
        <Navbar />
        <TableCart />
      </div>
    </div>
  )
}
