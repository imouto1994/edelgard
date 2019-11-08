import { h, VNode } from "preact";

import Page from "../Page";
import CharacterList from "../CharacterList";
import { orderedCharacters } from "../../data/character";

export default function PageHome(): VNode {
  return (
    <Page title="Select Character">
      <CharacterList characters={orderedCharacters} />
    </Page>
  );
}
