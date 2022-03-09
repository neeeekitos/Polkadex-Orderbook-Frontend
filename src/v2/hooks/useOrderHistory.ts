import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  selectCurrentMarket,
  selectOrdersHistory,
  userOrdersHistoryFetch,
  selectHasUser,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useOrderHistory() {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectOrdersHistory);

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectHasUser);

  useEffect(() => {
    if (userLoggedIn && currentMarket) dispatch(userOrdersHistoryFetch());
  }, [userLoggedIn, currentMarket, dispatch]);

  return {
    orders: list,
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
  };
}
