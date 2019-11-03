import { h, render } from "preact";
import { Provider } from "react-redux";

import Root from "./components/Root";
import reduxStore from "./data";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

render(
  <Provider store={reduxStore}>
    <Root />
  </Provider>,
  rootElement,
);
