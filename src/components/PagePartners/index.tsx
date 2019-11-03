import { h, VNode } from "preact";
import { useEffect } from "preact/hooks";
import { useLocation, useRoute } from "wouter-preact";
import { useSelector, useDispatch } from "react-redux";

import Page from "../Page";
import CharacterList from "../CharacterList";
import { isCharacter } from "../../data/character";
import { Character } from "../../data/character/type";
import { endingsPartnerGetRequest, selectPartners } from "../../data/ending";
import { State } from "../../data/type";
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
  const dispatch = useDispatch();
  const [, setLocation] = useLocation();

  useEffect(() => {
    dispatch(endingsPartnerGetRequest(character));
  }, [character, dispatch]);

  const partners = useSelector((state: State) =>
    selectPartners(state, { character }),
  );

  function handlePartnerSelect(partner: Character): void {
    setLocation(`/${characterSlug}/${slugify(partner)}`);
  }

  function handleBackNavigate(): void {
    setLocation("/");
  }

  return (
    <Page title={`Select Partner for ${character}`} onBack={handleBackNavigate}>
      <CharacterList
        characters={partners}
        onCharacterSelect={handlePartnerSelect}
      />
    </Page>
  );
}
