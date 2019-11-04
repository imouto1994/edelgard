import { h, VNode } from "preact";
import { useEffect, useCallback } from "preact/hooks";
import { useRoute, useLocation } from "wouter-preact";

import Page from "../Page";
import PartnerEndingsCard from "../PartnerEndingsCard";
import { isCharacter } from "../../data/character";
import { Character } from "../../data/character/type";
import {
  endingsPartnerGetRequest,
  selectPartnerEndings,
} from "../../data/ending";
import { State } from "../../data/type";
import { useDispatch, useMappedState } from "../../hooks/preact-redux";
import { unslugify } from "../../utils/string";

type PageEndingsURLParams = {
  characterASlug: string;
  characterBSlug: string;
};

export default function PageEndings(): VNode | null {
  const [, params] = useRoute<PageEndingsURLParams>(
    "/:characterASlug/:characterBSlug",
  );

  if (params == null) {
    return null;
  }

  const { characterASlug, characterBSlug } = params;

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
): VNode<PageEndingsWithCharactersProps> | null {
  const { characterA, characterB, characterASlug, characterBSlug } = props;
  const dispatch = useDispatch();
  const [, setLocation] = useLocation();

  useEffect(() => {
    dispatch(endingsPartnerGetRequest(characterA));
  }, [characterA, dispatch]);

  const partnerEndingsSelector = useCallback(
    (state: State) => selectPartnerEndings(state, { characterA, characterB }),
    [characterA, characterB],
  );

  const partnerEndings = useMappedState(partnerEndingsSelector);

  const onBack = useCallback((): void => {
    setLocation(`/${characterASlug}`);
  }, [characterASlug, setLocation]);

  if (partnerEndings == null) {
    return null;
  }

  return (
    <Page title={`Endings for ${characterA} / ${characterB}`} onBack={onBack}>
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
