import { combineReducers } from "redux";
import { compareAscByObject, compareDeskByObject } from "../utils/compare";
import _ from "lodash";

// constants
const GET_CUSTOMERS_REQUEST = "GET_CUSTOMERS_REQUEST";
const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";

const SET_ACTIVE_CUSTOMER = "SET_ACTIVE_CUSTOMER";

const SORT_CUSTOMERS = "SORT_CUSTOMERS";

const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

// const initialState = {
//   allIds: ["101"],
//   byIds: {
//     "101": {
//       id: 101,
//       firstName: "Sue",
//       lastName: "Corson",
//       email: "DWhalley@in.gov",
//       phone: "(612)211-6296",
//       address: {
//         streetAddress: "9792 Mattis Ct",
//         city: "Waukesha",
//         state: "WI",
//         zip: "22178"
//       },
//       description: "et lacus magna dolor..."
//     }
//   },
//   activeCustomer: null,
//   loading: false,
//   loaded: false,
//   sorted: {
//     by: "id",
//     direction: "asc"
//   }
// };

const initialState = {
  allIds: [],
  byIds: {},
  activeCustomer: null,
  loading: false,
  loaded: false,
  sorted: {
    by: "id",
    direction: "asc"
  },
  activePage: 1,
  itemsCountPerPage: 50
};

// Reducer
const allIds = (state = initialState.allIds, action = {}) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return state;
    case GET_CUSTOMERS_SUCCESS:
      return [...state, ...action.payload.clients.map(client => client.id)];
    case GET_CUSTOMERS_FAILURE:
      return state;
    default:
      return state;
  }
};

const byIds = (state = initialState.byIds, action = {}) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return state;
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        ...action.payload.clients.reduce(
          (ids, client) => ({
            ...ids,
            [client.id]: client
          }),
          {}
        )
      };
    case GET_CUSTOMERS_FAILURE:
      return state;
    default:
      return state;
  }
};

const activeCustomer = (state = initialState.activeCustomer, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_CUSTOMER:
      return action.payload.customer;
    default:
      return state;
  }
};

const loading = (state = initialState.loading, action = {}) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return true;
    case GET_CUSTOMERS_SUCCESS:
    case GET_CUSTOMERS_FAILURE:
      return false;
    default:
      return state;
  }
};

const loaded = (state = initialState.loaded, action = {}) => {
  switch (action.type) {
    case GET_CUSTOMERS_SUCCESS:
      return true;
    default:
      return state;
  }
};

const sorted = (state = initialState.sorted, action = {}) => {
  switch (action.type) {
    case SORT_CUSTOMERS:
      return {
        ...state,
        by: action.payload.by,
        direction: state.direction === "asc" ? "desc" : "asc"
      };
    default:
      return state;
  }
};

const activePage = (state = initialState.activePage, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return action.payload.pageNumber;
    default:
      return state;
  }
};

const itemsCountPerPage = (
  state = initialState.itemsCountPerPage,
  action = {}
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byIds,
  activeCustomer,
  loading,
  loaded,
  sorted,
  activePage,
  itemsCountPerPage
});

// Action Creators
export const fetchCustomers = () => {
  return dispatch => {
    dispatch({
      type: GET_CUSTOMERS_REQUEST
    });

    return fetch(
      "http://www.filltext.com/?rows=200&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
      .then(response => response.json())
      .then(clients => {
        dispatch({
          type: GET_CUSTOMERS_SUCCESS,
          payload: {
            clients: _.uniqBy(clients, "id")
          }
        });
      })
      .catch(reason =>
        dispatch({
          type: GET_CUSTOMERS_FAILURE,
          payload: { reason }
        })
      );
  };
};

export const setActiveCustomer = customer => ({
  type: SET_ACTIVE_CUSTOMER,
  payload: { customer }
});

export const sortCustomers = by => ({
  type: SORT_CUSTOMERS,
  payload: { by }
});

export const setActivePage = pageNumber => ({
  type: SET_ACTIVE_PAGE,
  payload: { pageNumber }
});

// selectors
export const getCustomersByIds = state =>
  state.allIds.map(id => state.byIds[id]);

export const sortBy = (data, by, direction) =>
  direction === "asc"
    ? [...data].sort(compareAscByObject(by))
    : [...data].sort(compareDeskByObject(by));
