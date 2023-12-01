import { Fragment, ReactNode, isValidElement, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {
  Dropdown,
  Icon,
  NotificationsContent,
  PolkadexLogo,
  Popover,
} from "@polkadex/orderbook-ui/molecules";
import {
  useSettingsProvider,
  selectNotifications,
} from "@orderbook/core/providers/public/settings";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  useProfile,
  transformAddress,
} from "@orderbook/core/providers/user/profile";
import {
  getTradeAccount,
  useTradeWallet,
} from "@orderbook/core/providers/user/tradeWallet";
import { useRouter } from "next/router";

import * as S from "./styles";
import { Profile } from "./profile";

import { ConnectWalletInteraction } from "@/ui/templates/ConnectWalletInteraction";

export const Header = ({
  dark = false,
  children,
}: {
  children?: ReactNode;
  dark?: boolean;
}) => {
  const { notifications } = useSettingsProvider();
  const allNotifications = selectNotifications(notifications);
  const { allBrowserAccounts } = useTradeWallet();

  const tradingAccounts = allBrowserAccounts;
  const {
    authInfo: { isAuthenticated },
    selectedAccount,
  } = useProfile();

  const tradeAccountInfo = useMemo(
    () => getTradeAccount(selectedAccount.tradeAddress, tradingAccounts),
    [selectedAccount.tradeAddress, tradingAccounts]
  );

  const walletName = tradeAccountInfo?.meta?.name as string;
  const addressName =
    tradeAccountInfo &&
    ` • ${
      tradeAccountInfo ? transformAddress(tradeAccountInfo.address, 5) : ""
    }`;

  const isValidChild = isValidElement(children);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`header.${key}`);

  const router = useRouter();
  const { locales, locale } = router;
  const [state, setState] = useState(false);

  return (
    <Fragment>
      <ConnectWalletInteraction open={state} onChange={setState} />
      <S.Wrapper dark={dark}>
        <S.Content>
          <S.Logo borderActive={isValidChild} hideLogo>
            <Link href="/">
              <PolkadexLogo />
            </Link>
            <span>BETA</span>
          </S.Logo>
          <S.ContentFull>{children}</S.ContentFull>
        </S.Content>
        <S.Actions>
          <S.ActionsWrapper>
            <Dropdown>
              <Dropdown.Trigger>
                <S.Flex>
                  <span>{locale?.toUpperCase()}</span>
                  <Icon name="ArrowBottom" />
                </S.Flex>
              </Dropdown.Trigger>
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                {(locales as string[])?.map((value) => {
                  const { pathname, query, asPath } = router;
                  return (
                    <Dropdown.Item key={value}>
                      <Link
                        href={{ pathname, query }}
                        as={asPath}
                        locale={value}
                      >
                        {value?.toUpperCase()}
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </S.ActionsWrapper>
          <S.ActionsWrapper>
            <Popover>
              <Popover.Trigger>
                <S.NotificationsActive
                  isActive={!!notifications?.find((value) => !value.active)}
                >
                  <Icons.Notifications />
                  <div />
                </S.NotificationsActive>
              </Popover.Trigger>
              <Popover.Content>
                <NotificationsContent notifications={allNotifications} />
              </Popover.Content>
            </Popover>
          </S.ActionsWrapper>
          <S.AccountContainer>
            <Profile onClick={() => setState(true)} />
          </S.AccountContainer>
        </S.Actions>
      </S.Wrapper>
    </Fragment>
  );
};
