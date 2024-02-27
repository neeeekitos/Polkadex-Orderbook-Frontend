// TODO: Fix responsive interaction (reflect columns updates)
"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import {
  Button,
  GenericMessage,
  Table as PolkadexTable,
  Spinner,
} from "@polkadex/ux";
import { useOrderHistory } from "@orderbook/core/hooks";
import { Ifilters } from "@orderbook/core/providers/types";
import { DEFAULT_BATCH_LIMIT } from "@orderbook/core/constants";
import { Order } from "@orderbook/core/utils/orderbookService/types";

import { Loading } from "../loading";

import { columns } from "./columns";
import { ResponsiveTable } from "./responsiveTable";

const responsiveKeys = ["date", "price", "fee"];
const actionKeys = ["date", "price", "amount", "fee"];
const widthKeys = ["15%", "15%", "20%", "25%", "100%", "fit-content"];

export const OrderHistoryTable = ({
  filters,
  maxHeight,
}: {
  filters: Ifilters;
  maxHeight: string;
}) => {
  const { isLoading, orderHistory, error, hasNextPage, onFetchNextPage } =
    useOrderHistory(DEFAULT_BATCH_LIMIT, filters);
  const { width } = useWindowSize();
  const table = useReactTable({
    data: orderHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [responsiveState, setResponsiveState] = useState(false);
  const [responsiveData, setResponsiveData] = useState<Order | null>(null);
  const responsiveView = useMemo(() => width < 500 || width <= 715, [width]);
  const isResponsive = useMemo(() => width <= 1265, [width]);

  if (isLoading) return <Loading />;

  if (!orderHistory.length)
    return <GenericMessage title={"No items found"} illustration="NoData" />;

  return (
    <Fragment>
      <ResponsiveTable
        data={responsiveData}
        onOpenChange={setResponsiveState}
        open={responsiveState}
      />
      <InfiniteScroll
        className="flex-1 h-full overflow-auto scrollbar-hide"
        dataLength={orderHistory.length}
        next={() => {
          onFetchNextPage();
        }}
        hasMore={Boolean(hasNextPage)}
        height={isResponsive ? "384px" : maxHeight}
        loader={<Spinner.Keyboard className="h-6 mx-auto my-2" />}
      >
        <PolkadexTable className="w-full [&_th]:border-b [&_th]:border-primary">
          <PolkadexTable.Header className="sticky top-0 bg-level-0 z-[2]">
            {table.getHeaderGroups().map((headerGroup) => (
              <PolkadexTable.Row key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  const getSorted = header.column.getIsSorted();
                  const isActionTab = actionKeys.includes(header.id);
                  const handleSort = (): void => {
                    const isDesc = getSorted === "desc";
                    header.column.toggleSorting(!isDesc);
                  };
                  if (responsiveView && responsiveKeys.includes(header.id))
                    return null;

                  return (
                    <PolkadexTable.Head
                      key={header.id}
                      className={classNames(
                        "text-xs",
                        !isActionTab && "cursor-pointer"
                      )}
                      style={{ width: widthKeys[i] }}
                      {...(isActionTab && { onClick: handleSort })}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {isActionTab && <PolkadexTable.Icon />}
                    </PolkadexTable.Head>
                  );
                })}
              </PolkadexTable.Row>
            ))}
          </PolkadexTable.Header>
          <PolkadexTable.Body>
            {table.getRowModel().rows.map((row) => {
              return (
                <PolkadexTable.Row key={row.id} className="hover:bg-level-1">
                  {row.getVisibleCells().map((cell) => {
                    if (
                      responsiveView &&
                      responsiveKeys.includes(cell.column.id)
                    )
                      return null;

                    const responsiveProps = responsiveView
                      ? {
                          className: "cursor-pointer",
                          onClick: () => {
                            setResponsiveState(true);
                            setResponsiveData(row.original);
                          },
                        }
                      : {};
                    return (
                      <PolkadexTable.Cell
                        key={cell.id}
                        className="text-xs"
                        {...responsiveProps}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </PolkadexTable.Cell>
                    );
                  })}
                </PolkadexTable.Row>
              );
            })}
          </PolkadexTable.Body>
        </PolkadexTable>
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p>{error}</p>
            <Button.Solid onClick={() => onFetchNextPage()} size="sm">
              Try again
            </Button.Solid>
          </div>
        )}
      </InfiniteScroll>
    </Fragment>
  );
};
