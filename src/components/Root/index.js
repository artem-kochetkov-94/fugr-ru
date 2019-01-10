import React from "react";
import Table from "../Table";
import ActiveCustomer from "../ActiveCustomer";

// class Root extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Welcome</h1>
//         <Table
//           customers={this.props.customers}
//           fetchCustomers={this.props.fetchCustomers}
//         />
//         <ActiveCustomer customer={this.props.activeCustomer} />
//       </div>
//     );
//   }
// }

const Root = ({
  customers,
  activeCustomer,
  fetchCustomers,
  setActiveCustomer,
  loading,
  loaded,
  sortCustomers,
  sorted,
  activePage,
  itemsCountPerPage,
  setActivePage
}) => (
  <div>
    <h1>Welcome</h1>
    {activeCustomer && (
      <ActiveCustomer
        customer={activeCustomer}
        setActiveCustomer={setActiveCustomer}
      />
    )}
    <Table
      customers={customers}
      fetchCustomers={fetchCustomers}
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
  </div>
);

export default Root;
