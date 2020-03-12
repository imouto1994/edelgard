const fs = require("fs");
const path = require("path");

const CHARACTERS = [
  "S0",
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
  "Gilbert",
  "Alois",
  "Catherine",
  "Shamir",
  "Cyril",
  "Rhea",
  "Sothis",
  "Anna",
  "Jeritza",
  "Yuri",
  "Balthus",
  "Constance",
  "Hapi",
];

(function() {
  const content = fs.readFileSync(
    path.resolve(__dirname, "./endings_v2_clean.txt"),
    "utf-8",
  );

  const lines = content.split("\n");
  const resultLines = [];
  for (const line of lines) {
    const characters = [];
    for (const character of CHARACTERS) {
      if (line.includes(character)) {
        if (character === "S0") {
          characters.push("Byleth");
        } else {
          characters.push(character);
        }
      }
    }
    characters.sort();
    if (characters.length > 2) {
      console.log(characters);
    }
    resultLines.push(characters.join(" x "));
    resultLines.push(line);
    resultLines.push("");
  }

  fs.writeFileSync(
    path.resolve(__dirname, "./endings_v2_parse.txt"),
    resultLines.join("\n"),
    "utf-8",
  );
})();
