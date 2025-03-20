// Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthError } from '../../redux/actions/userActions';
import InputField from './InputField';
import styles from './Authentication.module.css';

const Register = ({ handleSwitch }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!studentNumber) newErrors.studentNumber = 'Please enter your student number';
    if (!studentEmail) newErrors.studentEmail = 'Please enter your student email';
    if (!password) newErrors.password = 'Please enter your password';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Mock user data (bypassing authentication)
    const userData = { studentNumber, studentEmail, password };
    dispatch(loginUser(userData));
  
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  
    // Redirect user
    navigate('/ai-admin/lecturers');
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Register</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <InputField
          id="studentNumber"
          type="text"
          label="Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          error={errors.studentNumber}
        />
        <InputField
          id="studentEmail"
          type="email"
          label="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          error={errors.studentEmail}
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </form>
      <div className={styles.footer}>
        <button className={styles.switchButton} onClick={handleSwitch}>
          Go to Login
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default Register;