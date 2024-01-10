import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Typography,
  truncateString,
  Icons,
  Popover,
  Authorization,
  HoverCard,
  Multistep,
} from "@polkadex/ux";
import { useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  ExtensionAccount,
  useExtensionAccounts,
  useExtensions,
} from "@polkadex/react-providers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { Profile as ProfileDropdown } from "../../templates/ConnectWallet/profile";

import { NewTradingAccount } from "@/ui/templates/ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "@/ui/templates/ConnectWallet/connectTradingAccount";
import { UserActions } from "@/ui/templates/ConnectWallet/userActions";
import { RemoveTradingAccount } from "@/ui/templates/ConnectWallet/removeTradingAccount";
import { ImportTradingAccount } from "@/ui/templates/ConnectWallet/importTradingAccount";
import { TradingAccountSuccessfull } from "@/ui/templates/ConnectWallet/tradingAccountSuccessfull";
import { TradingAccountMnemonic } from "@/ui/templates/ConnectWallet/tradingAccountMnemonic";
import { useConnectWalletProvider } from "@/providers/connectWalletProvider/useConnectWallet";
import { ConnectExtensionAccount } from "@/ui/templates/ConnectWallet/connnectExtensionAccount";
import { FundAccount } from "@/ui/templates/ConnectWallet/fundAccount";
import { TradingAccountList } from "@/ui/templates/ConnectWallet/tradingAccountList";
import { MaximumTradingAccount } from "@/ui/templates/ConnectWallet/maximumTradingAccount";
import { InsufficientBalance } from "@/ui/templates/ConnectWallet/insufficientBalance";
import { UnlockBrowserAccount } from "@/ui/templates/ConnectWallet/unlockBrowserAccount";

