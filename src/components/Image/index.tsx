import React, { ReactElement, useState, useCallback } from "react";
import classnames from "classnames";

import styles from "./styles.css";

type Props = {
  className?: string;
  classNameImage?: string;
  classNamePlaceholder?: string;
  contentFill: "height" | "width";
  onClick?: () => void;
  placeholderSrc: string;
  src: string;
  srcSet?: string;
};

export default function Image(props: Props): ReactElement {
  const {
    className,
    classNameImage,
    classNamePlaceholder,
    contentFill,
    placeholderSrc,
    src,
    srcSet,
    onClick,
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const imageRef = useCallback((imageElement: HTMLImageElement): void => {
    if (imageElement !== null && imageElement.complete) {
      setIsLoaded(imageElement.complete);
    }
  }, []);

  function onImageLoad(): void {
    setIsLoaded(true);
  }

  function onContainerClick(): void {
    if (onClick != null) {
      onClick();
    }
  }

  return (
    <div
      className={classnames(className, styles.container)}
      onClick={onContainerClick}
    >
      <img
        ref={imageRef}
        className={classnames(classNameImage, styles.image, {
          [styles.imageShow]: isLoaded,
        })}
        onLoad={onImageLoad}
        src={src}
        srcSet={srcSet}
      />
      <img
        className={classnames(classNamePlaceholder, styles.placeholder, {
          [styles.placeholderFillWidth]: contentFill === "width",
          [styles.placeholderFillHeight]: contentFill === "height",
          [styles.placeholderHide]: isLoaded,
        })}
        src={placeholderSrc}
      />
    </div>
  );
}
