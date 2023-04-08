import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListReview.scss'
import TableReview from './ReviewItems/TableReview'
export default function ListReview() {
  return (
    <div className='list'>
      <Sidebar />
      <div className='list-container'>
        <Navbar />
        <TableReview />
      </div>
    </div>
  )
}
