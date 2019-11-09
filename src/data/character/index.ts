import {
  Character,
  Faction,
  OrderedCharacterIndex,
  OrderedFactionIndex,
} from "./type";

/* Constants */

export const orderedCharacters: Character[] = [
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

export const characterOrderedIndexMap: {
  [c: string]: OrderedCharacterIndex;
} = orderedCharacters.reduce((map, character, index) => {
  map[character] = index;
  return map;
}, {});

export const orderedCharacterFactionIndices: OrderedFactionIndex[] = [
  0,
  0,
  1,
  2,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  0,
];

export const orderedFactions: Faction[] = [
  null,
  "empire",
  "holy",
  "alliance",
  "church",
];

/* Utility */
export function isCharacter(char: string): char is Character {
  return (orderedCharacters as string[]).includes(char);
}
