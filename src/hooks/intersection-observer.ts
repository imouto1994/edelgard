// Reference: https://github.com/thebuilder/react-intersection-observer
// Coverted to native Preact version

import { useRef, useCallback, useState } from "preact/hooks";

export type ObserverInstanceCallback = (
  inView: boolean,
  intersection: IntersectionObserverEntry,
) => void;

export type ObserverInstance = {
  inView: boolean;
  readonly callback: ObserverInstanceCallback;
  readonly element: Element;
  readonly observerId: string;
  readonly observer: IntersectionObserver;
  readonly thresholds: ReadonlyArray<number>;
};

export interface IntersectionOptions extends IntersectionObserverInit {
  // Only trigger the inView callback once
  triggerOnce?: boolean;
}

export type InViewHookResponse = [
  (node: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
];

const INSTANCE_MAP: Map<Element, ObserverInstance> = new Map();
const OBSERVER_MAP: Map<string, IntersectionObserver> = new Map();
const ROOT_IDS: Map<Element, string> = new Map();

let consecutiveRootId = 0;

/**
 * Generate a unique ID for the root element
 */
function getRootId(root?: Element | null): string {
  if (!root) {
    return "";
  }

  const id = ROOT_IDS.get(root);
  if (id != null) {
    return id;
  }

  consecutiveRootId += 1;
  ROOT_IDS.set(root, consecutiveRootId.toString());

  return ROOT_IDS.get(root) + "_";
}

/**
 * Monitor element, and trigger callback when element becomes inView
 */
export function observe(
  element: Element,
  callback: ObserverInstanceCallback,
  options: IntersectionObserverInit = {},
): void {
  // IntersectionObserver needs a threshold to trigger, so set it to 0 if it's not defined.
  // Modify the options object, since it's used in the onChange handler.
  if (!options.threshold) {
    options.threshold = 0;
  }
  const { root, rootMargin, threshold } = options;
  // Validate that the element is not being used in another <Observer />

  if (process.env.NODE_ENV === "development" && INSTANCE_MAP.has(element)) {
    throw new Error(
      "react-intersection-observer: Trying to observe %s, but it's already being observed by another instance.\nMake sure the `ref` is only used by a single <Observer /> instance.\n\n%s",
    );
  }

  if (!element) {
    return;
  }

  // Create a unique ID for this observer instance, based on the root, root margin and threshold.
  // An observer with the same options can be reused, so lets use this fact
  const observerId: string =
    getRootId(root) +
    (rootMargin
      ? `${threshold.toString()}_${rootMargin}`
      : threshold.toString());

  let observerInstance = OBSERVER_MAP.get(observerId);
  if (!observerInstance) {
    observerInstance = new IntersectionObserver(onChange, options);
    if (observerId) {
      OBSERVER_MAP.set(observerId, observerInstance);
    }
  }

  const instance: ObserverInstance = {
    callback,
    element,
    inView: false,
    observerId,
    observer: observerInstance,
    // Make sure we have the thresholds value. It's undefined on a browser like Chrome 51.
    thresholds:
      observerInstance.thresholds ||
      (Array.isArray(threshold) ? threshold : [threshold]),
  };

  INSTANCE_MAP.set(element, instance);
  observerInstance.observe(element);
}

/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 */
export function unobserve(element: Element | null): void {
  if (!element) {
    return;
  }
  const instance = INSTANCE_MAP.get(element);

  if (instance) {
    const { observerId, observer } = instance;
    const { root } = observer;

    observer.unobserve(element);

    // Check if we are still observing any elements with the same threshold.
    let itemsLeft = false;
    // Check if we still have observers configured with the same root.
    let rootObserved = false;
    if (observerId) {
      INSTANCE_MAP.forEach((item, key) => {
        if (key !== element) {
          if (item.observerId === observerId) {
            itemsLeft = true;
            rootObserved = true;
          }
          if (item.observer.root === root) {
            rootObserved = true;
          }
        }
      });
    }
    if (!rootObserved && root) {
      ROOT_IDS.delete(root);
    }
    if (observer && !itemsLeft) {
      // No more elements to observe for threshold, disconnect observer
      observer.disconnect();
      OBSERVER_MAP.delete(observerId);
    }

    // Remove reference to element
    INSTANCE_MAP.delete(element);
  }
}

function onChange(changes: IntersectionObserverEntry[]): void {
  changes.forEach(intersection => {
    const { isIntersecting, intersectionRatio, target } = intersection;
    const instance = INSTANCE_MAP.get(target);

    // Firefox can report a negative intersectionRatio when scrolling.
    if (instance && intersectionRatio >= 0) {
      // If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
      let inView = instance.thresholds.some(threshold => {
        return instance.inView
          ? intersectionRatio > threshold
          : intersectionRatio >= threshold;
      });

      if (isIntersecting !== undefined) {
        // If isIntersecting is defined, ensure that the element is actually intersecting.
        // Otherwise it reports a threshold of 0
        inView = inView && isIntersecting;
      }

      instance.inView = inView;
      instance.callback(inView, intersection);
    }
  });
}

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export function useInView(
  options: IntersectionOptions = {},
): InViewHookResponse {
  const { threshold, root, rootMargin, triggerOnce } = options;
  const ref = useRef<Element | null>(null);
  const [state, setState] = useState<State>({
    inView: false,
    entry: undefined,
  });

  const setRef = useCallback(
    (node: Element | null) => {
      if (ref.current) {
        unobserve(ref.current);
      }
      if (node) {
        observe(
          node,
          (inView, intersection) => {
            setState({ inView, entry: intersection });

            if (inView && triggerOnce) {
              // If it should only trigger once, unobserve the element after it's inView
              unobserve(node);
            }
          },
          { threshold, root, rootMargin },
        );
      }

      // Store a reference to the node
      ref.current = node;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [threshold, root, rootMargin, triggerOnce],
  );

  return [setRef, state.inView, state.entry];
}
