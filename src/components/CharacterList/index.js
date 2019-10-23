import classnames from "classnames";
import React, { PureComponent } from "react";

import { CharacterFactions } from "../../constants";

import styles from "./styles.css";

import empireEmblemImageURL from "../../images/empire_emblem.png";
import holyEmblemImageURL from "../../images/holy_emblem.png";
import allianceEmblemImageURL from "../../images/alliance_emblem.png";
import churchEmblemImageURL from "../../images/church_emblem.png";

class CharacterList extends PureComponent {
  onCharacterSelect = characterName => {
    this.props.onCharacterSelect(characterName);
  };

  render() {
    const { characters, className = "" } = this.props;

    return (
      <div className={classnames(styles.characterList, className)}>
        {characters.map(this.renderCharacter)}
      </div>
    );
  }

  renderCharacter = characterName => {
    return (
      <Character
        key={characterName}
        name={characterName}
        onCharacterSelect={this.onCharacterSelect}
      />
    );
  };
}

export default CharacterList;

class Character extends PureComponent {
  onClick = () => {
    const { name, onCharacterSelect } = this.props;
    onCharacterSelect(name);
  };

  render() {
    const { name } = this.props;
    const key = name
      .toLowerCase()
      .split(" ")
      .join("_");
    let factionImageURL;
    if (CharacterFactions[name] === 0) {
      factionImageURL = empireEmblemImageURL;
    } else if (CharacterFactions[name] === 1) {
      factionImageURL = holyEmblemImageURL;
    } else if (CharacterFactions[name] === 2) {
      factionImageURL = allianceEmblemImageURL;
    } else if (CharacterFactions[name] === 3) {
      factionImageURL = churchEmblemImageURL;
    }

    return (
      <div className={styles.characterEntry} onClick={this.onClick}>
        <div className={styles.portraitContainer}>
          <div className={styles.portraitWrapper}>
            <img
              src={require(`../../images/${key}_y_s.png`)}
              className={styles.portrait}
            />
            {factionImageURL != null ? (
              <img src={factionImageURL} className={styles.faction} />
            ) : null}
          </div>
        </div>
        <div className={styles.contentContainer}>{name}</div>
      </div>
    );
  }
}
