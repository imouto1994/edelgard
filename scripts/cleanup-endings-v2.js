const fs = require("fs");
const path = require("path");

(function() {
  const content = fs.readFileSync(
    path.resolve(__dirname, "./endings_v2.txt"),
    "utf-8",
  );

  const lines = content
    // Remove all \r characters
    .replace(/\r/g, "")
    // Replace all escaped new line with spaces
    .replace(/\\n/g, " ")
    // Replace all double spaces with spaces
    .replace(/  /g, " ")
    // Remove all escape characters
    .replace(/\u001b/g, "")
    .replace(/\\x1b/g, "")
    .replace(/\\xc3\\xb3/g, "o")
    .replace(/\\xe2\\x80\\x94/g, "-")
    // Split into array of strings by \n characters
    .split("\n")
    // Trim all strings
    .map(line =>
      line
        .trim()
        .substr(2)
        .substr(0, line.length - 3),
    )
    // Filter out all empty strings
    .filter(line => line.length > 0);

  const map = {};
  for (let i = 0; i < lines.length; i++) {
    if (map[lines[i]] == null) {
      map[lines[i]] = true;
    } else {
      lines[i] = null;
    }
  }
  const cleanedContent = lines.filter(line => line != null).join("\n");

  fs.writeFileSync(
    path.resolve(__dirname, "./endings_v2_clean.txt"),
    cleanedContent,
    "utf-8",
  );
})();
