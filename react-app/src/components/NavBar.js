
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import "./NavBar.css"
import ProfileButton from './profileButton';


const NavBar = () => {
  const session = useSelector(state => state.session);

  return session.user ? (
    <nav className='nav'>
        <NavLink  to='/' exact={true} activeClassName='active'>
          <div className="home-icon"><img className="home-icon" src='https://images-platform.99static.com/KTGtDEOgPpLWzQqaF3MhUok7l6I=/500x500/top/smart/99designs-contests-attachments/43/43793/attachment_43793546'></img></div>
        </NavLink>
      <div className='nav-btns'>
        <NavLink className="listings" to='/listings' exact={true} activeClassName='active'>
          Listings
        </NavLink>
        <NavLink className="agents" to='/agents' exact={true} activeClassName='active'>
          Agents
        </NavLink>
        <ProfileButton user={session.user}/>
        {/* <LogoutButton /> */}
      </div>
  </nav>
  ) : (
    <></>
  )
}

export default NavBar;