export const Profile = ({
  onClick,
  showFundingWallet,
}: {
  onClick: () => void;
  showFundingWallet: boolean;
}) => {
  const {
    selectedWallet,
    onSelectTradingAccount,
    selectedAccount,
    onLogout,
    localTradingAccounts,
    onSetTempTrading,
    onRegisterTradeAccount,
    selectedExtension,
    registerError,
    walletBalance,
    registerStatus,
    tempTrading,
    onRemoveTradingAccountFromChain,
    onRemoveTradingAccountFromDevice,
    removingStatus,
    removingError,
    onImportFromFile,
    importFromFileStatus,
    proxiesAccounts,
    tempMnemonic,
    onExportTradeAccount,
    onSelectExtension,
    mainProxiesAccounts,
    onResetTempTrading,
  } = useConnectWalletProvider();
  const sourceId = selectedExtension?.id;
  const { onToogleConnectExtension } = useSettingsProvider();
  const { extensionsStatus } = useExtensions();
  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();
  const { selectedAddresses } = useProfile();
  const { mainAddress } = selectedAddresses;
  const shortAddress = useMemo(
    () => truncateString(selectedAccount?.address ?? "", 3),
    [selectedAccount?.address]
  );

  const tradingWalletPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );
  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

  const selectedFundingWallet = useMemo(
    () =>
      selectedWallet ||
      ({
        name: "Wallet not present",
        address: mainAddress,
      } as ExtensionAccount),
    [selectedWallet, mainAddress]
  );

  const walletsFiltered = useMemo(
    () => extensionAccounts?.filter(({ source }) => source === sourceId),
    [extensionAccounts, sourceId]
  );

  const isPresent = useMemo(
    () =>
      extensionAccounts?.some(
        (account) => account.address === selectedFundingWallet.address
      ),
    [extensionAccounts, selectedFundingWallet.address]
  );

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter(
        (item) => mainProxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, mainProxiesAccounts]
  );

  const redirectMaximumAccounts =
    (mainProxiesAccounts?.length ?? 0) >= 3
      ? "MaximumTradingAccount"
      : "NewTradingAccount";

  const redirectEnoughBalance =
    (walletBalance ?? 0) >= 1 ? redirectMaximumAccounts : "InsufficientBalance";

  const availableOnDevice = useMemo(
    () =>
      filteredAccounts?.some((value) => value.address === tempTrading?.address),
    [tempTrading?.address, filteredAccounts]
  );

  if (tradingWalletPresent || fundWalletPresent)
    return (
      <Popover>
        <Popover.Trigger className="bg-level-1 transition-colors duration-300 flex items-center gap-2 rounded-md">
          {showFundingWallet && (
            <HoverCard>
              <HoverCard.Trigger>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4">
                    <Icons.Avatar />
                  </div>
                  {fundWalletPresent ? (
                    <Typography.Text size="xs" bold>
                      {selectedWallet?.name}
                    </Typography.Text>
                  ) : (
                    <Typography.Text size="xs" bold variant="secondary">
                      Wallet not present
                    </Typography.Text>
                  )}
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content
                side="left"
                withArrow={true}
                className="bg-level-5"
              >
                Funding wallet
              </HoverCard.Content>
            </HoverCard>
          )}
          <div className="flex items-center gap-2 bg-level-4 px-2 py-1 rounded-md">
            {tradingWalletPresent ? (
              <Typography.Text size="xs" bold>
                {selectedAccount?.meta.name} ({shortAddress})
              </Typography.Text>
            ) : (
              <Typography.Text size="xs" bold variant="primary">
                No trading account
              </Typography.Text>
            )}

            <ChevronDownIcon className="h-3 w-3" />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Multistep.Interactive className="h-auto overflow-auto max-h-screen">
            {(props) => (
              <>
                <Multistep.Trigger>
                  <ProfileDropdown
                    onCreateTradingAccount={() =>
                      props?.onPage(redirectEnoughBalance, true)
                    }
                    onImportTradingAccount={() =>
                      props?.onPage("ConnectTradingAccount", true)
                    }
                    onSelectTradingAccount={(tradeAddress) =>
                      onSelectTradingAccount({ tradeAddress })
                    }
                    onSwitch={() => {
                      onToogleConnectExtension();
                      onLogout?.();
                    }}
                    onLogout={() => onLogout?.()}
                    onActions={() => props?.onPage("UserActions", true)}
                    onRemove={(e) => {
                      onSetTempTrading?.(e);
                      props?.onPage("RemoveTradingAccount", true);
                    }}
                    tradingWalletPresent={!!selectedAccount?.address}
                    fundWalletPresent={fundWalletPresent}
                    fundWallet={selectedFundingWallet}
                    tradeAccount={selectedAccount}
                    localTradingAccounts={localTradingAccounts}
                    onConnectWallet={() => props?.onPage("ConnectWallet", true)}
                  />
                </Multistep.Trigger>
                <Multistep.Content>
                  <NewTradingAccount
                    key="NewTradingAccount"
                    onCreateAccount={async (e) =>
                      await onRegisterTradeAccount?.({
                        ...e,
                        main: selectedWallet?.address as string,
                      })
                    }
                    loading={registerStatus === "loading"}
                    fundWalletPresent={
                      !!Object.keys(selectedWallet ?? {})?.length
                    }
                    errorTitle="Error"
                    errorMessage={
                      (registerError as Error)?.message ?? registerError
                    }
                    selectedExtension={selectedExtension}
                    balance={walletBalance}
                    onCreateCallback={() =>
                      props?.onPage("TradingAccountSuccessfull", true)
                    }
                    onClose={() => props?.onChangeInteraction(false)}
                  />
                  <UnlockBrowserAccount
                    key="UnlockBrowserAccount"
                    tempBrowserAccount={tempTrading}
                    onClose={() => props?.onPage("ConnectTradingAccount")}
                    onAction={(account) => onExportTradeAccount({ account })}
                    onResetTempBrowserAccount={onResetTempTrading}
                  />
                  <ConnectTradingAccount
                    key="ConnectTradingAccount"
                    accounts={filteredAccounts as TradeAccount[]}
                    onSelect={(e) => {
                      onSelectTradingAccount?.({ tradeAddress: e.address });
                    }}
                    onClose={() => props?.onChangeInteraction(false)}
                    onImport={() => props?.onPage("ImportTradingAccount")}
                    onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
                    onSelectCallback={() => props?.onChangeInteraction(false)}
                    onRemoveCallback={() =>
                      props?.onPage("RemoveTradingAccount")
                    }
                    onExportBrowserAccount={(account) =>
                      onExportTradeAccount({ account })
                    }
                    onExportBrowserAccountCallback={() =>
                      props?.onPage("UnlockBrowserAccount")
                    }
                  />
                  <UserActions
                    key="UserActions"
                    onClose={() => props?.onChangeInteraction(false)}
                    onNewTradingAccount={() =>
                      props?.onPage("NewTradingAccount")
                    }
                    onImportTradingAccount={() =>
                      props?.onPage("ConnectTradingAccount")
                    }
                    fundWalletIsPresent={isPresent}
                    onTradingAccountList={() =>
                      props?.onPage("TradingAccountList")
                    }
                  />
                  <TradingAccountList
                    key="TradingAccountList"
                    tradingAccounts={mainProxiesAccounts}
                    onRemove={(e) => onSetTempTrading?.(e)}
                    onClose={() => props?.onChangeInteraction(false)}
                    onRemoveCallback={() =>
                      props?.onPage("RemoveTradingAccount")
                    }
                  />
                  <RemoveTradingAccount
                    key="RemoveTradingAccount"
                    tradingAccount={tempTrading as TradeAccount}
                    fundWallet={selectedWallet}
                    availableOnDevice={availableOnDevice}
                    onRemoveFromDevice={() =>
                      onRemoveTradingAccountFromDevice?.(
                        tempTrading?.address as string
                      )
                    }
                    onRemoveFromChain={async () =>
                      await onRemoveTradingAccountFromChain?.({
                        proxy: tempTrading?.address as string,
                        main: selectedWallet?.address as string,
                      })
                    }
                    loading={removingStatus === "loading"}
                    errorTitle="Error"
                    errorMessage={
                      (removingError as Error)?.message ?? removingError
                    }
                    selectedExtension={selectedExtension}
                    onCancel={() => props?.onChangeInteraction(false)}
                  />
                  <ImportTradingAccount
                    key="ImportTradingAccount"
                    onImport={async (e) => await onImportFromFile?.(e)}
                    onRedirect={() => props?.onPage("ConnectTradingAccount")}
                    onClose={() => props?.onPage("ConnectTradingAccount")}
                    loading={importFromFileStatus === "loading"}
                    whitelistBrowserAccounts={proxiesAccounts}
                  />
                  <TradingAccountSuccessfull
                    key="TradingAccountSuccessfull"
                    tradingAccount={selectedAccount}
                    onClose={() => props?.onChangeInteraction(false)}
                    onOpenMnemonic={() =>
                      props?.onPage("TradingAccountMnemonic", true)
                    }
                    onDownloadPdf={() => window.alert("Downloading...")}
                    onDownloadJson={(e) =>
                      onExportTradeAccount?.({ account: e })
                    }
                  />
                  <TradingAccountMnemonic
                    key="TradingAccountMnemonic"
                    onClose={() =>
                      props?.onPage("TradingAccountMnemonic", true)
                    }
                    mnemonic={tempMnemonic?.split(" ") ?? []}
                  />
                  <ConnectExtensionAccount
                    key="ConnectWallet"
                    installedExtensions={extensionsStatus}
                    onConnectProvider={(e) => onSelectExtension?.(e)}
                    onClose={() => props?.onChangeInteraction(false)}
                    onConnectCallback={() =>
                      props?.onPage("Authorization", true)
                    }
                  />
                  <Authorization
                    key="ConnectAuthorization"
                    onAction={async () =>
                      await connectExtensionAccounts(
                        selectedExtension?.id as string
                      )
                    }
                    extensionIcon={selectedExtension?.id as string}
                    extensionName={selectedExtension?.title}
                    onActionCallback={() => props?.onPage("FundAccount")}
                    onClose={props?.onReset}
                  />
                  <FundAccount
                    key="FundAccount"
                    extensionAccounts={walletsFiltered}
                    selectdAccount={selectedFundingWallet}
                    onClose={() => props?.onChangeInteraction(false)}
                    isPresent={isPresent}
                    selectedExtension={selectedExtension}
                  />
                  <MaximumTradingAccount
                    key="MaximumTradingAccount"
                    tradingAccounts={mainProxiesAccounts}
                    onRemove={(e) => onSetTempTrading?.(e)}
                    onClose={() => props?.onChangeInteraction(false)}
                    onRemoveCallback={() =>
                      props?.onPage("RemoveTradingAccount")
                    }
                  />
                  <InsufficientBalance
                    key="InsufficientBalance"
                    balance={walletBalance}
                    onClose={() => props?.onChangeInteraction(false)}
                  />
                </Multistep.Content>
              </>
            )}
          </Multistep.Interactive>
        </Popover.Content>
      </Popover>
    );

  return <Button.Solid onClick={onClick}>Connect wallet</Button.Solid>;
};
