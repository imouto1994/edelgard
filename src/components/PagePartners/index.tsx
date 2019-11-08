import { h, VNode } from "preact";
import { useRoute } from "wouter-preact";

import Page from "../Page";
import CharacterList from "../CharacterList";
import {
  isCharacter,
  characterOrderedIndexMap,
  orderedCharacters,
} from "../../data/character";
import { Character, OrderedCharacterIndex } from "../../data/character/type";
import { orderedCharacterPartnerIndicesList } from "../../data/partners";
import { unslugify } from "../../utils/string";

type PagePartnersURLParams = { characterSlug: string };

export default function PagePartners(): VNode | null {
  const [, params] = useRoute<PagePartnersURLParams>("/:characterSlug");

  if (params == null) {
    return null;
  }

  const { characterSlug } = params;
  const character = unslugify(characterSlug);

  if (!isCharacter(character)) {
    return null;
  }

  return <PagePartnersWithCharacter character={character} />;
}

type PagePartnersWithCharacterProps = {
  character: Character;
};

function PagePartnersWithCharacter(
  props: PagePartnersWithCharacterProps,
): VNode<PagePartnersWithCharacterProps> | null {
  const { character } = props;

  const orderedPartnerIndices =
    orderedCharacterPartnerIndicesList[characterOrderedIndexMap[character]];
  const orderedPartners = orderedPartnerIndices.map(
    (index: OrderedCharacterIndex) => orderedCharacters[index],
  );

  return (
    <Page title={`Select Partner for ${character}`} backHref="/">
      <CharacterList characters={orderedPartners} />
    </Page>
  );
}
