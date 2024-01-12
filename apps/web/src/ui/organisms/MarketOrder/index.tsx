import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import {
  Dropdown,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  MarketOrderAction,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { tryUnlockTradeAccount } from "@orderbook/core/helpers";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";
import { useConnectWalletProvider } from "@/providers/connectWalletProvider/useConnectWallet";

type FormValues = {
  priceSell: string;
  priceBuy: string;
  amountSell: string;
  amountBuy: string;
  totalBuy: string;
  totalSell: string;
};

type Props = {
  market: string;
};

export const MarketOrder = ({ market }: Props) => {
  const [isLimit, setIsLimit] = useState(true);
  const { selectedAccount } = useConnectWalletProvider();
  const handleChangeType = (value: boolean) => setIsLimit(value);
  const orderType = isLimit ? "Limit" : "Market";

  const { t: translation, "2": isReady } = useTranslation("organisms");
  const t = (key: string) => translation(`marketOrder.${key}`);

  const initialValues: FormValues = useMemo(() => {
    return {
      priceSell: "",
      priceBuy: "",
      amountSell: "",
      amountBuy: "",
      totalBuy: "",
      totalSell: "",
    };
  }, []);

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: () => {},
  });

  useEffect(() => {
    tryUnlockTradeAccount(selectedAccount);
  }, [selectedAccount]);

  return (
    <S.Section>
      {!isReady ? (
        <MarketSkeleton />
      ) : (
        <Tabs>
          <S.Header>
            <S.HeaderWrapper>
              <TabHeader>
                <S.ActionItem isActive>{t("buy")}</S.ActionItem>
              </TabHeader>
              <TabHeader>
                <S.ActionItem>{t("sell")}</S.ActionItem>
              </TabHeader>
            </S.HeaderWrapper>
            <Dropdown>
              <Dropdown.Trigger>
                <S.DropdownTrigger>
                  {isLimit ? t("limitOrder") : t("marketOrder")}{" "}
                  <Icons.ArrowBottom />
                </S.DropdownTrigger>
              </Dropdown.Trigger>
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                <Dropdown.Item
                  key="limit"
                  onAction={() => handleChangeType(true)}
                >
                  {t("limitOrder")}
                </Dropdown.Item>
                <Dropdown.Item
                  key="market"
                  onAction={() => handleChangeType(false)}
                >
                  {t("marketOrder")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </S.Header>
          <S.Content>
            <TabContent>
              <MarketOrderAction
                isLimit={isLimit}
                orderType={orderType}
                formik={formik}
                market={market}
              />
            </TabContent>
            <TabContent>
              <MarketOrderAction
                isSell
                isLimit={isLimit}
                orderType={orderType}
                formik={formik}
                market={market}
              />
            </TabContent>
          </S.Content>
        </Tabs>
      )}
    </S.Section>
  );
};
export const MarketSkeleton = () => (
  <Skeleton
    style={{ marginTop: 10 }}
    height={normalizeValue(40)}
    width="100%"
    minWidth="350px"
  />
);
