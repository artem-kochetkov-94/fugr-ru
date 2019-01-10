import React from "react";
import Loader from "../Loader";
import Pagination from "react-js-pagination";

class Table extends React.Component {
  componentDidMount() {
    const { loaded, loading, fetchCustomers } = this.props;

    if (!loaded && !loading) fetchCustomers();
  }

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.props.setActivePage(pageNumber);
  };

  render() {
    const {
      customers,
      setActiveCustomer,
      loading,
      activeCustomer,
      sortCustomers,
      sorted,
      activePage,
      itemsCountPerPage
    } = this.props;

    if (loading) return <Loader />;

    const customersArray = customers.sorted ? customers.sorted : customers.all;

    const customersPerPage = customersArray.slice(
      (activePage - 1) * itemsCountPerPage,
      activePage * itemsCountPerPage
    );

    return (
      <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={customersArray.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        <table>
          <thead>
            <tr>
              <th onClick={() => sortCustomers("id")}>
                id <br />
                {sorted.by === "id" && sorted.direction}
              </th>
              <th onClick={() => sortCustomers("firstName")}>
                firstName
                <br />
                {sorted.by === "firstName" && sorted.direction}
              </th>
              <th onClick={() => sortCustomers("lastName")}>
                lastName
                <br />
                {sorted.by === "lastName" && sorted.direction}
              </th>
              <th onClick={() => sortCustomers("email")}>
                email
                <br />
                {sorted.by === "email" && sorted.direction}
              </th>
              <th onClick={() => sortCustomers("phone")}>
                phone
                <br />
                {sorted.by === "phone" && sorted.direction}
              </th>
            </tr>
          </thead>
          <tbody>
            {customersPerPage &&
              customersPerPage.map((customer, index) => (
                <tr
                  key={customer.id}
                  onClick={() => setActiveCustomer(customer)}
                  style={{
                    backgroundColor:
                      activeCustomer && activeCustomer.id === customer.id
                        ? "yellow"
                        : ""
                  }}
                >
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
