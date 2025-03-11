// userActions.js
import { LOGIN_SUCCESS, LOGOUT, SET_AUTH_ERROR } from '../types';

export const loginUser = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const logoutUser = () => {
  // Clear user data from localStorage on logout
  localStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
};

export const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  payload: error,
});
