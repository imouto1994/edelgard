import styles from "./styles.css";

import { h, VNode } from "preact";
import { useState, useCallback } from "preact/hooks";
import classnames from "classnames";

type Props = {
  className?: string;
  classNameImage?: string;
  classNamePlaceholder?: string;
  contentFill: "height" | "width";
  onClick?: () => void;
  placeholderSrc: string;
  srcSetWEBP: string;
  srcSetPNG: string;
};

function isImageLoaded(imageElement: HTMLImageElement): boolean {
  // During the onload event, IE correctly identifies any images that
  // weren't downloaded as not complete. Others should too. Gecko-based
  // browsers act like NS4 in that they report this incorrectly.
  if (!imageElement.complete) {
    return false;
  }

  // However, they do have two very useful properties: naturalWidth and
  // naturalHeight. These give the true size of the image. If it failed
  // to load, either of these should be zero.
  if (
    typeof imageElement.naturalWidth != "undefined" &&
    imageElement.naturalWidth == 0
  ) {
    return false;
  }

  // No other way of checking: assume it's ok.
  return true;
}

export default function Image(props: Props): VNode<Props> {
  const {
    className,
    classNameImage,
    classNamePlaceholder,
    contentFill,
    placeholderSrc,
    srcSetWEBP,
    srcSetPNG,
    onClick,
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const imageRef = useCallback((imageElement: HTMLImageElement): void => {
    if (imageElement != null) {
      setIsLoaded(isImageLoaded(imageElement));
    }
  }, []);

  const onImageLoad = useCallback((): void => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  const onContainerClick = useCallback((): void => {
    if (onClick != null) {
      onClick();
    }
  }, [onClick]);

  return (
    <div
      className={classnames(className, styles.container)}
      onClick={onContainerClick}
    >
      <picture>
        <source type="image/webp" srcSet={srcSetWEBP} />
        <source type="image/png" srcSet={srcSetPNG} />
        <img
          ref={imageRef}
          className={classnames(classNameImage, styles.image, {
            [styles.imageShow]: isLoaded,
          })}
          onLoad={onImageLoad}
          srcSet={srcSetPNG}
        />
      </picture>
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
