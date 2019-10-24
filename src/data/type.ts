import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";

import { EndingAction, EndingState } from "./ending/type";

export type Action = EndingAction;

export interface State {
  ending: EndingState;
}

export type Dispatch = ReduxThunkDispatch<State, null, Action>;
