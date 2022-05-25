import { BalancesAction, Balance } from "./actions";
import {
  BALANCES_CHANNEL_UPDATE_DATA,
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
} from "./constants";

export interface BalancesState {
  error?: string;
  loading: boolean;
  success: boolean;
  balances: Balance[];
  timestamp?: number;
}

const initialState: BalancesState = {
  loading: false,
  success: false,
  balances: [],
};

export const balancesReducer = (
  state = initialState,
  action: BalancesAction
): BalancesState => {
  switch (action.type) {
    case BALANCES_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case BALANCES_DATA:
      return {
        ...state,
        balances: action.payload.balances,
        timestamp: action.payload.timestamp,
        loading: false,
        success: true,
      };
    case BALANCES_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    case BALANCES_CHANNEL_UPDATE_DATA: {
      const updates = action.payload;
      // filter out old balances from the balance state
      const balanceFiltered = state.balances.filter((balance) =>
        updates.some((update) => update.asset_type === balance.asset_type)
      );
      // apply updates to the balances in the state
      const newBalances = [...balanceFiltered, ...updates];
      return {
        ...state,
        balances: newBalances,
      };
    }
    default:
      return state;
  }
};
