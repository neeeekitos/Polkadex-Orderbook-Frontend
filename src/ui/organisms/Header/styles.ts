import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
import { Wrapper as Logo } from "@polkadex/orderbook-ui/molecules/Logo/styles";
import { Wrapper as SwitchWrapper } from "@polkadex/orderbook-ui/molecules/ThemeSwitch/styles";

export const Wrapper = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadows.primary};
    padding: 0.5rem 1rem;
    z-index: ${theme.layers.alwaysOnTop};
    max-height: 4.9rem;
  `}
`;

export const Container = styled.div`
  max-width: 140rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${Logo} {
    margin-right: 2rem;
  }

  :last-child {
    flex-direction: row;
    align-items: center;
    ${SwitchWrapper} {
      margin-right: 0.5rem;
    }
  }
`;

export const HeaderBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  :hover {
    ${Icon} {
      animation: arrowLeft 1.2s infinite cubic-bezier(0.5, 0, 0.5, 1);
      @keyframes arrowLeft {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(0.5rem);
        }
        100% {
          transform: translateX(0rem);
        }
      }
    }
  }
`;

export const HeaderBackContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
`;
