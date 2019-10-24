import {
  Endings,
  EndingsPartnerGetFailureAction,
  EndingsPartnerGetPendingAction,
  EndingsPartnerGetRequestAction,
  EndingsPartnerGetSuccessAction,
  EndingState,
  PartnerEndings,
  Route,
} from "./type";
import { orderedCharacters, isCharacter } from "../character";
import { Character } from "../character/type";
import { Action, State } from "../type";
import { slugify } from "../../utils/string";

/* Actions */
export function endingsPartnerGetRequest(
  character: Character,
): EndingsPartnerGetRequestAction {
  return async (dispatch): Promise<void> => {
    const characterSlug = slugify(character);
    dispatch(endingsPartnerGetPending());
    try {
      const { default: parsedJSON } = await import(
        `../../../json/${characterSlug}.json`
      );
      if (isPartnerEndings(parsedJSON)) {
        dispatch(endingsPartnerGetSuccess(character, parsedJSON));
      } else {
        throw new Error(
          "JSON response does not match with `PartnerEndings` type",
        );
      }
    } catch (err) {
      dispatch(endingsPartnerGetFailure(err));
    }
  };
}

export function endingsPartnerGetPending(): EndingsPartnerGetPendingAction {
  return {
    type: "ENDINGS_PARTNER_GET_PENDING",
  };
}

export function endingsPartnerGetSuccess(
  character: Character,
  partnerEndings: PartnerEndings,
): EndingsPartnerGetSuccessAction {
  return {
    type: "ENDINGS_PARTNER_GET_SUCCESS",
    payload: { character, partnerEndings },
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
      const { character, partnerEndings } = action.payload;
      return {
        ...state,
        endingsMap: {
          ...state.endingsMap,
          [character]: partnerEndings,
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
  const partnerEndings = state.ending.endingsMap[ownProps.character];
  if (partnerEndings == null) {
    return [];
  }

  return orderedCharacters.filter(
    (character: Character) => partnerEndings[character] != null,
  );
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

export function isEndings(o: unknown): o is Endings {
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

    const { routes, ending } = item;
    if (typeof ending !== "string") {
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

export function isPartnerEndings(o: unknown): o is PartnerEndings {
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
    if (!isEndings(o[key])) {
      return false;
    }
  }

  return true;
}
