import { FC, PropsWithChildren } from "react";

export type NotificationCategory = "General" | "Announcements";

export type NotificationPayload = {
  type: "Error" | "Information" | "Success" | "Loading" | "Attention";
  message: string;
  description: string;
  showToast?: boolean;
  category: NotificationCategory;
};

export interface Notification extends Omit<NotificationPayload, "showToast"> {
  id: string;
  date: number;
  active: boolean;
  category: NotificationCategory;
  href?: string;
}
export interface SettingState {
  chartRebuild: boolean;
  ordersHideOtherPairs: boolean;
  marketSelectorActive: boolean;
  theme: "light" | "dark";
  language: "en";
  currency: "USD" | "EUR" | "CNY" | "INR";
  notifications: Notification[];
  hasExtension?: boolean;
  connectExtension?: boolean;
  connectTrading?: boolean;
}

export type SettingProviderProps = PropsWithChildren<{
  value: SettingContextProps;
}>;

type ToastActions = {
  onError: (title: string, description?: string) => void;
  onSuccess: (title: string, description?: string) => void;
  onInfo?: (title: string, description?: string) => void;
};

export type SettingContextProps = SettingState & {
  onToggleChartRebuild: () => void;
  onToggleMarketSelector: () => void;
  onToggleOpenOrdersPairsSwitcher: (value: boolean) => void;
  onChangeTheme: (value: SettingState["theme"]) => void;
  onChangeLanguage: (value: SettingState["language"]) => void;
  onChangeCurrency: (value: SettingState["currency"]) => void;
  onPushNotification: (value: NotificationPayload) => void;
  onRemoveNotification: (value: Notification["id"]) => void;
  onReadNotification: (value: Notification["id"]) => void;
  onClearNotifications: () => void;
  onHandleError: ToastActions["onError"];
  onHandleAlert: ToastActions["onSuccess"];
  onHandleInfo: ToastActions["onInfo"];
  onToogleConnectExtension: (value?: boolean) => void;
  onToogleConnectTrading: (value?: boolean) => void;
};

export type SettingsProps = {
  defaultTheme?: SettingState["theme"];
  defaultLanguage?: SettingState["language"];
  defaultCurrency?: SettingState["currency"];
  defaultToast: ToastActions;
};

export type SettingComponent = FC<PropsWithChildren<SettingsProps>>;
