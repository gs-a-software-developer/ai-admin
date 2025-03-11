// Authentication.jsx
import React, { useState, useEffect }from 'react';
import Login from './Login';
import Register from './Register';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import styles from './Authentication.module.css';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing user data in localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      dispatch(loginUser(userData));
    }
  }, [dispatch]);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.authContainer}>
      {isLogin ? (
        <Login handleSwitch={handleSwitch} />
      ) : (
        <Register handleSwitch={handleSwitch} />
      )}
    </div>
  );
};

export default Authentication;
