import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./login.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [hashed_password, setHashed_password] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, hashed_password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setHashed_password(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const demoUser = (e) => {
    e.preventDefault();
    const email = "demo@aa.io"
    const hashed_password = "password"
    return dispatch(login(email, hashed_password))
  }

  return (
    <form className="form-container" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-content'>
        <div className='login'>Log In</div>
        <h1 className='login-header'>Welcome back!</h1>
        <p>Enter your email and password to continue.</p>
        <div className="login-email-container">
          <input
            name='email'
            type='text'
            className='email-input'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div className="password-container">
          <input
            name='password'
            type='password'
            className='password-input'
            placeholder='Password'
            value={hashed_password}
            onChange={updatePassword}
            required
          />
        </div>
          <button className="log-in-button" type='submit'>Login</button>
          <button onClick={demoUser} className="demo-btn" type="submit">Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
