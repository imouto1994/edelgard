import React, { ReactElement } from "react";
import { HashRouter } from "react-router-dom";

import App from "../App";

import "./styles.css";

export default function Root(): ReactElement {
  return (
    <HashRouter basename="/">
      <App />
    </HashRouter>
  );
}
