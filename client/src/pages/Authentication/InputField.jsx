// InputField.js

import React from 'react';
import styles from './Authentication.module.css';

const InputField = ({ id, label, value, onChange, error, type }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={id}
        className={`${styles.formInput} ${error ? styles.error : ''}`}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default InputField;
