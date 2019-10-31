import React, { ReactElement } from "react";

import Image from "../Image";
import { characterFactions } from "../../data/character";
import { Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

import styles from "./styles.css";

type Props = {
  characters: readonly Character[];
  onCharacterSelect: (character: Character) => void;
};

export default function CharacterList(props: Props): ReactElement {
  const { characters } = props;

  function onCharacterSelect(character: Character): void {
    props.onCharacterSelect(character);
  }

  return (
    <div className={styles.characterList}>
      {characters.map((character: Character) => (
        <CharacterItem
          key={character}
          character={character}
          onCharacterSelect={onCharacterSelect}
        />
      ))}
    </div>
  );
}

type CharacterItemProps = {
  character: Character;
  onCharacterSelect: (c: Character) => void;
};

function CharacterItem(props: CharacterItemProps): ReactElement {
  const { character } = props;
  const characterSlug = slugify(character);
  const faction = characterFactions[character];

  function onClick(): void {
    const { character, onCharacterSelect } = props;
    onCharacterSelect(character);
  }

  return (
    <div className={styles.characterEntry} onClick={onClick}>
      <div className={styles.portraitContainer}>
        <div className={styles.portraitWrapper}>
          <Image
            src={require(`../../images/${characterSlug}_y_s@1x.png`)}
            srcSet={`${require(`../../images/${characterSlug}_y_s@1x.png`)} 1x, ${require(`../../images/${characterSlug}_y_s@2x.png`)} 2x, ${require(`../../images/${characterSlug}_y_s@3x.png`)} 3x`}
            placeholderSrc={require(`../../images/${characterSlug}_y_s.svg`)}
            className={styles.portrait}
            contentFill="height"
          />
          {faction != null ? (
            <Image
              src={require(`../../images/${faction}_emblem@1x.png`)}
              srcSet={`${require(`../../images/${faction}_emblem@1x.png`)} 1x, ${require(`../../images/${faction}_emblem@2x.png`)} 2x, ${require(`../../images/${faction}_emblem@3x.png`)} 3x`}
              placeholderSrc={require(`../../images/${faction}_emblem.svg`)}
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
