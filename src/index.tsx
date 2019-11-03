import { h, render } from "preact";

import { StoreContext } from "./hooks/preact-redux";

import Root from "./components/Root";
import reduxStore from "./data";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

render(
  <StoreContext.Provider value={reduxStore}>
    <Root />
  </StoreContext.Provider>,
  rootElement,
);
