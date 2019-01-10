import React from "react";
import store from "../../redux";
import { Provider } from "react-redux";
import Root from "../../containers/root";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
