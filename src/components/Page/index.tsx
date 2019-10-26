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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 199.4 199.4"
            className={styles.headerBackButton}
            onClick={onBack}
          >
            <path d="M135 0L36 100l99 99 29-28-72-71 72-72z" />
          </svg>
        ) : null}
        <span>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
