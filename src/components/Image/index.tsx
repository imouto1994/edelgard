import React, { ReactElement, useState, useEffect } from "react";
import classnames from "classnames";

import styles from "./styles.css";

type Props = {
  className?: string;
  placeholderSrc: string;
  src: string;
};

export default function Image(props: Props): ReactElement {
  const { className, placeholderSrc, src } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={classnames(className, styles.container)}>
      <img
        className={classnames(styles.image, { [styles.imageShow]: isLoaded })}
        onLoad={(): void => setIsLoaded(true)}
        src={src}
      />
      <img
        className={classnames(styles.placeholder, {
          [styles.placeholderHide]: isLoaded,
        })}
        src={placeholderSrc}
      />
    </div>
  );
}
