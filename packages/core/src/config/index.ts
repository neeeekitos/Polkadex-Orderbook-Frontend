import { DefaultConfig } from ".";
export * from "./types";

export const defaultConfig: DefaultConfig = {
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: process.env.POLKADEX_CHAIN || "wss://mainnet.polkadex.trade",
  gaTrackerKey: process.env.GA_MEASUREMENT_ID ?? "G-PWZK8JEFLX",
  landingPageMarket: process.env.LANDING_PAGE || "PDEXCUSDT",
  withCredentials: false,
  incrementalOrderBook: false,
  orderBookSideLimit: 25,
  defaultStorageLimit: 100,
  defaultTradingViewInterval: 5,
  sessionCheckInterval: 15000,
  balancesFetchInterval: 3000,
  minutesUntilAutoLogout: 120,
  alertDisplayTime: 5000,
  msPricesUpdates: 1000,
  maintenanceMode: process.env.MAINTENACE_MODE === "true",
  signUpDisabled: process.env.SIGNUP_DISABLED === "true",
  reconnectRangerTime: 30000,
  showShutdownPopup: process.env.SHOW_SHUTDOWN_POPUP === "true",
  availableRoutes: [
    "/trading",
    "/balances",
    "/codeVerification",
    "/createAccount",
    "/deposit",
    "/recovery",
    "/resetPassword",
    "/resetPasswordForm",
    "/settings",
    "/sign",
    "/signIn",
    "/withdraw",
    "/transfer",
  ],
  underMaintenance: process.env.UNDER_MAINTENACE?.split(",") ?? [],
  mainUrl: process.env.MAIN_URL || "/trading",
  blockedAssets: process.env.BLOCKED_ASSETS?.split(",") ?? [],
};
