import { h, VNode } from "preact";
import { useCallback } from "preact/hooks";

import Image from "../Image";
import { characterFactions } from "../../data/character";
import { Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

import styles from "./styles.css";

type Props = {
  characters: readonly Character[];
  onCharacterSelect: (character: Character) => void;
};

export default function CharacterList(props: Props): VNode<Props> {
  const { characters, onCharacterSelect } = props;

  const onSelect = useCallback(
    (character: Character): void => {
      onCharacterSelect(character);
    },
    [onCharacterSelect],
  );

  return (
    <div className={styles.characterList}>
      {characters.map((character: Character) => (
        <CharacterItem
          key={character}
          character={character}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

type CharacterItemProps = {
  character: Character;
  onSelect: (c: Character) => void;
};

function CharacterItem(props: CharacterItemProps): VNode<CharacterItemProps> {
  const { character, onSelect } = props;
  const characterSlug = slugify(character);
  const faction = characterFactions[character];

  const onClick = useCallback(() => {
    onSelect(character);
  }, [character, onSelect]);

  return (
    <div className={styles.characterEntry} onClick={onClick}>
      <div className={styles.portraitContainer}>
        <div className={styles.portraitWrapper}>
          <Image
            srcSetPNG={`/${characterSlug}_y_s@1x.png 1x, /${characterSlug}_y_s@2x.png 2x, /${characterSlug}_y_s@3x.png 3x`}
            srcSetWEBP={`/${characterSlug}_y_s@1x.webp 1x, /${characterSlug}_y_s@2x.webp 2x, /${characterSlug}_y_s@3x.webp 3x`}
            placeholderSrc={`/${characterSlug}_y_s.svg`}
            className={styles.portrait}
            contentFill="height"
          />
          {faction != null ? (
            <Image
              srcSetPNG={`/${faction}_emblem@1x.png 1x, /${faction}_emblem@2x.png 2x, /${faction}_emblem@3x.png 3x`}
              srcSetWEBP={`/${faction}_emblem@1x.webp 1x, /${faction}_emblem@2x.webp 2x, /${faction}_emblem@3x.webp 3x`}
              placeholderSrc={`/${faction}_emblem.svg`}
              className={styles.faction}
              contentFill="height"
            />
          ) : null}
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span>{character}</span>
      </div>
    </div>
  );
}
