import _ from "lodash";
import { ChangeEvent, useMemo, useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";

import { QUERY_KEYS } from "../constants";
import {
  appsyncOrderbookService,
  Transaction,
} from "../utils/orderbookService";
import {
  groupWithdrawsBySnapShotIds,
  subtractMonthsFromDateOrNow,
} from "../helpers";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

const DEPOSIT = "DEPOSIT";

export function useTransactions() {
  const queryClient = useQueryClient();
  const { isReady } = useOrderbookService();
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { onHandleError } = useSettingsProvider();

  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const { data: transactions, isLoading } = useQuery({
    queryKey: QUERY_KEYS.transactions(mainAddress),
    queryFn: async () => {
      const fromDate = subtractMonthsFromDateOrNow(3);
      return await appsyncOrderbookService.query.getTransactions({
        address: mainAddress,
        limit: 100000,
        from: fromDate,
        to: new Date(),
        pageParams: null,
      });
    },
    enabled: Boolean(mainAddress?.length > 0),
    onError: onHandleError,
  });

  const transactionHistory: Transaction[] = useMemo(() => {
    const transactionsBydate =
      transactions?.data?.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
      ) ?? [];
    const txs = transactionsBydate?.reduce((pv: Transaction[], cv) => {
      if (
        mainAddress.toLowerCase().includes(filterBy.fieldValue.toLowerCase()) &&
        (filterBy.type === "" ||
          filterBy.type === cv.txType.toLowerCase() ||
          filterBy.type === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, []);
    return txs;
  }, [filterBy, transactions, mainAddress]);

  const deposits = useMemo(
    () => transactionHistory?.filter((txn) => txn.txType === DEPOSIT),
    [transactionHistory]
  );

  const withdrawalsList = useMemo(
    () => transactionHistory?.filter((txn) => txn.txType !== DEPOSIT),
    [transactionHistory]
  );

  const readyWithdrawals = useMemo(
    () => groupWithdrawsBySnapShotIds(withdrawalsList),
    [withdrawalsList]
  );

  const onTransactionsUpdate = useCallback(
    (payload: Transaction) => {
      try {
        if (payload) {
          queryClient.setQueryData(
            QUERY_KEYS.transactions(mainAddress),
            (oldData) => {
              const transactions = _.cloneDeep(oldData as Transaction[]);
              const index = transactions.findIndex(
                ({ stid }) => Number(stid) === Number(payload.stid)
              );
              if (index !== -1) {
                transactions[index] = payload;
              } else {
                transactions.push(payload);
              }
              return transactions;
            }
          );
        }
      } catch (error) {
        onHandleError("Something has gone wrong while updating transactions");
      }
    },
    [mainAddress, onHandleError, queryClient]
  );

  useEffect(() => {
    if (mainAddress && isReady) {
      const subscription =
        appsyncOrderbookService.subscriber.subscribeTransactions(
          mainAddress,
          onTransactionsUpdate
        );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onTransactionsUpdate, isReady]);

  return {
    loading: isLoading,
    allWithdrawals: withdrawalsList,
    readyWithdrawals,
    deposits,

    onChangeFilterByType: (value: string) =>
      setFilterBy({ ...filterBy, type: value }),
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) =>
      setFilterBy({ ...filterBy, fieldValue: e.target.value }),
  };
}
