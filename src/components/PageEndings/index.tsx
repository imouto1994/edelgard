import React, { ReactElement, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Page from "../Page";
import PartnerEndingsCard from "../PartnerEndingsCard";
import { isCharacter } from "../../data/character";
import { Character } from "../../data/character/type";
import {
  endingsPartnerGetRequest,
  selectPartnerEndings,
} from "../../data/ending";
import { Dispatch, State } from "../../data/type";
import { unslugify } from "../../utils/string";

type PageEndingsURLParams = {
  characterASlug?: string;
  characterBSlug?: string;
};

export default function PageEndings(): ReactElement | null {
  const { characterASlug, characterBSlug } = useParams<PageEndingsURLParams>();

  if (characterASlug == null || characterBSlug == null) {
    return null;
  }

  const characterA = unslugify(characterASlug);
  const characterB = unslugify(characterBSlug);

  if (!isCharacter(characterA) || !isCharacter(characterB)) {
    return null;
  }

  return (
    <PageEndingsWithCharacters
      characterA={characterA}
      characterB={characterB}
      characterASlug={characterASlug}
      characterBSlug={characterBSlug}
    />
  );
}

type PageEndingsWithCharactersProps = {
  characterA: Character;
  characterB: Character;
  characterASlug: string;
  characterBSlug: string;
};

function PageEndingsWithCharacters(
  props: PageEndingsWithCharactersProps,
): ReactElement | null {
  const { characterA, characterB, characterASlug, characterBSlug } = props;
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();

  useEffect(() => {
    dispatch(endingsPartnerGetRequest(characterA));
  }, [characterA, dispatch]);

  const partnerEndings = useSelector((state: State) =>
    selectPartnerEndings(state, { characterA, characterB }),
  );

  if (partnerEndings == null) {
    return null;
  }

  function handleBackNavigate(): void {
    history.push(`/${characterASlug}`);
  }

  return (
    <Page
      title={`Endings for ${characterA} / ${characterB}`}
      onBack={handleBackNavigate}
    >
      <PartnerEndingsCard
        characterA={characterA}
        characterB={characterB}
        characterASlug={characterASlug}
        characterBSlug={characterBSlug}
        partnerEndings={partnerEndings}
      />
    </Page>
  );
}
