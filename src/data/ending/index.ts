import {
  Ending,
  EndingsPartnerGetFailureAction,
  EndingsPartnerGetPendingAction,
  EndingsPartnerGetRequestAction,
  EndingsPartnerGetSuccessAction,
  EndingState,
  PartnerEndings,
  PartnerEndingsMap,
  Route,
} from "./type";
import { orderedCharacters, isCharacter } from "../character";
import { Character } from "../character/type";
import { Action, State } from "../type";
import { slugify } from "../../utils/string";

/* Constants */
const orderedRoutes: Route[] = [
  "Crimson Flower",
  "Azure Moon",
  "Verdant Wind",
  "Silver Snow",
];

/* Actions */
export function endingsPartnerGetRequest(
  character: Character,
): EndingsPartnerGetRequestAction {
  return (dispatch): Promise<void> => {
    const characterSlug = slugify(character);

    dispatch(endingsPartnerGetPending());
    return import(
      /* webpackChunkName: "[request]" */ `../../json/${characterSlug}.json`
    )
      .then(({ default: parsedJSON }) => {
        if (isPartnerEndingsMap(parsedJSON)) {
          dispatch(endingsPartnerGetSuccess(character, parsedJSON));
        } else {
          return Promise.reject(
            new Error(
              "JSON response does not match with `PartnerEndingsMap` type",
            ),
          );
        }
      })
      .catch((err: Error) => {
        dispatch(endingsPartnerGetFailure(err));
      });
  };
}

export function endingsPartnerGetPending(): EndingsPartnerGetPendingAction {
  return {
    type: "ENDINGS_PARTNER_GET_PENDING",
  };
}

export function endingsPartnerGetSuccess(
  character: Character,
  partnerEndingsMap: PartnerEndingsMap,
): EndingsPartnerGetSuccessAction {
  return {
    type: "ENDINGS_PARTNER_GET_SUCCESS",
    payload: { character, partnerEndingsMap },
  };
}

export function endingsPartnerGetFailure(
  err: Error,
): EndingsPartnerGetFailureAction {
  return {
    type: "ENDINGS_PARTNER_GET_FAILURE",
    err,
  };
}

/* Reducer */

const initialState: EndingState = {
  endingsMap: {},
};

export function reducer(
  state: EndingState = initialState,
  action: Action,
): EndingState {
  switch (action.type) {
    case "ENDINGS_PARTNER_GET_SUCCESS": {
      const { character, partnerEndingsMap } = action.payload;
      return {
        ...state,
        endingsMap: {
          ...state.endingsMap,
          [character]: partnerEndingsMap,
        },
      };
    }
    default:
      return state;
  }
}

/* Selector */
export function selectPartners(
  state: State,
  ownProps: { character: Character },
): Character[] {
  const partnerEndingsMap = state.ending.endingsMap[ownProps.character];
  if (partnerEndingsMap == null) {
    return [];
  }

  return orderedCharacters.filter(
    (character: Character) => partnerEndingsMap[character] != null,
  );
}

export function selectPartnerEndings(
  state: State,
  ownProps: { characterA: Character; characterB: Character },
): PartnerEndings | undefined {
  const partnerEndings = state.ending.endingsMap[ownProps.characterA];
  if (partnerEndings == null) {
    return undefined;
  }

  return partnerEndings[ownProps.characterB];
}

/* Utils */
export function isRoute(o: unknown): o is Route {
  return (
    typeof o === "string" &&
    (o === "Crimson Flower" ||
      o === "Azure Moon" ||
      o === "Verdant Wind" ||
      o === "Silver Snow")
  );
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

export function isPartnerEndings(o: unknown): o is PartnerEndings {
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

    const { routes, content } = item;
    if (typeof content !== "string") {
      return false;
    }
    if (!(routes instanceof Array)) {
      return false;
    }
    for (const route of routes) {
      if (!isRoute(route)) {
        return false;
      }
    }
  }

  return true;
}

export function isPartnerEndingsMap(o: unknown): o is PartnerEndingsMap {
  if (typeof o !== "object") {
    return false;
  }
  if (o == null) {
    return false;
  }

  for (const key of Object.keys(o)) {
    if (!isCharacter(key)) {
      return false;
    }
    if (!isPartnerEndings(o[key])) {
      return false;
    }
  }

  return true;
}

export function getRoutesFromPartnerEndings(
  partnerEndings: PartnerEndings,
): Route[] {
  const availableRoutesMap = partnerEndings.reduce(
    (map: { [key in Route]?: boolean }, ending: Ending) => {
      for (const route of ending.routes) {
        map[route] = true;
      }

      return map;
    },
    {},
  );

  return orderedRoutes.filter((route: Route) => availableRoutesMap[route]);
}

export function getEndingContentForRoute(
  partnerEndings: PartnerEndings,
  route: Route,
): string | null {
  for (const ending of partnerEndings) {
    if (ending.routes.includes(route)) {
      return ending.content;
    }
  }

  return null;
}
