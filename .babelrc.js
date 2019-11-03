const browserslist = require("./browserslist");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: browserslist,
        },
        modules: false,
      },
    ],
    [
      "@babel/preset-react",
      { development: process.env.NODE_ENV === "development" },
    ],
    ["@babel/preset-typescript", { jsxPragma: "h" }],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      { pragma: "h", pragmaFrag: "Fragment" },
    ],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        useESModules: true,
      },
    ],
  ],
};
