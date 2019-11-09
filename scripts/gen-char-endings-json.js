const fs = require("fs");
const path = require("path");

const orderedCharacters = [
  "Byleth M",
  "Byleth F",
  "Edelgard",
  "Dimitri",
  "Claude",
  "Hubert",
  "Ferdinand",
  "Linhardt",
  "Caspar",
  "Bernadetta",
  "Dorothea",
  "Petra",
  "Dedue",
  "Felix",
  "Ashe",
  "Sylvain",
  "Mercedes",
  "Annette",
  "Ingrid",
  "Lorenz",
  "Raphael",
  "Ignatz",
  "Lysithea",
  "Marianne",
  "Hilda",
  "Leonie",
  "Seteth",
  "Flayn",
  "Hanneman",
  "Manuela",
  "Jeritza",
  "Gilbert",
  "Alois",
  "Catherine",
  "Shamir",
  "Cyril",
  "Rhea",
  "Sothis",
];
const characterIndexMap = orderedCharacters.reduce((map, character, index) => {
  map[character] = index;
  return map;
}, {});

function slugify(str) {
  return str
    .toLowerCase()
    .split(" ")
    .join("_");
}

(function() {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../json/routeEndings.json"),
    "utf-8",
  );
  const routeEndingsMap = JSON.parse(content);
  const completeRouteEndingsMap = JSON.parse(content);

  for (const characterA of Object.keys(routeEndingsMap)) {
    for (const characterB of Object.keys(routeEndingsMap[characterA])) {
      completeRouteEndingsMap[characterB][characterA] = Array.from({
        length: 4,
      }).map(() => null);
      for (const endingIndex in routeEndingsMap[characterA][characterB]) {
        const ending = routeEndingsMap[characterA][characterB][endingIndex];
        if (ending != null) {
          const [endingText, roleA, roleB] = ending;
          completeRouteEndingsMap[characterB][characterA][endingIndex] = [
            endingText,
            roleB,
            roleA,
          ];
        }
      }
    }
  }

  const charEndingsMap = {};
  const charPartnersList = Array.from({ length: orderedCharacters.length });
  const availableURLs = ["/"];
  for (const characterA of Object.keys(completeRouteEndingsMap)) {
    availableURLs.push(`/${slugify(characterA)}`);
    charEndingsMap[characterA] = {};
    charPartnersList[characterIndexMap[characterA]] = [];
    for (const characterB of Object.keys(completeRouteEndingsMap[characterA])) {
      availableURLs.push(`/${slugify(characterA)}/${slugify(characterB)}`);
      charPartnersList[characterIndexMap[characterA]].push(
        characterIndexMap[characterB],
      );
      const endings = completeRouteEndingsMap[characterA][characterB];
      const endingRoutesMap = endings.reduce((map, ending, index) => {
        if (ending != null) {
          const [endingStr, roleA, roleB] = ending;
          if (map[endingStr] == null) {
            map[endingStr] = [];
          }
          map[endingStr].push([index, roleA, roleB]);
        }

        return map;
      }, {});
      charEndingsMap[characterA][characterB] = Object.keys(endingRoutesMap).map(
        endingStr => {
          return {
            content: endingStr,
            routes: endingRoutesMap[endingStr],
          };
        },
      );
      if (characterA <= characterB) {
        fs.writeFileSync(
          path.resolve(
            __dirname,
            `../src/json/${characterA
              .split(" ")
              .join("_")
              .toLowerCase()}_${characterB
              .split(" ")
              .join("_")
              .toLowerCase()}.json`,
          ),
          JSON.stringify(charEndingsMap[characterA][characterB]),
          "utf-8",
        );
      }
    }
    charPartnersList[characterIndexMap[characterA]].sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
  }
  fs.writeFileSync(
    path.resolve(__dirname, `../json/availableURLs.json`),
    JSON.stringify(availableURLs, null, 2),
    "utf-8",
  );
  fs.writeFileSync(
    path.resolve(__dirname, `../json/charPartnersList.json`),
    JSON.stringify(charPartnersList, null, 2),
    "utf-8",
  );
  fs.writeFileSync(
    path.resolve(__dirname, `../json/charEndings.json`),
    JSON.stringify(charEndingsMap, null, 2),
    "utf-8",
  );
})();
