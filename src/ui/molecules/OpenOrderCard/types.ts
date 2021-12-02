import { ReactNode } from "react";

import { OrderCommon } from "@polkadex/orderbook/modules/types";

export type Props = {
  onCancel?: () => void;
} & OrderCommon;
