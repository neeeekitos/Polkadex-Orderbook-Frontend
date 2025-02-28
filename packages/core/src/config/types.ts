export type DefaultConfig = {
  polkadexFeature?: string;
  polkadexChain: string[];
  gaTrackerKey: string;
  landingPageMarket: string;
  incrementalOrderBook: boolean;
  orderBookSideLimit: number;
  defaultStorageLimit: number;
  defaultTradingViewInterval: number;
  sessionCheckInterval: number;
  balancesFetchInterval: number;
  minutesUntilAutoLogout: number;
  alertDisplayTime: number;
  msPricesUpdates: number;
  maintenanceMode: boolean;
  enableLmp: boolean;
  availableRoutes: string[];
  underMaintenance: string[];
  mainUrl: string;
  blockedAssets: string[];
  subscanApi: string;
};
