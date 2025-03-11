// userReducer.js
import { LOGIN_SUCCESS, LOGOUT, SET_AUTH_ERROR } from '../types';

const initialState = {
  user: null,
  isAuthenticated: false,
  authError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true, authError: null };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    case SET_AUTH_ERROR:
      return { ...state, authError: action.payload };
    default:
      return state;
  }
};

export default userReducer;