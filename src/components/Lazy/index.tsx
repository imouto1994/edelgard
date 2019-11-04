import { h, VNode, ComponentChildren } from "preact";

import { useInView } from "../../hooks/intersection-observer";

type Props = {
  className?: string;
  children: ComponentChildren;
};

export default function Lazy(props: Props): VNode<Props> {
  const { className = "", children } = props;
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "10px 0px",
  });

  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}
