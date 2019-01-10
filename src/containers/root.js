import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Root from "../components/Root";
import * as fromCustomers from "../ducks/customers";
import {
  fetchCustomersSmall,
  fetchCustomersLarge,
  setActiveCustomer,
  sortCustomers,
  setActivePage
} from "../ducks/customers";
import { setFilterValue } from "../ducks/filters";
import filterObjectByAll from "../utils/filterObjectByAll";

const mapStateToProps = state => {
  const { customers, filters } = state;
  const customersAll = fromCustomers.getCustomersByIds(customers);

  const customersAllFiltered = filters
    ? filterObjectByAll(customersAll, filters)
    : customersAll;

  const customersSorted = fromCustomers.sortBy(
    customersAllFiltered,
    customers.sorted.by,
    customers.sorted.direction
  );

  return {
    customers: {
      all: customersAll,
      sorted: customersSorted,
    },
    activeCustomer: customers.activeCustomer,
    loading: customers.loading,
    loaded: customers.loaded,
    sorted: customers.sorted,
    activePage: customers.activePage,
    itemsCountPerPage: customers.itemsCountPerPage,
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCustomersSmall,
      fetchCustomersLarge,
      setActiveCustomer,
      sortCustomers,
      setActivePage,
      setFilterValue
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
