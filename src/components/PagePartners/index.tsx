import React, { ReactElement, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Page from "../Page";
import CharacterList from "../CharacterList";
import { isCharacter } from "../../data/character";
import { Character } from "../../data/character/type";
import { endingsPartnerGetRequest, selectPartners } from "../../data/ending";
import { State } from "../../data/type";
import { slugify, unslugify } from "../../utils/string";

type PagePartnersURLParams = { characterSlug?: string };

export default function PagePartners(): ReactElement | null {
  const { characterSlug } = useParams<PagePartnersURLParams>();

  if (characterSlug == null) {
    return null;
  }

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
): ReactElement | null {
  const { character, characterSlug } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const partners = useSelector((state: State) =>
    selectPartners(state, { character }),
  );

  useEffect(() => {
    dispatch(endingsPartnerGetRequest(character));
  }, [character, dispatch]);

  function handlePartnerSelect(partner: Character): void {
    history.push(`/${characterSlug}/${slugify(partner)}`);
  }

  function handleBackNavigate(): void {
    history.push("");
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
