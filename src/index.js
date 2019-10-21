import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/Root";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

ReactDOM.render(<Root />, rootElement);

// $FlowFixMe
if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NextRoot = require("./components/Root").default;
    ReactDOM.render(<NextRoot />, rootElement);
  });
}
