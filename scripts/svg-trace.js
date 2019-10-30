const fs = require("fs");
const path = require("path");
const potrace = require("potrace");

const params = {
  turdSize: 100,
  color: "#4e4936",
};

potrace.trace(
  path.resolve(__dirname, "../src/images/test.png"),
  params,
  function(err, svg) {
    if (err) throw err;
    fs.writeFileSync("./output.svg", svg);
  },
);
