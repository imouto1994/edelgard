import { Ending, OrderedRoute, EndingRoute } from "./type";

/* Utils */
export function isRoute(o: unknown): o is OrderedRoute {
  return typeof o === "number" && (o === 0 || o === 1 || o === 2 || o === 3);
}

export function isEnding(o: unknown): o is Ending {
  if (typeof o !== "object") {
    return false;
  }
  if (o == null) {
    return false;
  }

  if (typeof o["content"] !== "string") {
    return false;
  }
  if (!(o["routes"] instanceof Array)) {
    return false;
  }
  for (const route of o["routes"]) {
    if (!(route instanceof Array)) {
      return false;
    }

    if (!isRoute(route[0])) {
      return false;
    }
  }

  return true;
}

export function isEndings(o: unknown): o is Ending[] {
  if (!(o instanceof Array)) {
    return false;
  }

  for (const item of o) {
    if (typeof item !== "object") {
      return false;
    }
    if (item == null) {
      return false;
    }

    if (!isEnding(item)) {
      return false;
    }
  }

  return true;
}

export function getAvailableRoutesFromEndings(
  endings: Ending[],
): EndingRoute[] {
  const availableRoutes: EndingRoute[] = endings.reduce(
    (arr: EndingRoute[], ending: Ending) => {
      for (const route of ending.routes) {
        arr.push(route);
      }

      return arr;
    },
    [],
  );
  availableRoutes.sort(
    (routeA: EndingRoute, routeB: EndingRoute) => routeA[0] - routeB[0],
  );

  return availableRoutes;
}

export function getEndingContentForRoute(
  endings: Ending[],
  route: EndingRoute,
): string | null {
  for (const ending of endings) {
    for (const endingRoute of ending.routes) {
      if (endingRoute[0] === route[0]) {
        return ending.content;
      }
    }
  }

  return null;
}
