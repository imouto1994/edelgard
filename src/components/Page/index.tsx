import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

import styles from "./styles.css";

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
          <button className={styles.headerBackButton} onClick={onBack}>
            Back
          </button>
        ) : null}
        <span className={styles.headerText}>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
