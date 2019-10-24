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
  | "Gilbert"
  | "Alois"
  | "Catherine"
  | "Shamir"
  | "Cyril"
  | "Rhea";

export enum Faction {
  None = -1,
  BlackEagle,
  BlueLion,
  GoldenDeer,
  ChurchOfSeiros,
}

export const characterFactions: { [char in Character]?: Faction } = {
  "Byleth M": -1,
  "Byleth F": -1,
  Edelgard: 0,
  Dimitri: 1,
  Claude: 2,
  Hubert: 0,
  Ferdinand: 0,
  Linhardt: 0,
  Caspar: 0,
  Bernadetta: 0,
  Dorothea: 0,
  Petra: 0,
  Dedue: 1,
  Felix: 1,
  Ashe: 1,
  Sylvain: 1,
  Mercedes: 1,
  Annette: 1,
  Ingrid: 1,
  Lorenz: 2,
  Raphael: 2,
  Ignatz: 2,
  Lysithea: 2,
  Marianne: 2,
  Hilda: 2,
  Leonie: 2,
  Seteth: 3,
  Flayn: 3,
  Hanneman: 3,
  Manuela: 3,
  Gilbert: 3,
  Alois: 3,
  Catherine: 3,
  Shamir: 3,
  Cyril: 3,
  Rhea: 3,
};
