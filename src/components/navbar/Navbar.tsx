import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ListIcon from '@mui/icons-material/List'
import './Navbar.scss'
import { ToastContainer } from 'react-toastify'

export default function Navbar() {
  return (
    <div className='navbar'>
    <div className='wrapper'>
      <div className='search'>
        {/* <input type='text' placeholder='Search...' />
        <SearchIcon /> */}
      </div>
      <div className='items'>
        <div className='item'>
          <LanguageIcon className='icon' />
          English
        </div>
        <div className='item'>
          <DarkModeOutlinedIcon
            className='icon'
          />
        </div>
        <div className='item'>
          <FullscreenExitIcon className='icon' />
        </div>
        <div className='item'>
          <NotificationsNoneIcon className='icon' />
          <div className='counter'>2</div>
        </div>
        <div className='item'>
          <ChatBubbleOutlineIcon className='icon' />
          <div className='counter'>1</div>
        </div>
        <div className='item'>
          <ListIcon className='icon' />
        </div>
        <div className='item'>
          <img
            src='https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png'
            alt=''
            className='avatar'
          />
        </div>
      </div>
    </div>
  </div>
  )
}
