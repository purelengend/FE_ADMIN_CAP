import './Featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export default function Featured() {
  return (
    <div className='featured'>
    <div className='top'>
      <h1 className='title'>Total Revenue</h1>
      <MoreVertIcon fontSize='small' />
    </div>
    <div className='bottom'>
      <div className='featured-chart'>
        <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
      </div>
      <p className='title'>Total sales made today</p>
      <p className='amount'>$696</p>
      <p className='desc'>
        Ching cheng hanji Can't touch me at all Kim Jong in the dungeon.
      </p>
      <div className='summary'>
        <div className='item'>
          <div className='item-title'>Target</div>
          <div className='item-result positive'>
            <KeyboardArrowUpOutlinedIcon fontSize='small' />
            <div className='result-amount'>$69.6</div>
          </div>
        </div>
        <div className='item'>
          <div className='item-title'>Last Week</div>
          <div className='item-result negative'>
            <KeyboardArrowDownIcon fontSize='small' />
            <div className='result-amount'>$69.6</div>
          </div>
        </div>
        <div className='item'>
          <div className='item-title'>Last Month</div>
          <div className='item-result positive'>
            <KeyboardArrowUpOutlinedIcon fontSize='small' />
            <div className='result-amount'>$69.6</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
