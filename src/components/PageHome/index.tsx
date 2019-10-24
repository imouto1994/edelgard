import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

import Page from "../Page";
import CharacterList from "../CharacterList";
import { Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

const orderedCharacters: Character[] = [
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
];

export default function PageHome(): ReactElement {
  const history = useHistory();

  function handleCharacterSelect(character: Character): void {
    history.push(`/${slugify(character)}`);
  }

  return (
    <Page title="Select Character">
      <CharacterList
        characters={orderedCharacters}
        onCharacterSelect={handleCharacterSelect}
      />
    </Page>
  );
}
