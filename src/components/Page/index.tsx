import React, { ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      animate="enter"
      initial="initial"
      className={classnames(styles.page, className)}
    >
      <div className={styles.header}>
        {onBack != null ? (
          <img
            className={styles.headerBackButton}
            src={backArrowImageURL}
            onClick={onBack}
          />
        ) : null}
        <motion.span
          variants={{
            initial: { opacity: 0, y: 15 },
            enter: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          {title}
        </motion.span>
      </div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
