import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListCategory.scss'
import TableCategory from './CategoryItems/TableCategory'
export default function ListCategory() {
  return (
    <div className='list'>
    <Sidebar />
    <div className="list-container">
      <Navbar />
      <TableCategory />
    </div>
  </div>
  )
}
