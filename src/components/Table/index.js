import React from "react";
import Loader from "../Loader";

class Table extends React.Component {
  render() {
    const {
      customers,
      setActiveCustomer,
      activeCustomer,
      sortCustomers,
      sorted,
      loading,
      loaded
    } = this.props;

    if (loading) return <Loader />;

    if (!loaded) return null;

    return (
      <div>
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
            {customers &&
              customers.map(customer => (
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
