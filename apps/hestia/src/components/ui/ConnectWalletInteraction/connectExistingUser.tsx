"use client";

import { Fragment, MouseEvent, useCallback, useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { Interactable, useInteractableProvider } from "@polkadex/ux";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { MINIMUM_PDEX_REQUIRED } from "@orderbook/core/constants";

import { ExistingUser } from "../ConnectWallet/existingUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { TradingAccountList } from "../ConnectWallet/tradingAccountList";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { MaximumTradingAccount } from "../ConnectWallet/maximumTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";
import { ImportTradingAccountMnemonic } from "../ConnectWallet/importTradingAccountMnemonic";
import { UnlockAccount } from "../ReadyToUse/unlockAccount";

import { InteractableProps } from ".";

export const ConnectExistingUser = ({ onClose, onNext }: InteractableProps) => {
  return (
    <Interactable>
      <Interactable.Trigger>
        <TriggerComponent onClose={onClose} onNext={onNext} />
      </Interactable.Trigger>
      <Interactable.Content>
        <CardsComponent onClose={onClose} onNext={onNext} />
      </Interactable.Content>
    </Interactable>
  );
};

const TriggerComponent = ({ onClose, onNext }: InteractableProps) => {
  const {
    localTradingAccounts,
    onSelectTradingAccount,
    onResetWallet,
    onResetExtension,
    onSetTempTrading,
    mainProxiesAccounts,
    walletBalance,
    onExportTradeAccount,
  } = useConnectWalletProvider();

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter((item) =>
        mainProxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, mainProxiesAccounts]
  );

  const handleCloseInteraction = () => {
    onResetWallet?.();
    onResetExtension?.();
    onNext("Connect");
  };

  const redirectMaximumAccounts =
    (mainProxiesAccounts?.length ?? 0) >= 3
      ? "MaximumTradingAccount"
      : "NewTradingAccount";

  const redirectEnoughBalance =
    (walletBalance ?? 0) >= MINIMUM_PDEX_REQUIRED
      ? redirectMaximumAccounts
      : "InsufficientBalance";

  const { setPage } = useInteractableProvider();

  return (
    <ExistingUser
      onClose={onClose}
      onReadMore={() =>
        window.open(
          "https://docs.polkadex.trade/orderbookPolkadexFAQHowToTradeStep3",
          "_blank",
          "noopener, noreferrer"
        )
      }
      onBack={handleCloseInteraction}
      onCreate={() => setPage(redirectEnoughBalance)}
      onRecover={() => setPage("ConnectTradingAccount")}
      onTradingAccountList={() => setPage("TradingAccountList")}
      accounts={filteredAccounts as TradeAccount[]}
      registeredProxies={mainProxiesAccounts}
      onSelect={(e) =>
        onSelectTradingAccount?.({
          tradeAddress: e.address,
        })
      }
      onSelectCallback={onClose}
      onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
      onRemoveCallback={() => setPage("RemoveTradingAccount")}
      onExportBrowserAccount={(account) => onExportTradeAccount({ account })}
      onExportBrowserAccountCallback={() => setPage("UnlockBrowserAccount")}
    />
  );
};

