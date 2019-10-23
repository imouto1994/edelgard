import React, { PureComponent } from "react";
import classnames from "classnames";

import styles from "./styles.css";

class PairEndings extends PureComponent {
  render() {
    const { className = "", characterA, characterB } = this.props;
    const keyA = characterA
      .toLowerCase()
      .split(" ")
      .join("_");
    const keyB = characterB
      .toLowerCase()
      .split(" ")
      .join("_");
    const portraitAImageURL = require(`../../images/${keyA}_l.png`);
    const portraitBImageURL = require(`../../images/${keyB}_l.png`);

    return (
      <div className={classnames(styles.endingsCard, className)}>
        <div className={styles.header}>
          <img src={portraitAImageURL} className={styles.portraitA} />
          <img src={portraitBImageURL} className={styles.portraitB} />
        </div>
        <div className={styles.content}></div>
      </div>
    );
  }
}

export default PairEndings;
