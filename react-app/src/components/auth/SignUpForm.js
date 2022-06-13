import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginFormModal from "../modal/loginModal";
import "./signup.css"


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className="signupform-container" onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-content'>
        <div className='sign-up'>
          Sign Up
        </div>
        <h1 className='signup-header'>
          Make Yourself At Home
        </h1>
        <p>Signing up or logging in lest you create listings, leave reviews,
          access insights from local experts and more.
        </p>
        <div className='form-inputs'>
          <div className='names-container'>
            <div className='first-name-container'>
              <input
                type='text'
                name='first_name'
                className='first-name-input'
                placeholder='First Name'
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>
            <div className='last-name-container'>
              <input
                type='text'
                name='last_name'
                className='last-name-input'
                placeholder='Last Name'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
          </div>
          <div className='sign-up-email-container'>
            <input
              type='text'
              name='email'
              className='email-input'
              placeholder='Email address'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='password-container'>
            <input
              type='password'
              name='password'
              className='password-input'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='confirm-password-container'>
            <input
              type='password'
              name='repeat_password'
              className='confirm-password-input'
              placeholder='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
        </div>
        <button class="sign-up-button" type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
