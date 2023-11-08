import { AppDispatch, AppState } from "../index";
import { Action, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

type AppThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;

export const logger: any =
  (store: { getState: () => AppState }) =>
  (next: AppDispatch) =>
  (action: AppThunkAction<void, AppState, unknown, AnyAction>) => {
    console.info("action=", action);
    // console.log("before", store.getState());
    const result = next(action);
    // console.log("after", store.getState());

    return result;
  };
