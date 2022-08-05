import dynamic from "next/dynamic";
import Head from "next/head";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import {
  Button,
  Dropdown,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import { Transaction } from "@polkadex/orderbook-modules";
import { useHistory } from "@polkadex/orderbook-hooks";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const DepositTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      amount: 0.0,
      asset: null,
    },
    validationSchema: withdrawValidations,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log("Selected Token id via url:", router.query.id);

  const getColor = (status: Transaction["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return "green";
      case "PENDING":
        return "orange";
      default:
        return "primary";
    }
  };
  const { transactionHistory } = useHistory();

  return (
    <>
      <Head>
        <title>Deposit | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu isWallet handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Column>
              <div>
                <h1>Deposit Crypto</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <S.Form>
                <S.SelectAccount>
                  <div>
                    <Icons.Avatar />
                  </div>
                  <div>
                    <strong>Main Account</strong>
                    <span>esoDF9faq...9dD7GtQvg</span>
                  </div>
                </S.SelectAccount>
                <form onSubmit={handleSubmit}>
                  <S.SelectInput>
                    <span>Select a coin</span>
                    <S.SelectInputContainer>
                      <Dropdown
                        isClickable
                        direction="bottom"
                        header={
                          <S.DropdownHeader>
                            <div>
                              <span>
                                <Tokens.PDEX />
                              </span>
                              Polkadex PDEX
                            </div>
                            <div>
                              <span>
                                <Icons.ArrowBottom />
                              </span>
                            </div>
                          </S.DropdownHeader>
                        }>
                        <S.DropdownContent>
                          <button type="button" onClick={undefined}>
                            Polkadex PDEX
                          </button>
                        </S.DropdownContent>
                      </Dropdown>
                    </S.SelectInputContainer>
                    <S.Available>
                      Avlb <strong>120PDEX</strong>
                    </S.Available>
                  </S.SelectInput>
                  <InputLine
                    name="amount"
                    label="Token Amount"
                    placeholder="0.00"
                    error={errors.amount && touched.amount && errors.amount}
                    {...getFieldProps("amount")}
                  />

                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    disabled={!(isValid && dirty)}
                    isFull>
                    Deposit
                  </Button>
                </form>
              </S.Form>
              <S.History>
                <h2>History</h2>
                {transactionHistory.length ? (
                  <S.HistoryContent>
                    <Table
                      aria-label="Polkadex Deposit History Table"
                      style={{ width: "100%" }}>
                      <Table.Header fill="none">
                        <Table.Column>
                          <S.HeaderColumn>Name</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Date</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Status</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Amount</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Transaction ID</S.HeaderColumn>
                        </Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {transactionHistory.map((item) => (
                          <Table.Row key={item.event_id}>
                            <Table.Cell>
                              <S.Cell>
                                <span>{item.asset}</span>
                              </S.Cell>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cell>
                                <span>{new Date(item.time).toDateString()}</span>
                              </S.Cell>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cell>
                                <S.Status color={getColor(item.status)}>
                                  {item.status}
                                </S.Status>
                              </S.Cell>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cell>
                                <span>
                                  {item.amount} <small>$0.00</small>
                                </span>
                              </S.Cell>
                            </Table.Cell>
                            <Table.Cell>
                              <Copy copyData={item.main_account} />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </S.HistoryContent>
                ) : (
                  <EmptyData />
                )}
              </S.History>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
const Copy = ({ copyData }) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyData);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Cell>
      <Tooltip>
        <TooltipHeader>
          <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
            <Icons.Copy />
          </button>
          {copyData}
        </TooltipHeader>
        <TooltipContent>
          <p ref={buttonRef}>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </S.Cell>
  );
};
