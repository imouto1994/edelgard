const fs = require("fs");
const path = require("path");

(function() {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../json/routeEndings.json"),
    "utf-8",
  );
  const routeEndingsMap = JSON.parse(content);
  const completeRouteEndingsMap = JSON.parse(content);

  for (const characterA of Object.keys(routeEndingsMap)) {
    for (const characterB of Object.keys(routeEndingsMap[characterA])) {
      completeRouteEndingsMap[characterB][characterA] =
        routeEndingsMap[characterA][characterB];
    }
  }

  const charEndingsMap = {};
  for (const characterA of Object.keys(completeRouteEndingsMap)) {
    charEndingsMap[characterA] = {};
    for (const characterB of Object.keys(completeRouteEndingsMap[characterA])) {
      const endings = completeRouteEndingsMap[characterA][characterB];
      const endingRoutesMap = endings.reduce((map, ending, index) => {
        if (ending != null) {
          const endingStr =
            ending instanceof Array ? ending.join("\n") : ending;
          if (map[endingStr] == null) {
            map[endingStr] = [];
          }
          let route;
          if (index === 0) {
            route = "Crimson Flower";
          } else if (index === 1) {
            route = "Azure Moon";
          } else if (index === 2) {
            route = "Verdant Wind";
          } else {
            route = "Silver Snow";
          }

          map[endingStr].push(route);
        }

        return map;
      }, {});
      charEndingsMap[characterA][characterB] = Object.keys(endingRoutesMap).map(
        ending => {
          return {
            content: ending,
            routes: endingRoutesMap[ending],
          };
        },
      );
    }
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../src/json/${characterA
          .split(" ")
          .join("_")
          .toLowerCase()}.json`,
      ),
      JSON.stringify(charEndingsMap[characterA]),
      "utf-8",
    );
  }

  fs.writeFileSync(
    path.resolve(__dirname, `../json/charEndings.json`),
    JSON.stringify(charEndingsMap, null, 2),
    "utf-8",
  );
})();
