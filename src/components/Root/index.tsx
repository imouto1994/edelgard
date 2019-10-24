import React, { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import App from "../App";

import "./styles.css";

export default function Root(): ReactElement {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
