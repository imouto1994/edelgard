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
    ["@babel/preset-react"],
    ["@babel/preset-typescript", { jsxPragma: "h" }],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      { pragma: "h", pragmaFrag: "Fragment" },
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: false,
        useESModules: true,
      },
    ],
  ],
};
