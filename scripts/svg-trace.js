const fs = require("fs");
const path = require("path");
const potrace = require("potrace");

const params = {
  turdSize: 100,
  color: "#4e4936",
};

function trace() {
  return new Promise((resolve, reject) => {
    potrace.trace(
      path.resolve(__dirname, "../src/images/test.png"),
      params,
      function(err, svg) {
        if (err) {
          reject(err);
        } else {
          resolve(svg);
        }
      },
    );
  });
}

(async function() {
  try {
    const svg = await trace();
    fs.writeFileSync("./output.svg", svg);
  } catch (err) {
    console.error(err);
  }
})();
