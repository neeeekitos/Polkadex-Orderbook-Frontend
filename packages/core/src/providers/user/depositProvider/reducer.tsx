import { DepositsAction } from "./actions";
import {
  DEPOSITS_DATA,
  DEPOSITS_ERROR,
  DEPOSITS_FETCH,
  DEPOSITS_RESET,
} from "./constants";
import { DepositsState } from "./types";

export const initialState: DepositsState = {
  loading: false,
  success: false,
};

export const depositsReducer = (
  state = initialState,
  action: DepositsAction
) => {
  switch (action.type) {
    case DEPOSITS_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case DEPOSITS_DATA:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DEPOSITS_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    case DEPOSITS_RESET:
      return initialState;

    default:
      return state;
  }
};
