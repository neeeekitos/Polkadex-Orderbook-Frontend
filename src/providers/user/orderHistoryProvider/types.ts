import { OrderCommon } from "@polkadex/orderbook/modules/types";
import { PropsWithChildren } from "react";

export interface SetOrder {
  event_id: number;
  client_order_id: string;
  avg_filled_price: number;
  fee: number;
  filled_quantity: number;
  status: string;
  id: number;
  user: string;
  pair: Pair;
  side: string;
  order_type: string;
  qty: number;
  price: number;
  timestamp: number;
}
interface Pair {
  base_asset: string & OtherAsset;
  quote_asset: string & OtherAsset;
}
interface OtherAsset {
  asset: number;
}
export interface OrdersHistoryState {
  list: OrderCommon[];
  openOrders: OrderCommon[];
  loading: boolean;
  pageIndex: number;
  success: boolean;
}

interface orderHistoryFetchProps {
  dateFrom: Date;
  dateTo: Date;
  tradeAddress: string;
}

export interface onOrdersHistoryFetch {
  dateFrom: Date;
  dateTo: Date;
  tradeAddress: string;
}

export type OrderHistoryContextProps = OrdersHistoryState & {
  onOpenOrdersHistoryFetch: () => void;
  onOrdersHistoryFetch: (value: onOrdersHistoryFetch) => void;
};

export type OrderHistoryProviderProps = PropsWithChildren<{
  value: OrderHistoryContextProps;
}>;
