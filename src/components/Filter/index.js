import React from "react";

class Filter extends React.Component {
  state = {
    value: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setFilterValue(this.state.value);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Фильтрация по всем полям</label>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <button type="submit">Найти</button>
      </form>
    );
  }
}

export default Filter;
