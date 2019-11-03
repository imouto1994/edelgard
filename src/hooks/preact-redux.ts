// Reference: https://github.com/facebookincubator/redux-react-hook
// Convert this to native Preact version

import { createContext } from "preact";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Store } from "redux";

import {
  Action as AppAction,
  Dispatch as AppDispatch,
  State as AppState,
} from "../data/type";

// From https://github.com/reduxjs/preact-redux/blob/3e53ff96ed10f71c21346f08823e503df724db35/src/utils/shallowEqual.js

const hasOwn = Object.prototype.hasOwnProperty;

function is(x: unknown, y: unknown): boolean {
  if (x === y) {
    return (
      x !== 0 ||
      y !== 0 ||
      (typeof x === "number" && typeof y === "number" && 1 / x === 1 / y)
    );
  } else {
    return x !== x && y !== y;
  }
}

export default function shallowEqual(objA: unknown, objB: unknown): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

// Preact currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

class MissingProviderError extends Error {
  constructor() {
    super(
      "redux-react-hook requires your Redux store to be passed through " +
        "context via the <StoreContext.Provider>",
    );
  }
}

function memoizeSingleArg<AT, RT>(fn: (arg: AT) => RT): (arg: AT) => RT {
  let value: RT;
  let prevArg: AT;

  return (arg: AT): RT => {
    if (prevArg !== arg) {
      prevArg = arg;
      value = fn(arg);
    }
    return value;
  };
}

type AppStore = Store<AppState, AppAction>;

/**
 * To use redux-react-hook with stronger type safety, or to use with multiple
 * stores in the same app, create() your own instance and re-export the returned
 * functions.
 */
export const StoreContext = createContext<AppStore | null>(null);

/**
 * Your passed in mapState function should be memoized with useCallback to avoid
 * resubscribing every render. If you don't use other props in mapState, pass
 * an empty array [] as the dependency list so the callback isn't recreated
 * every render.
 *
 * const todo = useMappedState(useCallback(
 *   state => state.todos.get(id),
 *   [id],
 * ));
 */
export function useMappedState<TResult>(
  mapState: (state: AppState) => TResult,
): TResult {
  const store = useContext(StoreContext);
  if (!store) {
    throw new MissingProviderError();
  }

  // We don't keep the derived state but call mapState on every render with current state.
  // This approach guarantees that useMappedState returns up-to-date derived state.
  // Since mapState can be expensive and must be a pure function of state we memoize it.
  const memoizedMapState = useMemo(() => memoizeSingleArg(mapState), [
    mapState,
  ]);

  const state = store.getState();
  const derivedState = memoizedMapState(state);

  // Since we don't keep the derived state we still need to trigger
  // an update when derived state changes.
  const [, forceUpdate] = useState(0);

  // Keep previously commited derived state in a ref. Compare it to the new
  // one when an action is dispatched and call forceUpdate if they are different.
  const lastStateRef = useRef(derivedState);

  const memoizedMapStateRef = useRef(memoizedMapState);

  // We use useLayoutEffect to render once if we have multiple useMappedState.
  // We need to update lastStateRef synchronously after rendering component,
  // With useEffect we would have:
  // 1) dispatch action
  // 2) call subscription cb in useMappedState1, call forceUpdate
  // 3) rerender component
  // 4) call useMappedState1 and useMappedState2 code
  // 5) calc new derivedState in useMappedState2, schedule updating lastStateRef, return new state, render component
  // 6) call subscription cb in useMappedState2, check if lastStateRef !== newDerivedState, call forceUpdate, rerender.
  // 7) update lastStateRef - it's too late, we already made one unnecessary render
  useIsomorphicLayoutEffect(() => {
    lastStateRef.current = derivedState;
    memoizedMapStateRef.current = memoizedMapState;
  });

  useIsomorphicLayoutEffect(() => {
    let didUnsubscribe = false;

    // Run the mapState callback and if the result has changed, make the
    // component re-render with the new state.
    const checkForUpdates = (): void => {
      if (didUnsubscribe) {
        // Don't run stale listeners.
        // Redux doesn't guarantee unsubscriptions happen until next dispatch.
        return;
      }

      const newDerivedState = memoizedMapStateRef.current(store.getState());

      if (!shallowEqual(newDerivedState, lastStateRef.current)) {
        forceUpdate(increment);
      }
    };

    // Pull data from the store after first render in case the store has
    // changed since we began.
    checkForUpdates();

    // Subscribe to the store to be notified of subsequent changes.
    const unsubscribe = store.subscribe(checkForUpdates);

    // The return value of useEffect will be called when unmounting, so
    // we use it to unsubscribe from the store.
    return (): void => {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, [store]);

  return derivedState;
}

export function useDispatch(): AppDispatch {
  const store = useContext(StoreContext);
  if (!store) {
    throw new MissingProviderError();
  }
  return store.dispatch;
}

function increment(x: number): number {
  return x + 1;
}
