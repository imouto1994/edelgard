import styles from "./styles.css";

import { h, VNode, ComponentChildren } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import { Link } from "wouter-preact";
import classnames from "classnames";

type Props = {
  backHref?: string;
  children: ComponentChildren;
  classNameContent?: string;
  title: string;
};

export default function Page(props: Props): VNode<Props> {
  const { title, backHref, classNameContent, children } = props;
  const [contentMarginRight, setContentMarginRight] = useState(0);
  const contentWrapperOuterRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperInnerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (
      contentWrapperOuterRef.current != null &&
      contentWrapperInnerRef.current != null
    ) {
      setContentMarginRight(
        contentWrapperOuterRef.current.clientWidth -
          contentWrapperInnerRef.current.clientWidth,
      );
    }
  }, [children]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {backHref != null ? (
          <Link className={styles.headerBackButton} href={backHref}>
            Back
          </Link>
        ) : null}
        <span className={styles.headerText}>{title}</span>
      </div>
      <div className={styles.contentWrapperOuter} ref={contentWrapperOuterRef}>
        <div
          className={styles.contentWrapperInner}
          ref={contentWrapperInnerRef}
        >
          <div
            className={classnames(styles.content, classNameContent)}
            style={{ marginRight: `-${contentMarginRight}px` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
