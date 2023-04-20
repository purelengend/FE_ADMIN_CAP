import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import StoreIcon from '@mui/icons-material/Store'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import CategoryIcon from '@mui/icons-material/Category'
import AssessmentIcon from '@mui/icons-material/Assessment'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import PsychologyIcon from '@mui/icons-material/Psychology'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import DiscountIcon from '@mui/icons-material/Discount'
import InventoryIcon from '@mui/icons-material/Inventory'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RateReviewIcon from '@mui/icons-material/RateReview';

import { Link } from 'react-router-dom'
import './Sidebar.scss'
import useStoreInfo from '../../custom/useStoreInfo'
export default function Sidebar() {
  const {
    info: { username },
    clearInfo,
  } = useStoreInfo()

  const logOut = () => {
    clearInfo()
    window.location.reload()
  }
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Admin Page</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <DashboardIcon className='icon' />
            <span>Dash board</span>
          </li>
          <p className='title'>LIST</p>
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/products' style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className='icon' />
              <span>Products</span>
            </li>
          </Link>
          <Link to='/categories' style={{ textDecoration: 'none' }}>
            <li>
              <CategoryIcon className='icon' />
              <span>Categories</span>
            </li>
          </Link>
          <Link to='/inventory' style={{ textDecoration: 'none' }}>
            <li>
              <InventoryIcon className='icon' />
              <span>Size & Color</span>
            </li>
          </Link>
          <Link to='/wishlist' style={{ textDecoration: 'none' }}>
            <li>
              <ListAltIcon className='icon' />
              <span>Wishlist</span>
            </li>
          </Link>
          <Link to='/cart' style={{ textDecoration: 'none' }}>
            <li>
              <ShoppingCartIcon className='icon' />
              <span>Cart</span>
            </li>
          </Link>
          <Link to='/orders' style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className='icon' />
              <span>Orders</span>
            </li>
          </Link>

          <Link to='/reviews' style={{ textDecoration: 'none' }}>
            <li>
              <RateReviewIcon className='icon' />
              <span>Reviews</span>
            </li>
          </Link>

          <Link to='/discounts' style={{ textDecoration: 'none' }}>
            <li>
              <DiscountIcon className='icon' />
              <span>Discounts</span>
            </li>
          </Link>
          <p className='title'>USEFUL</p>
          <li>
            <AssessmentIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className='icon' />
            <span>Notifications</span>
          </li>
          <p className='title'>SERVICE</p>
          <li>
            <SettingsSystemDaydreamIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='icon' />
            <span>Settings</span>
          </li>
          <p className='title'>USER</p>
          <li>
            <AccountCircleIcon className='icon' />
            <span>Hello, {username}.</span>
          </li>
          <li onClick={logOut}>
            <LogoutIcon className='icon' />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

