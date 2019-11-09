/* Entity */

export enum OrderedRoute {
  "Crimson Flower" = 0,
  "Azure Moon",
  "Verdant Wind",
  "Silver Snow",
}

export type EndingRoute = [OrderedRoute, number, number];

export type Ending = {
  content: string;
  routes: EndingRoute[];
};
