import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HomePage from "../homepage/homepage";
import Listings from "../listings/listing_display";
import LoginFormModal from "../modal/loginModal";
import SignupFormModal from "../modal/singupModal";
import "./splash.css";


function Splash() {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div className="splash-nav">
        {!user ? (
          <div>
            <LoginFormModal />
            <SignupFormModal />

            <div className="splash-page-container">
              <div className="splash-page-text-container">
                <h1>Find Your Dream Home</h1>
              </div>
            </div>
            <ul className="slide">
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
              <li>
                <span></span>
              </li>
            </ul>
          </div>
        ) : (
          <Listings />
        )}
      </div>
    </>
  );
}

export default Splash;
