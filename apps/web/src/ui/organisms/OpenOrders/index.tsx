import { useTranslation } from "react-i18next";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { OrderCommon } from "@orderbook/core/providers/types";
import { EmptyData, OpenOrderCard } from "@polkadex/orderbook-ui/molecules";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useMarketsProvider } from "@orderbook/core/providers/public/marketsProvider";

import * as S from "./styles";

export const OpenOrders = ({ orderHistory }) => {
  const { openOrders } = orderHistory;
  const { currentMarket } = useMarketsProvider();
  const priceFixed = currentMarket?.quote_precision;
  const amountFixed = currentMarket?.base_precision;

  const { selectGetAsset } = useAssetsProvider();

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`openOrders.${key}`);

  return (
    <S.Wrapper>
      {openOrders?.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>{t("pair")}</S.Th>
              <S.Th>{t("date")}</S.Th>
              <S.Th>{t("type")}</S.Th>
              <S.Th>{t("price")}</S.Th>
              <S.Th>{t("total")}</S.Th>
              <S.Th>{t("filled")}</S.Th>
              <S.Th />
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {openOrders &&
              openOrders.map((order: OrderCommon, i) => {
                const [base, quote] = order.m.split("-");
                const date = new Date(order.time).toLocaleString();
                const isSell = order.side === "Ask";
                const isMarket = order.order_type === "MARKET";
                const baseUnit = selectGetAsset(base)?.symbol;
                const quoteUnit = selectGetAsset(quote)?.symbol;
                const avgPrice = order.avg_filled_price;
                return (
                  <OpenOrderCard
                    key={i}
                    isSell={isSell}
                    orderId={order.id}
                    base={base}
                    quote={quote}
                    orderType={order.order_type}
                    baseUnit={baseUnit}
                    quoteUnit={quoteUnit}
                    data={[
                      { value: date },
                      { value: order.order_type },
                      { value: order.status },
                      {
                        value: isMarket
                          ? "-"
                          : Decimal.format(
                              order.price,
                              Number(priceFixed),
                              ",",
                            ),
                      },
                      {
                        value: Decimal.format(
                          order.qty,
                          Number(amountFixed),
                          ",",
                        ),
                      },
                      {
                        value: Decimal.format(
                          order.filled_quantity,
                          Number(amountFixed),
                          ",",
                        ),
                      },
                      {
                        value: Decimal.format(
                          avgPrice,
                          Number(priceFixed),
                          ",",
                        ),
                      },
                    ]}
                  />
                );
              })}
          </S.Tbody>
        </S.Table>
      ) : (
        <S.EmptyWrapper>
          <EmptyData />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  );
};
