import styles from "./styles.css";

import { h, VNode } from "preact";
import { useEffect } from "preact/hooks";
import { Switch, Route, useLocation } from "wouter-preact";

import PageHome from "../PageHome";
import PagePartners from "../PagePartners";
import PageEndings from "../PageEndings";

export default function App(): VNode {
  const [location] = useLocation();
  useEffect(() => {
    if (window.ga != null) {
      window.ga("set", "page", location);
      window.ga("send", "pageview");
    }
  }, [location]);

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
