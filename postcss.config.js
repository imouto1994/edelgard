const browserslist = require("./browserslist");
const constants = require("./src/styles.js");

module.exports = () => ({
  plugins: [
    require("postcss-normalize")({
      browsers: browserslist,
    }),
    require("autoprefixer")({
      overrideBrowserslist: browserslist,
    }),
    require("postcss-simple-vars")({ variables: constants }),
  ],
});
