import * as S from "./styles";

import { Icon, TabContent, TabHeader, Tabs } from "src/ui/components";
import { AssetInfo } from "src/ui/molecules";
import { OrderForm } from "src/ui/organisms";
import { usePlaceOrder } from "./usePlaceOrder";

export const PlaceOrder = () => {
  const {currentMarket} = usePlaceOrder();

  
  const handleBuyOrderClick = () => {
    console.log(currentMarket);
  }

  return (
    <S.Wrapper>
      <Tabs>
        <h2>Place Order</h2>
        <S.Header>
          <TabHeader>
            <S.TabHeader role="button"> Buy </S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isSell={true}> Sell </S.TabHeader>
          </TabHeader>
        </S.Header>
        <S.Content>
          <TabContent>
            <OrderForm />
          </TabContent>
          <TabContent>
            <OrderForm />
          </TabContent>
        </S.Content>
        <S.Footer>
          <S.FooterTitle>
            <h2>Assets</h2>
            <a href="/">
              Buy
              <Icon icon="ArrowRight" size="xxsmall" />
            </a>
          </S.FooterTitle>
          <div>
            <S.FooterActions>
              <button
                type="button"
                onClick={handleBuyOrderClick}
              >
                Transfer
              </button>
            </S.FooterActions>
            <div>
              <AssetInfo />
              <AssetInfo />
            </div>
          </div>
        </S.Footer>
      </Tabs>
    </S.Wrapper>
  );
};
