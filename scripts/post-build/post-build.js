import { h } from "preact";
import { Router } from "wouter-preact";
import { injectManifest } from "workbox-build";
import fs from "fs";
import path from "path";
import pathToRegexp from "path-to-regexp";
import pug from "pug";
import render from "preact-render-to-string";
import staticLocationHook from "wouter-preact/static-location";
import terser from "terser";

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
const swContent = terser.minify(
  fs.readFileSync(path.resolve(__dirname, "./sw.js"), "utf-8"),
).code;
const gaContent = terser.minify(
  fs.readFileSync(path.resolve(__dirname, "./ga.js"), "utf-8"),
).code;

function ensureDirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

(async function() {
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
      jsRuntimeContent: runtimeJSContent,
      requiredChunks: JSON.stringify(["vendors~main", "main"]),
      gaContent,
      swContent,
      url: `https://fe3h.noobsaigon.com${url === "/" ? "" : url}`,
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
    ensureDirSync(
      path.resolve(
        __dirname,
        `../../build${url
          .split("/")
          .slice(0, -1)
          .join("/")}`,
      ),
    );
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../build${url === "/" ? "/index.html" : `${url}.html`}`,
      ),
      html,
      "utf-8",
    );
  }

  // Generate fallback layout for 404 / offline mode
  const locals = {
    appContent: "",
    cssInline: { content: mainCSSContent, url: mainCSSURL },
    jsBundleURLs: [vendorJSURL, mainJSURL],
    jsonURLs: [],
    jsRuntimeContent: runtimeJSContent,
    requiredChunks: JSON.stringify(["vendors~main", "main"]),
    gaContent,
    swContent,
    url: `https://fe3h.noobsaigon.com`,
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

  // Generate service worker files
  const { count, size, warnings } = await injectManifest({
    swSrc: path.resolve(__dirname, "../../src/sw.js"),
    swDest: path.resolve(__dirname, "../../build/sw.js"),
    globDirectory: path.resolve(__dirname, "../../build/"),
    globIgnores: ["**/runtime-*.js"],
    globPatterns: ["**/*.{js,json}", "layout.html"],
    dontCacheBustURLsMatching: /\.js$/,
  });

  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);

  const workboxSWJSPath = path.resolve(__dirname, `../../build/sw.js`);
  const workboxSWJSContent = fs.readFileSync(workboxSWJSPath, "utf-8");
  fs.writeFileSync(
    workboxSWJSPath,
    terser.minify(workboxSWJSContent).code,
    "utf-8",
  );
})();
