import Head from "next/head";
import { useEffect, useRef } from "react";

import * as S from "./styles";

import { OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const Progress = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const clear = setTimeout(() => {
      imageRef.current.style.transform = "rotateX(0deg) rotateZ(0deg)";
    }, 1000);
    return () => clearTimeout(clear);
  });

  return (
    <S.Wrapper>
      <Head>
        <title>Polkadex Orderbook</title>
      </Head>
      <S.Container>
        <S.Header>
          <OrderbookLogo light />
        </S.Header>
        <S.Content>
          <S.Hero>
            <S.HeroHeader>
              <S.HeroTitle>
                <Icons.Candle />
              </S.HeroTitle>
              <S.HeroContent>
                <h3>Test trading?</h3>
                <p>
                  If you want to be one of the first people to check Polkadex Orderbook and
                  THEA out and start trading, stay tuned in{" "}
                  <a href="https://discord.gg/h876ChKaNZ" target="_blank" rel="noreferrer">
                    the ambassador
                  </a>{" "}
                  and{" "}
                  <a href="https://discord.gg/HRx8ZzbtQy" target="_blank" rel="noreferrer">
                    validator channels
                  </a>{" "}
                  on Discord.
                </p>
              </S.HeroContent>
            </S.HeroHeader>
            <S.HeroInteraction>
              <img
                ref={imageRef}
                draggable={false}
                src="/img/orderbookImage.svg"
                alt="Orderbook App screenshot"
              />
            </S.HeroInteraction>
          </S.Hero>
          <S.Footer>
            <S.FooterWrapper>
              <S.FooterTitle>
                <h1>Almost there, Polkadexers</h1>
                <p>
                  Polkadex Orderbook is now running on the Polkadex mainnet in private beta
                  mode.
                </p>
              </S.FooterTitle>
              <S.FooterContent>
                <span>What this means</span>
                <S.FooterFlex>
                  <Card checked>
                    <strong>Orderbook and THEA are live</strong> on the Polkadex network.
                  </Card>
                  <Card pending>
                    DOT and USDT from the Relay Chain and AssetHub can now be deposited to
                    Polkadex via the Polkadex parachain and traded on Polkadex Orderbook.
                  </Card>
                  <Card pending>
                    Polkadex validators and ambassadors can now start making trades with real
                    assets.
                  </Card>
                  <Card>Market making has not yet gone live.</Card>
                  <Card>
                    Trade orders are currently only placed and filled by Polkadex ambassadors
                    and validators (aka individual traders).
                  </Card>
                </S.FooterFlex>
              </S.FooterContent>
            </S.FooterWrapper>
          </S.Footer>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

const Card = ({ checked = false, pending = false, children }) => (
  <S.FooterCard pending={pending} checked={checked}>
    <div>{checked && <Icons.Checked />}</div>
    <p> {children}</p>
  </S.FooterCard>
);
