import { h, VNode } from "preact";
import { useCallback } from "preact/hooks";
import { useLocation, useRoute } from "wouter-preact";

import Page from "../Page";
import CharacterList from "../CharacterList";
import {
  isCharacter,
  characterOrderedIndexMap,
  orderedCharacters,
} from "../../data/character";
import { Character, OrderedCharacterIndex } from "../../data/character/type";
import { orderedCharacterPartnerIndicesList } from "../../data/partners";
import { slugify, unslugify } from "../../utils/string";

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

  return (
    <PagePartnersWithCharacter
      character={character}
      characterSlug={characterSlug}
    />
  );
}

type PagePartnersWithCharacterProps = {
  character: Character;
  characterSlug: string;
};

function PagePartnersWithCharacter(
  props: PagePartnersWithCharacterProps,
): VNode<PagePartnersWithCharacterProps> | null {
  const { character, characterSlug } = props;
  const [, setLocation] = useLocation();

  const orderedPartnerIndices =
    orderedCharacterPartnerIndicesList[characterOrderedIndexMap[character]];
  const orderedPartners = orderedPartnerIndices.map(
    (index: OrderedCharacterIndex) => orderedCharacters[index],
  );

  const onPartnerSelect = useCallback(
    (partner: Character): void => {
      setLocation(`/${characterSlug}/${slugify(partner)}`);
    },
    [setLocation, characterSlug],
  );

  const onBack = useCallback((): void => {
    setLocation("/");
  }, [setLocation]);

  return (
    <Page title={`Select Partner for ${character}`} onBack={onBack}>
      <CharacterList
        characters={orderedPartners}
        onCharacterSelect={onPartnerSelect}
      />
    </Page>
  );
}
