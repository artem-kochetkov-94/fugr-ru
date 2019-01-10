import React from "react";

class ActiveCustomer extends React.Component {
  // state = {
  //   description: ""
  // };

  // componentWillMount() {
  //   const { customer } = this.props;
  //   if (this.state.description !== customer.description) {
  //     this.setState({
  //       description: customer.description
  //     });
  //   }
  // }

  // componentWillUpdate() {
  //   const { customer } = this.props;
  //   if (this.state.description !== customer.description) {
  //     this.setState({
  //       description: customer.description
  //     });
  //   }
  // }

  descriptionHandleChange = customer => e => {
    this.props.setActiveCustomer({
      ...customer,
      description: e.target.value
    });
  };

  render() {
    const customer = this.props.customer;
    console.log(customer);

    return (
      <div>
        <p>
          Выбран пользователь{" "}
          <b>
            {customer.firstName} {customer.lastName}
          </b>
        </p>
        <p>Описание:</p>
        <textarea
          value={customer.description}
          onChange={this.descriptionHandleChange(customer)}
        />
        <p>
          Адрес проживания: <b>{customer.address.streetAddress} </b>
        </p>
        <p>
          Город: <b>{customer.address.city}</b>
        </p>
        <p>
          Провинция/штат: <b>{customer.address.state}</b>
        </p>
        <p>
          Индекс: <b>{customer.address.zip}</b>
        </p>
      </div>
    );
  }
}

export default ActiveCustomer;
