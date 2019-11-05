import styles from "./styles.css";

import { h, VNode, ComponentChildren } from "preact";
import classnames from "classnames";

type Props = {
  children: ComponentChildren;
  className?: string;
  onBack?: () => void;
  title: string;
};

export default function Page(props: Props): VNode<Props> {
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