const CardsComponent = ({ onClose, onNext }: InteractableProps) => {
  const {
    localTradingAccounts,
    onSelectTradingAccount,
    onResetWallet,
    onResetExtension,
    selectedWallet,
    onRegisterTradeAccount,
    registerStatus,
    registerError,
    removingError,
    onSetTempTrading,
    mainProxiesAccounts,
    removingStatus,
    tempTrading,
    onRemoveTradingAccountFromDevice,
    onRemoveTradingAccountFromChain,
    selectedExtension,
    onImportFromFile,
    importFromFileStatus,
    walletBalance,
    onExportTradeAccount,
    onResetTempTrading,
    importFromMnemonicError,
    importFromMnemonicStatus,
    onImportFromMnemonic,
  } = useConnectWalletProvider();
  const { setPage, onReset } = useInteractableProvider();

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter((item) =>
        mainProxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, mainProxiesAccounts]
  );

  const hasAccounts = useMemo(
    () => !!filteredAccounts?.length,
    [filteredAccounts?.length]
  );

  const handleCloseInteraction = () => {
    onResetWallet?.();
    onResetExtension?.();
    setPage("Connect");
  };

  const availableOnDevice = useMemo(
    () =>
      filteredAccounts?.some((value) => value.address === tempTrading?.address),
    [tempTrading?.address, filteredAccounts]
  );

  const handleClose = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onReset();
    },
    [onReset]
  );

  return (
    <Fragment>
      <Interactable.Card pageName="ConnectTradingAccount">
        <ConnectTradingAccount
          accounts={filteredAccounts as TradeAccount[]}
          onSelect={(e) =>
            onSelectTradingAccount?.({ tradeAddress: e.address })
          }
          onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
          onClose={hasAccounts ? onReset : handleCloseInteraction}
          onImport={() => setPage("ImportTradingAccount")}
          onSelectCallback={onClose}
          onRemoveCallback={() => setPage("RemoveTradingAccount")}
          onExportBrowserAccount={(account) =>
            onExportTradeAccount({ account })
          }
          onExportBrowserAccountCallback={() => setPage("UnlockBrowserAccount")}
          onImportMnemonic={() => {
            setPage("ImportTradingAccountMnemonic");
          }}
        />
      </Interactable.Card>
      <Interactable.Card pageName="UnlockBrowserAccount">
        <UnlockAccount
          tempBrowserAccount={tempTrading}
          onClose={() => setPage("ConnectTradingAccount")}
          onAction={(account, password) =>
            onExportTradeAccount({ account, password })
          }
          onResetTempBrowserAccount={onResetTempTrading}
        />
      </Interactable.Card>
      <Interactable.Card pageName="NewTradingAccount">
        <NewTradingAccount
          onCreateAccount={onRegisterTradeAccount}
          loading={registerStatus === "loading"}
          fundWalletPresent={!!Object.keys(selectedWallet ?? {})?.length}
          errorTitle="Error"
          errorMessage={(registerError as Error)?.message ?? registerError}
          selectedExtension={selectedExtension}
          onCreateCallback={() => onNext("TradingAccountSuccessfull")}
          onClose={handleClose}
        />
      </Interactable.Card>
      <Interactable.Card pageName="TradingAccountList">
        <TradingAccountList
          tradingAccounts={mainProxiesAccounts}
          browserAccounts={localTradingAccounts}
          onRemove={(e) => onSetTempTrading?.(e)}
          onClose={handleClose}
          onRemoveCallback={() => setPage("RemoveTradingAccount")}
        />
      </Interactable.Card>
      <Interactable.Card pageName="RemoveTradingAccount">
        <RemoveTradingAccount
          tradingAccount={tempTrading as TradeAccount}
          fundWallet={selectedWallet}
          availableOnDevice={availableOnDevice}
          onRemoveFromDevice={() =>
            onRemoveTradingAccountFromDevice?.(tempTrading?.address as string)
          }
          onRemoveFromChain={async (e) =>
            await onRemoveTradingAccountFromChain?.({ ...e, selectedWallet })
          }
          loading={removingStatus === "loading"}
          errorTitle="Error"
          errorMessage={(removingError as Error)?.message ?? removingError}
          selectedExtension={selectedExtension}
          onCancel={handleClose}
        />
      </Interactable.Card>
      <Interactable.Card pageName="ImportTradingAccount">
        <ImportTradingAccount
          onImport={async (e) => {
            await onImportFromFile?.(e);
            onClose();
          }}
          onRedirect={() => setPage("ConnectTradingAccount")}
          onClose={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPage("ConnectTradingAccount");
          }}
          loading={importFromFileStatus === "loading"}
          whitelistBrowserAccounts={mainProxiesAccounts}
        />
      </Interactable.Card>
      <Interactable.Card pageName="ImportTradingAccountMnemonic">
        <ImportTradingAccountMnemonic
          onImport={async (e) => {
            await onImportFromMnemonic?.(e);
            onClose();
          }}
          onCancel={() => setPage("ConnectTradingAccount")}
          loading={importFromMnemonicStatus === "loading"}
          errorMessage={
            (importFromMnemonicError as Error)?.message ??
            importFromMnemonicError
          }
        />
      </Interactable.Card>
      <Interactable.Card pageName="MaximumTradingAccount">
        <MaximumTradingAccount
          tradingAccounts={mainProxiesAccounts}
          browserAccounts={localTradingAccounts}
          onRemove={(e) => onSetTempTrading?.(e)}
          onClose={handleClose}
          onRemoveCallback={() => setPage("RemoveTradingAccount")}
        />
      </Interactable.Card>
      <Interactable.Card pageName="InsufficientBalance">
        <InsufficientBalance balance={walletBalance} onClose={onReset} />
      </Interactable.Card>
    </Fragment>
  );
};
