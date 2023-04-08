import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListUser.scss'
import TableUser from './UserItems/TableUser'
export default function ListUser() {
  return (
    <div className='list'>
    <Sidebar />
    <div className="list-container">
      <Navbar />
      <TableUser />
    </div>
  </div>
  )
}
