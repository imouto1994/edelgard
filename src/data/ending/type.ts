/* Entity */

export enum OrderedRoute {
  "Crimson Flower" = 0,
  "Azure Moon",
  "Verdant Wind",
  "Silver Snow",
}

export type Ending = {
  content: string;
  routes: OrderedRoute[];
};
