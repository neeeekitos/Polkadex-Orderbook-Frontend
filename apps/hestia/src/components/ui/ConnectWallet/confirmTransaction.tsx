"use client";

import {
  Accordion,
  Button,
  Copy,
  Dropdown,
  Interaction,
  Loading,
  Modal,
  Skeleton,
  Typography,
  truncateString,
} from "@polkadex/ux";
import {
  RiAddLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiGasStationLine,
} from "@remixicon/react";
import { Dispatch, Fragment, SetStateAction, useMemo, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import Link from "next/link";
import {
  TransactionFeeProps,
  useFunds,
  useTransactionFee,
} from "@orderbook/core/index";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ErrorMessage, GenericHorizontalItem, Terms } from "../ReadyToUse";

import { FeeAssetReserve, usePool } from "@/hooks";

interface Props extends TransactionFeeProps {
  action: () => Promise<void>;
  actionLoading: boolean;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  feeToken: FeeAssetReserve | null;
  onSetFeeToken: Dispatch<SetStateAction<FeeAssetReserve | null>>;
}
export const ConfirmTransaction = ({
  action,
  extrinsicFn,
  sender,
  actionLoading,
  open,
  onOpenChange,
  feeToken,
  onSetFeeToken,
}: Props) => {
  const { fee, hash, palletName, extrinsicName, loading, success } =
    useTransactionFee({
      extrinsicFn,
      sender,
    });

  const isLoading = useMemo(() => loading && !success, [loading, success]);

  const ref = useRef<HTMLButtonElement>(null);

  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const {
    swapPrice = 0,
    swapLoading,
    poolReserves,
    poolReservesSuccess,
  } = usePool({
    asset: feeToken?.name ?? "",
    amount: fee,
  });

  const { walletBalance = 0, selectedWallet } = useConnectWalletProvider();
  const { balances, loading: balancesLoading } = useFunds();

  const isPDEX = useMemo(() => feeToken?.id === "PDEX", [feeToken?.id]);

  const selectedAssetBalance = useMemo(
    () => balances.find((e) => e.asset.id === feeToken?.id),
    [feeToken?.id, balances]
  );

  const error = useMemo(
    () =>
      feeToken?.id && isPDEX
        ? walletBalance < fee + 1
        : Number(selectedAssetBalance?.onChainBalance) < swapPrice,
    [
      feeToken?.id,
      fee,
      selectedAssetBalance?.onChainBalance,
      swapPrice,
      isPDEX,
      walletBalance,
    ]
  );

  const shortHash = useMemo(() => truncateString(hash), [hash]);
  const shortAddress = useMemo(
    () => truncateString(selectedWallet?.address ?? ""),
    [selectedWallet?.address]
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      closeOnClickOutside
      placement="center left"
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Modal.Content>
        <Loading.Spinner active={actionLoading}>
          <Interaction className="w-full gap-2 md:min-w-[24rem] md:max-w-[24rem]">
            <Interaction.Title onClose={{ onClick: () => onOpenChange(false) }}>
              Confirm Transaction
            </Interaction.Title>
            <Interaction.Content className="flex flex-col p-3">
              <div className="flex flex-col border-b border-primary px-3 pb-4">
                <Typography.Text appearance="primary">
                  Extrinsic
                </Typography.Text>
                <Accordion type="multiple">
                  <Accordion.Item value="extrinsic">
                    <Accordion.Trigger>
                      <Skeleton
                        loading={isLoading}
                        className="min-h-4 max-w-28"
                      >
                        <Typography.Text>{extrinsicName}</Typography.Text>
                      </Skeleton>
                      <Accordion.Icon>
                        <RiAddLine className="w-4 h-4 text-primary" />
                      </Accordion.Icon>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div className="flex flex-col mt-4 border-t border-primary">
                        <GenericHorizontalItem label="Name" className="px-0">
                          <Skeleton
                            loading={isLoading}
                            className="min-h-4 max-w-14"
                          >
                            <Copy value={hash}>
                              <Typography.Text>{palletName}</Typography.Text>
                            </Copy>
                          </Skeleton>
                        </GenericHorizontalItem>
                        <GenericHorizontalItem
                          label="Call hash"
                          className="px-0"
                        >
                          <Skeleton
                            loading={isLoading}
                            className="min-h-4 max-w-20"
                          >
                            <Copy value={hash}>
                              <div className="flex items-center gap-1">
                                <RiFileCopyLine className="w-3 h-3 text-secondary" />
                                <Typography.Text>{shortHash}</Typography.Text>
                              </div>
                            </Copy>
                          </Skeleton>
                        </GenericHorizontalItem>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="flex flex-col border-b border-primary">
                <GenericHorizontalItem label="Sending from">
                  <Skeleton
                    loading={!selectedWallet}
                    className="min-h-4 max-w-24"
                  >
                    <Copy value="0xD3…6Ae">
                      <div className="flex items-center gap-1">
                        <RiFileCopyLine className="w-3 h-3 text-secondary" />
                        <Typography.Text>
                          {selectedWallet?.name} • {shortAddress}
                        </Typography.Text>
                      </div>
                    </Copy>
                  </Skeleton>
                </GenericHorizontalItem>
                {!!feeToken && !isPDEX && !isLoading ? (
                  <GenericHorizontalItem
                    label="Estimated fee"
                    tooltip="Swap using Polkapool"
                  >
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton loading={swapLoading} className="min-h-4 w-10">
                        <div className="flex items-center gap-1">
                          <Typography.Text>{`${swapPrice.toFixed(4)} ${feeToken?.name}`}</Typography.Text>
                          <Typography.Text appearance="primary">
                            ≈
                          </Typography.Text>
                          <Typography.Text appearance="primary">{`${fee} PDEX`}</Typography.Text>
                        </div>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                ) : (
                  <GenericHorizontalItem label="Estimated fee">
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton
                        loading={isLoading}
                        className="min-h-4 min-w-14"
                      >
                        <Typography.Text>{fee} PDEX</Typography.Text>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                )}
                <Dropdown>
                  <Dropdown.Trigger
                    ref={ref}
                    className=" px-3 py-3 bg-level-1 border border-primary"
                  >
                    <div className="flex-1 w-full flex items-cneter justify-between gap-2">
                      <Typography.Text appearance="primary">
                        Pay fee with
                      </Typography.Text>
                      <Typography.Text>
                        {feeToken ? feeToken.name : "Select token"}
                      </Typography.Text>
                    </div>
                    <Dropdown.Icon />
                  </Dropdown.Trigger>
                  <Dropdown.Content
                    style={{
                      minWidth: width,
                      maxHeight: 250,
                      overflow: "auto",
                    }}
                    className="scrollbar-hide min-w-56"
                  >
                    {!poolReservesSuccess ? (
                      <div className="flex flex-col gap-2 p-4">
                        {new Array(3).fill("").map((_, i) => (
                          <Skeleton key={i} className="min-h-10" loading />
                        ))}
                      </div>
                    ) : (
                      <Fragment>
                        {poolReserves?.map((e) => {
                          const balance = balances?.find(
                            (bal) => bal.asset.id === e.id
                          );
                          return (
                            <Dropdown.Item
                              key={e.id}
                              onSelect={() => onSetFeeToken(e)}
                              className="flex justify-between items-center gap-2"
                              disabled={!e.poolReserve}
                            >
                              {e.poolReserve ? (
                                <div className="flex items-center justify-between gap-1 w-full">
                                  <Typography.Text>{e.name}</Typography.Text>
                                  <div className="flex items-center gap-1">
                                    <Typography.Text appearance="primary">
                                      Balance:
                                    </Typography.Text>
                                    <Skeleton
                                      loading={balancesLoading}
                                      className="min-h-5"
                                    >
                                      <Typography.Text appearance="primary">
                                        {Number(
                                          balance?.onChainBalance
                                        ).toFixed(4)}
                                      </Typography.Text>
                                    </Skeleton>
                                  </div>
                                </div>
                              ) : (
                                <Fragment>
                                  <div className="flex items-center gap-1">
                                    <Typography.Text appearance="primary">
                                      {e.name}
                                    </Typography.Text>
                                    <Typography.Text appearance="primary">
                                      (Insufficient liquidity)
                                    </Typography.Text>
                                  </div>
                                  <Button.Solid
                                    size="xs"
                                    appearance="secondary"
                                  >
                                    <Link
                                      target="_blank"
                                      href="https://polkapool-test.netlify.app/pools"
                                    >
                                      Add liquidity
                                    </Link>
                                  </Button.Solid>
                                </Fragment>
                              )}
                            </Dropdown.Item>
                          );
                        })}
                      </Fragment>
                    )}
                  </Dropdown.Content>
                </Dropdown>
                {error && (
                  <ErrorMessage className="p-3">
                    Your balance is not enough to pay the fee.
                  </ErrorMessage>
                )}
              </div>
              <div className="flex flex-col gap-3 px-3 pt-4">
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                  className="flex items-center gap-1"
                  target="_blank"
                >
                  <Typography.Text appearance="secondary" bold>
                    Terms and conditions
                  </Typography.Text>
                  <RiExternalLinkLine className="w-3 h-3 text-secondary" />
                </Link>
                <div className="overflow-hidden relative">
                  <div className=" max-h-24 overflow-auto pb-6">
                    <Terms />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[45px] bg-gradient-to-t from-level-0 to-transparent" />
                </div>
              </div>
            </Interaction.Content>
            <Interaction.Footer>
              <Interaction.Action
                disabled={!!error || !feeToken}
                appearance="secondary"
                onClick={action}
              >
                Sign and Submit
              </Interaction.Action>
              <Interaction.Close onClick={() => onOpenChange(false)}>
                Close
              </Interaction.Close>
            </Interaction.Footer>
          </Interaction>
        </Loading.Spinner>
      </Modal.Content>
    </Modal>
  );
};
