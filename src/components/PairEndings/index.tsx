import React, { ReactElement } from "react";
import classnames from "classnames";

import { Character } from "../../data/character/type";
import { Endings } from "../../data/ending/type";
import { slugify } from "../../utils/string";

import styles from "./styles.css";

type Props = {
  className?: string;
  characterA: Character;
  characterB: Character;
  endings: Endings;
};

function PairEndings(props: Props): ReactElement {
  const { className = "", characterA, characterB } = props;
  const characterSlugA = slugify(characterA);
  const characterSlugB = slugify(characterB);
  const portraitAImageURL: string = require(`../../images/${characterSlugA}_l.png`); // eslint-disable-line @typescript-eslint/no-var-requires
  const portraitBImageURL: string = require(`../../images/${characterSlugB}_l.png`); // eslint-disable-line @typescript-eslint/no-var-requires

  return (
    <div className={classnames(styles.endingsCard, className)}>
      <div className={styles.left}>
        <img src={portraitAImageURL} className={styles.portraitA} />
        <img src={portraitBImageURL} className={styles.portraitB} />
      </div>
      <div className={styles.right}></div>
    </div>
  );
}

export default PairEndings;
