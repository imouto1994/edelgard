import React, { ReactElement } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      animate="enter"
      initial="initial"
      whileHover="hover"
      className={styles.characterEntry}
      onClick={onClick}
    >
      <div className={styles.portraitContainer}>
        <div className={styles.portraitWrapper}>
          <motion.img
            variants={{
              initial: { x: -50, y: -10, opacity: 0 },
              enter: {
                x: 0,
                y: -10,
                opacity: 1,
                transition: { duration: 0.5 },
              },
              hover: {
                scale: 0.8,
              },
            }}
            src={require(`../../images/${characterSlug}_y_s.png`)}
            className={styles.portrait}
          />
          {factionImageURL != null ? (
            <motion.img
              variants={{
                initial: { y: 50, opacity: 0 },
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                },
              }}
              src={factionImageURL}
              className={styles.faction}
            />
          ) : null}
        </div>
      </div>
      <div className={styles.contentContainer}>
        <motion.span
          variants={{
            initial: { y: "50%", opacity: 0 },
            enter: {
              y: "0%",
              opacity: 1,
              transition: { delay: 0.5, duration: 0.5 },
            },
          }}
        >
          {character}
        </motion.span>
      </div>
    </motion.div>
  );
}
