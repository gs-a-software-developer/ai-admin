// tableActions.js
import {
  FETCH_TABLE_DATA_REQUEST,
  FETCH_TABLE_DATA_SUCCESS,
  FETCH_TABLE_DATA_FAILURE,
  ADD_TABLE_ITEM,
  EDIT_TABLE_ITEM,
  DELETE_TABLE_ITEM,
} from "../types";

import * as data from "../../data";

export const fetchTableData = (dataKey) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TABLE_DATA_REQUEST });

    try {
      const tableData = data[dataKey];
      if (!tableData) throw new Error(`Data not found for key: ${dataKey}`);

      console.log("Fetched data:", tableData); // Log the fetched data

      dispatch({
        type: FETCH_TABLE_DATA_SUCCESS,
        payload: {
          data: tableData.data,
          headers: tableData.headers,
        },
      });
    } catch (error) {
      dispatch({
        type: FETCH_TABLE_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addTableItem = (item) => ({
  type: ADD_TABLE_ITEM,
  payload: item,
});

export const editTableItem = (item) => ({
  type: EDIT_TABLE_ITEM,
  payload: item,
});

export const deleteTableItem = (itemId) => ({
  type: DELETE_TABLE_ITEM,
  payload: itemId,
});
