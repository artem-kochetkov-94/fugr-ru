import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Root from "../components/Root";
import * as fromCustomers from "../ducks/customers";
import {
  fetchCustomers,
  setActiveCustomer,
  sortCustomers,
  setActivePage
} from "../ducks/customers";

const mapStateToProps = state => {
  const { customers } = state;
  const customersAll = fromCustomers.getCustomersByIds(customers);
  const customersSorted = fromCustomers.sortBy(
    customersAll,
    customers.sorted.by,
    customers.sorted.direction
  );

  return {
    customers: {
      all: customersAll,
      sorted: customersSorted
    },
    activeCustomer: customers.activeCustomer,
    loading: customers.loading,
    loaded: customers.loaded,
    sorted: customers.sorted,
    activePage: customers.activePage,
    itemsCountPerPage: customers.itemsCountPerPage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCustomers,
      setActiveCustomer,
      sortCustomers,
      setActivePage
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
