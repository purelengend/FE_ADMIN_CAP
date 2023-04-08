import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListSizeColor.scss'
import TableSizeColor from './SizeColorItems/TableSizeColor'
export default function ListSizeColor() {
  return (
    <div className='list'>
    <Sidebar />
    <div className="list-container">
      <Navbar />
      <TableSizeColor />
    </div>
  </div>
  )
}
