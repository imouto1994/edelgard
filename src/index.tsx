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
  let requiredChunks: string[] | null = null;
  const dataElement = document.getElementById("requiredChunks");
  if (dataElement != null && dataElement.textContent != null) {
    requiredChunks = JSON.parse(dataElement.textContent);
  }

  new Promise(resolve => {
    if (requiredChunks == null) {
      return resolve();
    }

    window.loadedChunks = window.loadedChunks || [];
    const loadedChunks = window.loadedChunks;
    const originalPush = loadedChunks.push.bind(loadedChunks);

    function checkReadyState(): void {
      if (
        requiredChunks == null ||
        requiredChunks.every(chunk =>
          loadedChunks.some(([chunks]) => chunks.indexOf(chunk) > -1),
        )
      ) {
        resolve();
      }
    }

    loadedChunks.push = (
      ...args: [string[], { [key: string]: () => void }][]
    ): number => {
      const newLength = originalPush(...args);
      checkReadyState();
      return newLength;
    };

    checkReadyState();
  }).then(() => {
    if (rootElement.innerHTML.length > 0) {
      hydrate(
        <Router hook={useLocation}>
          <Root />
        </Router>,
        rootElement,
      );
    } else {
      render(
        <Router hook={useLocation}>
          <Root />
        </Router>,
        rootElement,
      );
    }
  });
}
