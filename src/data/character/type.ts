export type Character =
  | "Byleth M"
  | "Byleth F"
  | "Edelgard"
  | "Dimitri"
  | "Claude"
  | "Hubert"
  | "Ferdinand"
  | "Linhardt"
  | "Caspar"
  | "Bernadetta"
  | "Dorothea"
  | "Petra"
  | "Dedue"
  | "Felix"
  | "Ashe"
  | "Sylvain"
  | "Mercedes"
  | "Annette"
  | "Ingrid"
  | "Lorenz"
  | "Raphael"
  | "Ignatz"
  | "Lysithea"
  | "Marianne"
  | "Hilda"
  | "Leonie"
  | "Seteth"
  | "Flayn"
  | "Hanneman"
  | "Manuela"
  | "Jeritza"
  | "Gilbert"
  | "Alois"
  | "Catherine"
  | "Shamir"
  | "Cyril"
  | "Rhea"
  | "Sothis";

export enum OrderedCharacterIndex {
  "Byleth M" = 0,
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
}

export type Faction = "empire" | "holy" | "alliance" | "church" | null;

export enum OrderedFactionIndex {
  None = 0,
  Empire,
  Holy,
  Alliance,
  Church,
}
