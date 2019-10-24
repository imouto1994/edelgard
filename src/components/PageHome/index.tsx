import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

import Page from "../Page";
import CharacterList from "../CharacterList";
import { orderedCharacters } from "../../data/character";
import { Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

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
