import * as fromCustomers from "./customers";

// constants
export const SET_FILTER_VALUE = "SET_FILTER_VALUE";

const initialState = {
  value: ""
};

// Reducer
export default (state = initialState.value, action = {}) => {
  switch (action.type) {
    case SET_FILTER_VALUE:
      return action.payload.value;
    case fromCustomers.GET_CUSTOMERS_REQUEST:
      return "";
    default:
      return state;
  }
};

// Action Creators
export const setFilterValue = value => ({
  type: SET_FILTER_VALUE,
  payload: {
    value
  }
});
