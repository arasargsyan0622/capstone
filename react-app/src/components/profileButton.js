import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from "../store/session"
import { faUserCircle  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
      <button className="fas-container" onClick={openMenu}>
        <i className="fas fa-user-circle" /><FontAwesomeIcon icon={faUserCircle}/>
      </button>

      {showMenu && (
        <>
          <div className="username">Hello, {user?.firstName}</div>
          <div className="email">Your Listings</div>
          <div>
            <button className="logout-btn" onClick={logout}>Log Out</button>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
