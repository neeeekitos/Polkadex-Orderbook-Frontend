import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { UserTrade, userTradesData, userTradesError } from "..";
import * as queries from "../../../../graphql/queries";

import { selectUserInfo, sendError } from "@polkadex/orderbook-modules";
import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";

export function* fetchTradesSaga() {
  try {
    const { address } = yield select(selectUserInfo);
    if (address) {
      const tradesRaw = yield call(fetchUserTrades, address, 1);
      const trades: UserTrade[] = tradesRaw.map((trade) => ({
        market_id: trade.m,
        price: trade.p,
        qty: trade.q,
        timestamp: new Date(trade.time).getTime(),
        baseAsset: trade.m.split("-")[0],
        quoteAsset: trade.m.split("-")[1],
      }));
      yield put(userTradesData(trades));
    }
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userTradesError,
        },
      })
    );
  }
}

type TradesDb = {
  main_account: string;
  m: string;
  p: string;
  q: string;
  time: string;
};

const fetchUserTrades = async (
  proxy_account: string,
  monthsBefore: number,
  limit = 10
): Promise<TradesDb> => {
  const fromDate = subtractMonths(monthsBefore);
  const res: any = await API.graphql({
    query: queries.listTradesByMainAccount,
    variables: {
      main_account: proxy_account,
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
      limit: limit,
    },
  });

  return res.data.listTradesByMainAccount.items;
};
