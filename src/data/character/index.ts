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
  0,
  0,
  1,
  5,
  5,
  5,
  5,
];

export const orderedCharacterTitles: (string[])[] = [
  [
    "Wings of the Hegemon",
    "Guardian of Order",
    "Ruler of Dawn",
    "Wandering Flame",
  ],
  [
    "Wings of the Hegemon",
    "Guardian of Order",
    "Ruler of Dawn",
    "Wandering Flame",
  ],
  ["Flame Emperor"], // Edelgard
  ["Savior King"], // Dimitri
  ["King of Unification"], // Claude
  ["Emperor's Confidant"], // Hubert
  ["Noblest of Nobles"], // Ferdinand
  ["Ragamuffin Sage", "Sleepy Crest Scholar"], // Linhardt
  ["Roaming Instigator", "Hotheaded General"], // Caspar
  ["Eternal Loner"], // Bernadetta
  ["Devoted Heart", "Mystical Songstress"], // Dorothea
  ["Seafaring Princess", "Queen of Brigid"], // Petra
  ["Taciturn Devotee"], // Dedue
  ["The Shield's Successor", "Meandering Sword"], // Felix
  ["Arrow of Justice"], // Ashe
  ["Sincerest of Knights"], // Sylvain
  ["Benevolent Soul"], // Mercedes
  ["Bloomed Overachiever"], // Annette
  ["Stalwart Knight"], // Ingrid
  ["Noble of the Red Rose"], // Lorenz
  ["Beast of Leicester"], // Raphael
  ["Worldly Artist"], // Ignatz
  ["Scholar of Misfortune"], // Lysithea
  ["Survivor of the Curse"], // Marianne
  ["Free Spirit"], // Hilda
  ["The Blade Breaker II"], // Leonie
  ["Ally of the Archbishop", "Heir of Purpose"], // Seteth
  ["Slumbering Princess"], // Flayn
  ["Father of Crestology"], // Hanneman
  ["Divine Songstress"], // Manuela
  ["Veteran Patriot"], // Gilbert
  ["Family Man", "Sun of the Knights"], // Alois
  ["Guardian of Zanado", "Free Knight"], // Catherine
  ["Distant Archer"], // Shamir
  ["Limitless Potential"], // Cyril
  [""], // Rhea
  [""], // Sothis
  ["Traveling Merchant"], // Anna
  ["Bloodstained Demon"], // Jeritza
  ["Underground Lord"], // Yuri
  ["King of Grappling"], // Balthus
  ["Sorcery Incarnate", "Scion of Nuvelle"], // Constance
  ["Freed Spirit", "Beast Master"], // Hapi
];

export const orderedFactions: Faction[] = [
  null,
  "empire",
  "holy",
  "alliance",
  "church",
  "abyss",
];

/* Utility */
export function isCharacter(char: string): char is Character {
  return (orderedCharacters as string[]).includes(char);
}
