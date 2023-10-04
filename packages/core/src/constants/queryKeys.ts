import { Maybe } from "@orderbook/core/helpers";

const PREFIX = "@orderbook";
export const QUERY_KEYS = {
  blockchainTransfers: (id: Maybe<string>) => [
    PREFIX,
    "blockchainTransfers",
    id,
  ],
  assets: () => [PREFIX, "assets"],
  recentTrades: (market: string) => [PREFIX, "recentTrades", market],
  orderBook: (market: string) => [PREFIX, "orderbook", market],
  miniGraph: (market: string) => [PREFIX, `mini-graph-${market}`],
};
