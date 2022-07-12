import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectHasUser,
  selectTransactionData,
  transactionsFetch,
} from "@polkadex/orderbook-modules";

export function useHistory() {
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const dispatch = useDispatch();

  const getAsset = useReduxSelector(selectGetAsset);
  const userLoggedIn = useReduxSelector(selectHasUser);
  const transactionsHistory = useReduxSelector(selectTransactionData);

  const transactionHistory = useMemo(() => {
    const transactionsBydate = transactionsHistory?.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    const transactions = transactionsBydate?.reduce((pv, cv) => {
      if (
        cv.main_account.toLowerCase().includes(filterBy.fieldValue.toLowerCase()) &&
        (filterBy.type === "" ||
          filterBy.type === cv.txn_type.toLowerCase() ||
          filterBy.type === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, []);
    return transactions;
  }, [filterBy, transactionsHistory]);

  useEffect(() => {
    if (userLoggedIn) dispatch(transactionsFetch());
  }, [userLoggedIn, dispatch]);

  return {
    filterByType: filterBy.type,
    onChangeFilterByType: (value: string) => setFilterBy({ ...filterBy, type: value }),
    search: filterBy.fieldValue,
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) =>
      setFilterBy({ ...filterBy, fieldValue: e.target.value }),
    transactionHistory,
    getAsset,
  };
}
