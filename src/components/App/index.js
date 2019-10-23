import React, { PureComponent } from "react";

import CharacterList from "../CharacterList";
import PairEndings from "../PairEndings";
import { Characters } from "../../constants";

import styles from "./styles.css";

import backArrowImageURL from "../../images/back_arrow.png";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      characters: Characters,
      endings: undefined,
      selectedCharacterA: undefined,
      selectedCharacterB: undefined,
    };
  }

  onCharacterSelect = characterName => {
    const { selectedCharacterA, selectedCharacterB } = this.state;
    if (selectedCharacterA == null) {
      const key = characterName
        .toLowerCase()
        .split(" ")
        .join("_");
      import(`../../../json/${key}.json`).then(
        ({ default: characterEndings }) => {
          this.setState({
            characters: Characters.filter(
              name => characterEndings[name] != null,
            ),
            endings: characterEndings,
            selectedCharacterA: characterName,
          });
        },
      );
    } else if (selectedCharacterB == null) {
      this.setState({
        selectedCharacterB: characterName,
      });
    }
  };

  onBackButtonClick = () => {
    const { selectedCharacterA, selectedCharacterB } = this.state;
    if (selectedCharacterB != null) {
      this.setState({
        selectedCharacterB: null,
      });
    } else if (selectedCharacterA != null) {
      this.setState({
        characters: Characters,
        endings: null,
        selectedCharacterA: null,
      });
    }
  };

  render() {
    const {
      characters,
      endings,
      selectedCharacterA,
      selectedCharacterB,
    } = this.state;

    return (
      <div className={styles.app}>
        {this.renderHeader()}
        {selectedCharacterA != null && selectedCharacterB != null ? (
          <PairEndings
            className={styles.content}
            characterA={selectedCharacterA}
            characterB={selectedCharacterB}
            endings={endings[selectedCharacterB]}
          />
        ) : (
          <CharacterList
            characters={characters}
            className={styles.content}
            onCharacterSelect={this.onCharacterSelect}
          />
        )}
      </div>
    );
  }

  renderHeader() {
    const { selectedCharacterA, selectedCharacterB } = this.state;
    let headerTitle;
    if (selectedCharacterA == null) {
      headerTitle = "Select first character";
    } else if (selectedCharacterB == null) {
      headerTitle = "Select second character";
    } else {
      headerTitle = `Endings for ${selectedCharacterA} / ${selectedCharacterB}`;
    }

    return (
      <div className={styles.header}>
        {selectedCharacterA != null ? (
          <img
            className={styles.headerBackButton}
            src={backArrowImageURL}
            onClick={this.onBackButtonClick}
          />
        ) : null}
        {headerTitle}
      </div>
    );
  }
}

export default App;
