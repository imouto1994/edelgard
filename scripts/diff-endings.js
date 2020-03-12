const fs = require("fs");
const path = require("path");

(function diff() {
  const endingsMap = require("../json/endings_v2.json");
  const prevEndingsMap = require("../json/endings.json");

  for (const characterA of Object.keys(endingsMap)) {
    for (const characterB of Object.keys(endingsMap[characterA])) {
      const endings = endingsMap[characterA][characterB];
      const prevEndings =
        prevEndingsMap[characterA] == null
          ? []
          : prevEndingsMap[characterA][characterB] || [];
      endings.sort();
      prevEndings.sort();
      const endingsString = JSON.stringify(endings, null, 2);
      const prevEndingsString = JSON.stringify(prevEndings, null, 2)
        .replace(/ó/g, "o")
        .replace(/—/g, "-");
      if (endingsString !== prevEndingsString) {
        console.log(`${characterA} x ${characterB}`);
        console.log("PREV:");
        console.log(prevEndingsString);
        console.log("CURR:");
        console.log(endingsString);
        console.log("");
      }
    }
  }
})();
