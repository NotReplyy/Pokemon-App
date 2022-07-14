import './NavBar.css'
import { NavLink } from 'react-router-dom'
import Search from '../Search/Search'



function Navbar() {

  return (
    <div>
      <nav className='nav-Class'>       
          <div className='div-List'>
          <ul className='ul-List'>
            <NavLink to='/home'>
              <li className='li-Home'>Home</li>
            </NavLink>
            <NavLink to='/create'>
            <li className='li-Create'>Create Pokemon</li>
            </NavLink>
          </ul>
          </div>
          <div className='div-Search'>
          <Search/>
          </div>
          
      </nav>
    </div>
  )
}

export default Navbar