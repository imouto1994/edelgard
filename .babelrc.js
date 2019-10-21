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
  ],
  plugins: [
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
