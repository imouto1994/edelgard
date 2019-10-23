const browserslist = require("./browserslist");
const constants = require("./src/styles.js");

module.exports = () => ({
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: browserslist,
    }),
    require("postcss-simple-vars")({ variables: constants }),
    require("postcss-nesting")(),
  ],
});
