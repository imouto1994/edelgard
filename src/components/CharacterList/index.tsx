import React, { ReactElement } from "react";

import Image from "../Image";
import { characterFactions, Character } from "../../data/character/type";
import { slugify } from "../../utils/string";

import styles from "./styles.css";

import empireEmblemImageURL from "../../images/empire_emblem.png";
import holyEmblemImageURL from "../../images/holy_emblem.png";
import allianceEmblemImageURL from "../../images/alliance_emblem.png";
import churchEmblemImageURL from "../../images/church_emblem.png";

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
  function onClick(): void {
    const { character, onCharacterSelect } = props;
    onCharacterSelect(character);
  }

  const { character } = props;
  const characterSlug = slugify(character);
  let factionImageURL;
  if (characterFactions[character] === 0) {
    factionImageURL = empireEmblemImageURL;
  } else if (characterFactions[character] === 1) {
    factionImageURL = holyEmblemImageURL;
  } else if (characterFactions[character] === 2) {
    factionImageURL = allianceEmblemImageURL;
  } else if (characterFactions[character] === 3) {
    factionImageURL = churchEmblemImageURL;
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
          />
          {factionImageURL != null ? (
            <img src={factionImageURL} className={styles.faction} />
          ) : null}
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span>{character}</span>
      </div>
    </div>
  );
}
