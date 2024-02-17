import { useMemo } from "react";
import { Ifilters } from "@orderbook/core/providers/types";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useInfiniteQuery } from "@tanstack/react-query";

import { decimalPlaces, getCurrentMarket } from "../helpers";
import {
  MIN_DIGITS_AFTER_DECIMAL,
  QUERY_KEYS,
  TRADE_HISTORY_PER_PAGE_LIMIT,
} from "../constants";
import { appsyncOrderbookService } from "../utils/orderbookService";
import { useSessionProvider } from "../providers/user/sessionProvider";

import { useMarkets } from "./useMarkets";

export function useTradeHistory(
  defaultMarket: string,
  rowsPerPage: number,
  filters: Ifilters
) {
  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();
  const { dateFrom, dateTo } = useSessionProvider();
  const { list: markets } = useMarkets();
  const currentMarket = getCurrentMarket(markets, defaultMarket);

  const userLoggedIn = tradeAddress !== "";

  const shouldFetchTradeHistory = Boolean(
    userLoggedIn && currentMarket && tradeAddress
  );

  const {
    data,
    fetchNextPage: onFetchNextPage,
    isLoading: fetching,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.tradeHistory(
      dateFrom,
      dateTo,
      tradeAddress,
      rowsPerPage
    ),
    enabled: shouldFetchTradeHistory,
    queryFn: async ({ pageParam = null }) => {
      return await appsyncOrderbookService.query.getTradeHistory({
        address: tradeAddress,
        from: dateFrom,
        to: dateTo,
        pageParams: pageParam,
        limit: TRADE_HISTORY_PER_PAGE_LIMIT,
        batchLimit: rowsPerPage,
      });
    },
    getNextPageParam: (lastPage) => {
      // If the last page contains nextToken as null, don't fetch the next page
      if (!lastPage.nextToken) {
        return false;
      }
      return lastPage.nextToken;
    },
  });

  const list = useMemo(() => {
    const tradeHistory = data?.pages?.flatMap((page) => page.data) ?? [];
    return tradeHistory.sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime();
      const timestampB = new Date(b.timestamp).getTime();
      return timestampB - timestampA;
    });
  }, [data?.pages]);

  const updatedTradeList = useMemo(() => {
    let tradeHistoryList = list.filter((item) => !item.isReverted);

    if (filters?.showReverted) {
      tradeHistoryList = list.filter((item) => item.isReverted);
    }

    if (filters?.onlyBuy) {
      tradeHistoryList = tradeHistoryList.filter(
        (data) => data.side?.toUpperCase() === "BID"
      );
    } else if (filters?.onlySell) {
      tradeHistoryList = tradeHistoryList.filter(
        (data) => data.side.toUpperCase() === "ASK"
      );
    }

    return tradeHistoryList;
  }, [filters?.onlyBuy, filters?.onlySell, filters?.showReverted, list]);

  const priceFixed = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const amountFixed = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  return {
    trades: updatedTradeList,
    priceFixed,
    amountFixed,
    isLoading: fetching,
    hasNextPage,
    error: error as string,
    onFetchNextPage,
  };
}
