import { ThunkAction } from "redux-thunk";

import { Character } from "../character/type";
import { State } from "../type";

/* Entity */

export type Route =
  | "Crimson Flower"
  | "Azure Moon"
  | "Verdant Wind"
  | "Silver Snow";

export type Ending = {
  content: string;
  routes: Route[];
};

export type PartnerEndings = Ending[];

export type PartnerEndingsMap = {
  [partner in Character]?: PartnerEndings;
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
    partnerEndingsMap: PartnerEndingsMap;
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
  endingsMap: { [char in Character]?: PartnerEndingsMap };
};
