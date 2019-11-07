import { h } from "preact";
import { Router } from "wouter-preact";
import path from "path";
import fs from "fs";
import pathToRegexp from "path-to-regexp";
import pug from "pug";
import render from "preact-render-to-string";
import staticLocationHook from "wouter-preact/static-location";

import Root from "../../src/components/Root";

const manifestJSON = require("../../build/manifest.json");
const availableURLs = require("../../json/availableURLs.json");

// CSS
const mainCSSURL = manifestJSON["main.css"];
const mainCSSFilename = mainCSSURL.split("/").pop();
const mainCSSContent = fs.readFileSync(
  path.resolve(__dirname, `../../build/${mainCSSFilename}`),
  "utf-8",
);

// JS
const runtimeJSURL = manifestJSON["runtime.js"];
const runtimeJSFilename = runtimeJSURL.split("/").pop();
const runtimeJSContent = fs.readFileSync(
  path.resolve(__dirname, `../../build/${runtimeJSFilename}`),
  "utf-8",
);
const vendorJSURL = manifestJSON["vendors~main.js"];
const mainJSURL = manifestJSON["main.js"];

function ensureDirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

(function() {
  const endingPathRegex = pathToRegexp("/:characterA/:characterB");
  // Generate all static pages
  for (const url of availableURLs) {
    const appContent = render(
      <Router hook={staticLocationHook(url)}>
        <Root />
      </Router>,
    );

    const locals = {
      appContent,
      cssInline: { content: mainCSSContent, url: mainCSSURL },
      jsBundleURLs: [vendorJSURL, mainJSURL],
      jsonURLs: [],
      url: `https://fe3h.noobsaigon.com${url === "/" ? "" : url}`,
      jsRuntimeContent: runtimeJSContent,
      requiredChunks: JSON.stringify(["vendors~main", "main"]),
    };

    const endingPathMatch = endingPathRegex.exec(url);
    if (endingPathMatch != null) {
      const characterASlug = endingPathMatch[1];
      const characterBSlug = endingPathMatch[2];
      locals.jsonURLs = [
        characterASlug <= characterBSlug
          ? `/${characterASlug}_${characterBSlug}.json`
          : `/${characterBSlug}_${characterASlug}.json`,
      ];
    }

    const html = pug.renderFile(
      path.resolve(__dirname, "../../src/templates/index.pug"),
      locals,
    );
    ensureDirSync(path.resolve(__dirname, `../../build${url}`));
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../build${url === "/" ? "" : url}/index.html`,
      ),
      html,
      "utf-8",
    );
  }

  // Generate fallback layout
  const locals = {
    appContent: "",
    cssInline: { content: mainCSSContent, url: mainCSSURL },
    jsBundleURLs: [vendorJSURL, mainJSURL],
    jsonURLs: [],
    url: `https://fe3h.noobsaigon.com`,
    jsRuntimeContent: runtimeJSContent,
    requiredChunks: JSON.stringify(["vendors~main", "main"]),
  };
  const html = pug.renderFile(
    path.resolve(__dirname, "../../src/templates/index.pug"),
    locals,
  );
  fs.writeFileSync(
    path.resolve(__dirname, "../../build/layout.html"),
    html,
    "utf-8",
  );
})();
