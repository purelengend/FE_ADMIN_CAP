import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListWishlist.scss'
import TableWishlist from './WishlistItems/TableWishlist'

export default function ListWishlist() {
  return (
    <div className='list'>
      <Sidebar />
      <div className='list-container'>
        <Navbar />
        <TableWishlist />
      </div>
    </div>
  )
}
