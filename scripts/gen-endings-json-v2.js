const fs = require("fs");
const path = require("path");

const ENDING_HEADER_MAX_LENGTH = 30;

const CHARACTERS = [
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

const BYLETH_MALE_PARTNERS = [
  "Edelgard",
  "Linhardt",
  "Bernadetta",
  "Dorothea",
  "Petra",
  "Mercedes",
  "Annette",
  "Ingrid",
  "Lysithea",
  "Marianne",
  "Hilda",
  "Leonie",
  "Flayn",
  "Manuela",
  "Gilbert",
  "Alois",
  "Catherine",
  "Shamir",
  "Rhea",
  "Sothis",
  "Jeritza",
  "Yuri",
  "Constance",
  "Hapi",
];

const BYLETH_FEMALE_PARTNERS = [
  "Edelgard",
  "Dimitri",
  "Claude",
  "Hubert",
  "Ferdinand",
  "Linhardt",
  "Caspar",
  "Dorothea",
  "Dedue",
  "Felix",
  "Ashe",
  "Sylvain",
  "Mercedes",
  "Lorenz",
  "Raphael",
  "Ignatz",
  "Seteth",
  "Hanneman",
  "Gilbert",
  "Alois",
  "Cyril",
  "Rhea",
  "Sothis",
  "Jeritza",
  "Yuri",
  "Balthus",
];

function addEntry(endingsMap, characterA, characterB, ending) {
  if (endingsMap[characterA] == null) {
    endingsMap[characterA] = {};
  }
  if (endingsMap[characterA][characterB] == null) {
    endingsMap[characterA][characterB] = [];
  }
  if (endingsMap[characterB] == null) {
    endingsMap[characterB] = {};
  }
  if (endingsMap[characterB][characterA] == null) {
    endingsMap[characterB][characterA] = [];
  }

  if (CHARACTERS.indexOf(characterA) < CHARACTERS.indexOf(characterB)) {
    endingsMap[characterA][characterB].push(ending);
  } else {
    endingsMap[characterB][characterA].push(ending);
  }
}

function addSelfEntry(endingsMap, character, ending) {
  if (endingsMap[character] == null) {
    endingsMap[character] = {};
  }
  if (endingsMap[character][character] == null) {
    endingsMap[character][character] = [];
  }
  endingsMap[character][character].push(ending);
}

function cleanUpMainCharEnding(ending, isMale) {
  if (isMale) {
    return ending
      .replace(/S0/g, "Byleth")
      .replace(/EK00/g, "")
      .replace(/EL00\w+EM00/g, "");
  } else {
    return ending
      .replace(/S0/g, "Byleth")
      .replace(/EK00\w+EL00/g, "")
      .replace(/EM00/g, "");
  }
}

(function() {
  const content = fs.readFileSync(
    path.resolve(__dirname, "./endings_v2_final.txt"),
    "utf-8",
  );

  const lines = content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const charactersMap = {};
  const endingsMap = {};
  let characterA;
  let characterB;

  for (const line of lines) {
    line.split("").forEach(char => {
      charactersMap[char] = 1;
    });
    if (line.length < ENDING_HEADER_MAX_LENGTH) {
      const characters = line.split(" x ");
      characterA = characters[0].trim();
      characterB = characters[1] != null ? characters[1].trim() : undefined;
    } else {
      // Self Ending
      if (characterB == null) {
        addSelfEntry(endingsMap, characterA, line);
      } else {
        // Main Character
        if (characterA === "Byleth M" || characterB === "Byleth M") {
          addEntry(
            endingsMap,
            "Byleth M",
            characterA === "Byleth M" ? characterB : characterA,
            cleanUpMainCharEnding(line, true),
          );
        } else if (characterA === "Byleth F" || characterB === "Byleth F") {
          addEntry(
            endingsMap,
            "Byleth F",
            characterA === "Byleth F" ? characterB : characterA,
            cleanUpMainCharEnding(line, false),
          );
        } else if (characterA === "Byleth" || characterB === "Byleth") {
          const otherCharacter =
            characterA === "Byleth" ? characterB : characterA;
          // Partner in the list of possible male partners
          if (BYLETH_MALE_PARTNERS.indexOf(otherCharacter) !== -1) {
            addEntry(
              endingsMap,
              "Byleth M",
              otherCharacter,
              cleanUpMainCharEnding(line, true),
            );
          }

          // Partner in the list of possible female partners
          if (BYLETH_FEMALE_PARTNERS.indexOf(otherCharacter) !== -1) {
            addEntry(
              endingsMap,
              "Byleth F",
              otherCharacter,
              cleanUpMainCharEnding(line, false),
            );
          }
        } else {
          addEntry(endingsMap, characterA, characterB, line);
        }
      }
    }
  }

  for (const characterA of Object.keys(endingsMap)) {
    for (const characterB of Object.keys(endingsMap[characterA])) {
      if (!endingsMap[characterA][characterB].length) {
        delete endingsMap[characterA][characterB];
      }
      // Print out the pairs that got different endings
      if ((endingsMap[characterA][characterB] || []).length >= 2) {
        console.log(characterA, characterB);
      }
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../json/endings_v2.json"),
    JSON.stringify(endingsMap, null, 2),
    "utf-8",
  );
})();
