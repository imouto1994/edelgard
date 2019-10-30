import React, { ReactElement, useState, useCallback } from "react";
import classnames from "classnames";

import styles from "./styles.css";

type Props = {
  className?: string;
  placeholderSrc: string;
  src: string;
  srcSet?: string;
};

export default function Image(props: Props): ReactElement {
  const { className, placeholderSrc, src, srcSet } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const imageRef = useCallback((imageElement: HTMLImageElement): void => {
    if (imageElement !== null && imageElement.complete) {
      setIsLoaded(imageElement.complete);
    }
  }, []);

  return (
    <div className={classnames(className, styles.container)}>
      <img
        ref={imageRef}
        className={classnames(styles.image, { [styles.imageShow]: isLoaded })}
        onLoad={(): void => setIsLoaded(true)}
        src={src}
        srcSet={srcSet}
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
