import { h, render, hydrate } from "preact";
import { Router } from "wouter-preact";
import useLocation from "wouter-preact/use-location";

import Root from "./components/Root";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

if (process.env.NODE_ENV === "development") {
  render(
    <Router hook={useLocation}>
      <Root />
    </Router>,
    rootElement,
  );
} else {
  hydrate(
    <Router hook={useLocation}>
      <Root />
    </Router>,
    rootElement,
  );
}
