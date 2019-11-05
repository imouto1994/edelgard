import { h, render } from "preact";

import Root from "./components/Root";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

render(<Root />, rootElement);
