import { ThunkAction } from "redux-thunk";

import { Character } from "../character/type";
import { State } from "../type";

/* Entity */

export type Route =
  | "Crimson Flower"
  | "Azure Moon"
  | "Verdant Wind"
  | "Silver Snow";

export type Endings = Array<{
  ending: string;
  routes: Route[];
}>;

export type PartnerEndings = {
  [partner in Character]?: Endings;
};

/* Actions */
export type EndingsPartnerGetRequestAction = ThunkAction<
  void,
  State,
  null,
  | EndingsPartnerGetPendingAction
  | EndingsPartnerGetSuccessAction
  | EndingsPartnerGetFailureAction
>;

export type EndingsPartnerGetPendingAction = {
  type: "ENDINGS_PARTNER_GET_PENDING";
};

export type EndingsPartnerGetSuccessAction = {
  type: "ENDINGS_PARTNER_GET_SUCCESS";
  payload: {
    character: Character;
    partnerEndings: PartnerEndings;
  };
};

export type EndingsPartnerGetFailureAction = {
  type: "ENDINGS_PARTNER_GET_FAILURE";
  err: Error;
};

export type EndingAction =
  | EndingsPartnerGetPendingAction
  | EndingsPartnerGetSuccessAction
  | EndingsPartnerGetFailureAction;

/* State */

export type EndingState = {
  endingsMap: { [char in Character]?: PartnerEndings };
};
