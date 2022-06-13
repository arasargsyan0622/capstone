
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';


const NavBar = () => {
  const session = useSelector(state => state.session);

  return session.user ? (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/listings' exact={true} activeClassName='active'>
            Listings
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/agents' exact={true} activeClassName='active'>
            Agents
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  ) : (
    <></>
  )
}

export default NavBar;
