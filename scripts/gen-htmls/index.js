const path = require("path");

require("@babel/register")({
  extensions: [".jsx", ".js", ".ts", ".tsx"],
});

require("css-modules-require-hook")({
  generateScopedName: "[hash:base64]",
  rootDir: path.resolve(__dirname, "../../src"),
});

require("./gen-htmls");
