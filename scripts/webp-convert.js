const CWebp = require("cwebp").CWebp;
const path = require("path");
const fs = require("fs");
const glob = require("glob");

function getFiles(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, files) => (err ? reject(err) : resolve(files)));
  });
}

(async function() {
  const files = await getFiles("src/images/*.png");
  Promise.all(
    files.map(async file => {
      const encoder = new CWebp(path.resolve(__dirname, `../${file}`));
      // Set encoder quality image
      encoder.quality(80);
      // Set maximum compression level
      encoder.compression(6);
      try {
        await encoder.write(
          path.resolve(__dirname, `../${file.replace(".png", ".webp")}`),
        );
      } catch (err) {
        console.log(err);
      }
    }),
  );
})();
