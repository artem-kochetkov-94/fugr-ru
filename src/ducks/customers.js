import { combineReducers } from "redux";
import { compareAscByObject, compareDeskByObject } from "../utils/compare";
import _ from "lodash";
import * as fromFilters from "./filters";
import callApi from "../utils/call-api";

// constants
export const GET_CUSTOMERS_REQUEST = "GET_CUSTOMERS_REQUEST";
export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";

export const SET_ACTIVE_CUSTOMER = "SET_ACTIVE_CUSTOMER";

export const SORT_CUSTOMERS = "SORT_CUSTOMERS";

export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

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
  itemsCountPerPage: 50,
  isFetching: false
};

// Reducer
const allIds = (state = initialState.allIds, action = {}) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return state;
    case GET_CUSTOMERS_SUCCESS:
      return [...action.payload.clients.map(client => client.id)];
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
    case GET_CUSTOMERS_REQUEST:
      return null;
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
    case GET_CUSTOMERS_REQUEST:
    case GET_CUSTOMERS_FAILURE:
      return false;
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
    case fromFilters.SET_FILTER_VALUE:
    case GET_CUSTOMERS_REQUEST:
      return 1;
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

const isFetching = (state = initialState.isFetching, action = {}) => {
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

export default combineReducers({
  allIds,
  byIds,
  activeCustomer,
  loading,
  loaded,
  sorted,
  activePage,
  itemsCountPerPage,
  isFetching
});

// Action Creators
export const fetchCustomersSmall = () => {
  return (dispatch, getState) => {
    const { isFetching } = getState().customers;
    if (isFetching) {
      return Promise.resolve();
    }
    dispatch({
      type: GET_CUSTOMERS_REQUEST
    });

    return callApi(
      "?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
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

export const fetchCustomersLarge = () => {
  return (dispatch, getState) => {
    const { isFetching } = getState().customers;
    if (isFetching) {
      return Promise.resolve();
    }
    dispatch({
      type: GET_CUSTOMERS_REQUEST
    });

    return callApi(
      "?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
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
