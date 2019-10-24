import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

import styles from "./styles.css";

import backArrowImageURL from "../../images/back_arrow.png";

type Props = {
  children: ReactNode;
  className?: string;
  onBack?: () => void;
  title: string;
};

export default function Page(props: Props): ReactElement {
  const { title, onBack, className, children } = props;

  return (
    <div className={classnames(styles.page, className)}>
      <div className={styles.header}>
        {onBack != null ? (
          <img
            className={styles.headerBackButton}
            src={backArrowImageURL}
            onClick={onBack}
          />
        ) : null}
        {title}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
