import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";

import PageHome from "../PageHome";
import PagePartners from "../PagePartners";
import PageEndings from "../PageEndings";

import styles from "./styles.css";

export default function App(): ReactElement {
  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/:characterASlug/:characterBSlug">
          <PageEndings />
        </Route>
        <Route path="/:characterSlug">
          <PagePartners />
        </Route>
        <Route path="/">
          <PageHome />
        </Route>
      </Switch>
    </div>
  );
}
