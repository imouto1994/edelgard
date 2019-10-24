import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Root from "./components/Root";
import reduxStore from "./data";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

ReactDOM.render(
  <Provider store={reduxStore}>
    <Root />
  </Provider>,
  rootElement,
);

// $FlowFixMe
if (module.hot) {
  module.hot.accept("./components/Root", () => {
    ReactDOM.render(
      <Provider store={reduxStore}>
        <Root />
      </Provider>,
      rootElement,
    );
  });
}
