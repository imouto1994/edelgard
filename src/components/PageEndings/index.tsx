import styles from "./styles.css";

import { h, VNode } from "preact";
import { useEffect, useCallback, useState } from "preact/hooks";
import { useRoute, useLocation } from "wouter-preact";

import Page from "../Page";
import EndingsCard from "../EndingsCard";
import { isCharacter } from "../../data/character";
import { Character } from "../../data/character/type";
import { isEndings } from "../../data/ending";
import { Ending } from "../../data/ending/type";
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
  const [, setLocation] = useLocation();
  const [endings, setEndings] = useState<Ending[]>([]);

  useEffect(() => {
    const jsonFile =
      characterASlug < characterBSlug
        ? `/${characterASlug}_${characterBSlug}.json`
        : `/${characterBSlug}_${characterASlug}.json`;
    fetch(jsonFile)
      .then((response: Response) => response.json())
      .then((endings: unknown) => {
        if (isEndings(endings)) {
          setEndings(endings);
        } else {
          return Promise.reject(
            new Error(
              "JSON response does not match with `PartnerEndingsMap` type",
            ),
          );
        }
      })
      .catch((err: Error) => {
        console.log("Page Endings", err.message);
      });
  }, [characterASlug, characterBSlug]);

  const onBack = useCallback((): void => {
    setLocation(`/${characterASlug}`);
  }, [characterASlug, setLocation]);

  return (
    <Page
      title={`Endings for ${characterA} / ${characterB}`}
      onBack={onBack}
      classNameContent={styles.pageContent}
    >
      <EndingsCard
        characterA={characterA}
        characterB={characterB}
        characterASlug={characterASlug}
        characterBSlug={characterBSlug}
        endings={endings}
      />
    </Page>
  );
}
