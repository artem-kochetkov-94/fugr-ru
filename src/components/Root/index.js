import React from "react";
import Table from "../Table";
import ActiveCustomer from "../ActiveCustomer";
import Filter from "../Filter";
import Pagination from "react-js-pagination";

class Root extends React.Component {
  handlePageChange = pageNumber => {
    this.props.setActivePage(pageNumber);
  };

  render() {
    const {
      customers,
      activeCustomer,
      fetchCustomersSmall,
      fetchCustomersLarge,
      setActiveCustomer,
      loading,
      loaded,
      sortCustomers,
      sorted,
      activePage,
      itemsCountPerPage,
      setActivePage,
      setFilterValue
    } = this.props;

    const customersArray = customers.sorted ? customers.sorted : customers.all;

    const customersPerPage = customersArray.slice(
      (activePage - 1) * itemsCountPerPage,
      activePage * itemsCountPerPage
    );

    return (
      <div>
        <div>
          <h1>Welcome</h1>
          <div>Выбрать набор данных</div>
          <button type="button" onClick={fetchCustomersLarge}>
            Большой
          </button>
          <button type="button" onClick={fetchCustomersSmall}>
            Маленький
          </button>
        </div>

        {!loading && loaded && (
          <React.Fragment>
            <Filter setFilterValue={setFilterValue} />
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={customers.all.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </React.Fragment>
        )}
        <Table
          customers={customersPerPage}
          fetchCustomersSmall={fetchCustomersSmall}
          fetchCustomersLarge={fetchCustomersLarge}
          setActiveCustomer={setActiveCustomer}
          loading={loading}
          loaded={loaded}
          activeCustomer={activeCustomer}
          sortCustomers={sortCustomers}
          sorted={sorted}
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          setActivePage={setActivePage}
        />
        {activeCustomer && (
          <ActiveCustomer
            customer={activeCustomer}
            setActiveCustomer={setActiveCustomer}
          />
        )}
      </div>
    );
  }
}

export default Root;
