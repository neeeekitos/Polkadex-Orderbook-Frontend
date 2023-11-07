export type BalanceUpdateEvent = {
  stid: number;
  asset: { asset: string } & string;
  free: string;
  user: string;
  pending_withdrawal: string;
  reserved: string;
};
export type OrderUpdateEvent = {
  stid: number;
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
};
interface Pair {
  base: {
    asset: number;
  };
  quote: {
    asset: number;
  };
}
export type UserTradeEvent = {
  m: string;
  p: string;
  q: string;
  t: number;
  tid: number;
};
export type TradeEvent = {
  m: string;
  p: string;
  q: string;
  t: number;
};
export type BookUpdateEvent = {
  i: number;
  m: string;
  b: Record<string, string>;
  a: Record<string, string>;
};
