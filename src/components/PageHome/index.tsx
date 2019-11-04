import { h, VNode } from "preact";
import { useCallback } from "preact/hooks";
import { useLocation } from "wouter-preact";

import Page from "../Page";
import CharacterList from "../CharacterList";
import { orderedCharacters } from "../../data/character";
import { Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

export default function PageHome(): VNode {
  const [, setLocation] = useLocation();

  const onCharacterSelect = useCallback(
    (character: Character): void => {
      setLocation(`/${slugify(character)}`);
    },
    [setLocation],
  );

  return (
    <Page title="Select Character">
      <CharacterList
        characters={orderedCharacters}
        onCharacterSelect={onCharacterSelect}
      />
    </Page>
  );
}
