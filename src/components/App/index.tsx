import styles from "./styles.css";

import { h, VNode } from "preact";
import { Switch, Route } from "wouter-preact";

import PageHome from "../PageHome";
import PagePartners from "../PagePartners";
import PageEndings from "../PageEndings";

export default function App(): VNode {
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
