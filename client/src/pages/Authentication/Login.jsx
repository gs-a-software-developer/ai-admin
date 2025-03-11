// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, setAuthError } from "../../redux/actions/userActions";
import InputField from "./InputField";
import styles from "./Authentication.module.css";

const Login = ({ handleSwitch }) => {
  const [studentIdentifier, setStudentIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!studentIdentifier)
      newErrors.studentIdentifier = "Please enter your student number/email";
    if (!password) newErrors.password = "Please enter your password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate authentication
      const userData = { studentIdentifier, password };
      dispatch(loginUser(userData));

      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      navigate("/ai-admin/files");
    } else {
      dispatch(setAuthError("Invalid credentials"));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Login</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <InputField
          id="studentIdentifier"
          type="text"
          label="Student Number/Email"
          value={studentIdentifier}
          onChange={(e) => setStudentIdentifier(e.target.value)}
          error={errors.studentIdentifier}
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
          Go to Register
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;