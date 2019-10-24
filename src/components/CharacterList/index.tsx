import React, { PureComponent, ReactElement } from "react";

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

class CharacterList extends PureComponent<Props> {
  onCharacterSelect = (character: Character): void => {
    this.props.onCharacterSelect(character);
  };

  render(): ReactElement {
    const { characters } = this.props;

    return (
      <div className={styles.characterList}>
        {characters.map(this.renderCharacter)}
      </div>
    );
  }

  renderCharacter = (character: Character): ReactElement => {
    return (
      <CharacterItem
        key={character}
        character={character}
        onCharacterSelect={this.onCharacterSelect}
      />
    );
  };
}

export default CharacterList;

type CharacterItemProps = {
  character: Character;
  onCharacterSelect: (c: Character) => void;
};

class CharacterItem extends PureComponent<CharacterItemProps> {
  onClick = (): void => {
    const { character, onCharacterSelect } = this.props;
    onCharacterSelect(character);
  };

  render(): ReactElement {
    const { character } = this.props;
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
      <div className={styles.characterEntry} onClick={this.onClick}>
        <div className={styles.portraitContainer}>
          <div className={styles.portraitWrapper}>
            <img
              src={require(`../../images/${characterSlug}_y_s.png`)}
              className={styles.portrait}
            />
            {factionImageURL != null ? (
              <img src={factionImageURL} className={styles.faction} />
            ) : null}
          </div>
        </div>
        <div className={styles.contentContainer}>{character}</div>
      </div>
    );
  }
}
