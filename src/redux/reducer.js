import { combineReducers } from "redux";
import customers from "../ducks/customers";
import filters from "../ducks/filters";

export default combineReducers({
  customers,
  filters
});
