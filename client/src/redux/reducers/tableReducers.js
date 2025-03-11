// tableReducers.js
import {
  FETCH_TABLE_DATA_REQUEST,
  FETCH_TABLE_DATA_SUCCESS,
  FETCH_TABLE_DATA_FAILURE,
  ADD_TABLE_ITEM,
  EDIT_TABLE_ITEM,
  DELETE_TABLE_ITEM,
} from "../types";

const initialState = {
  loading: false,
  data: [],
  headers: [],
  error: "",
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TABLE_DATA_SUCCESS:
      console.log("Reducer payload:", action.payload); // Log the payload
      return {
        ...state,
        loading: false,
        data: action.payload.data || [],
        headers: action.payload.headers || [],
        error: "",
      };
    case FETCH_TABLE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        headers: [],
        error: action.payload,
      };
    case ADD_TABLE_ITEM:
      return {
        ...state,
        data: state.data ? [...state.data, action.payload] : [action.payload],
      };
    case EDIT_TABLE_ITEM:
      if (!state.headers.length) return state; // Ensure headers exist
      return {
        ...state,
        data: state.data.map((item) =>
          item[state.headers[0].field] ===
          action.payload[state.headers[0].field]
            ? action.payload
            : item
        ),
      };
    case DELETE_TABLE_ITEM:
      if (!state.headers.length) return state; // Ensure headers exist
      return {
        ...state,
        data: state.data.filter(
          (item) => item[state.headers[0].field] !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default tableReducer;
