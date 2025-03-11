// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './userReducer';
import tableReducer from './tableReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  table: tableReducer,
});

export default rootReducer;