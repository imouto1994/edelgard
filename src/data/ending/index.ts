import { Ending, OrderedRoute } from "./type";

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
    if (!isRoute(route)) {
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
): OrderedRoute[] {
  const availableRoutes: OrderedRoute[] = endings.reduce(
    (arr: OrderedRoute[], ending: Ending) => {
      for (const route of ending.routes) {
        arr.push(route);
      }

      return arr;
    },
    [],
  );
  availableRoutes.sort(
    (routeA: OrderedRoute, routeB: OrderedRoute) => routeA - routeB,
  );

  return availableRoutes;
}

export function getEndingContentForRoute(
  endings: Ending[],
  route: OrderedRoute,
): string | null {
  for (const ending of endings) {
    if (ending.routes.includes(route)) {
      return ending.content;
    }
  }

  return null;
}
