import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuth, signout } from '../../pages/auth/helper'

const Nav = ({ history }) => {
  // if the path from params is equal to isActive(path), change color 
  const isActive = path => {
    if (history.location.pathname === path) {
      return { color: 'black' }
    } else {
      return { color: 'blue' }
    }
  }
  const loginPath = () => {
    if (isAuth()) {
      const result = isAuth().role === 'admin' ? "/admin" : "/private"
      return result
    }
  }
  return (
    <ul className="nav nav-tabs">
      <li className='nav-item'><Link to='/' style={isActive('/')}>Home</Link></li>
      {isAuth() ?
        (<>
          <li className='nav-item'>
            <Link style={isActive('/no')} onClick={() => {
              signout(() => { history.push('/') })
            }}> Sign out</Link></li>

          <li className='nav-item'>
            <Link to={`${loginPath()}`} style={{ cursor: 'pointer' }} style={isActive(`${loginPath}`)}>
              {isAuth().name}</Link>
          </li>
        </>
        ) :
        <>
          <li className='nav-item'><Link to='/signin' style={isActive('/signin')}>Sign in</Link></li>
          <li className='nav-item'><Link to='/signup' style={isActive('/signup')}>Sign up</Link></li>
        </>
      }
    </ul>
  )
}
export default withRouter(Nav)