import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    max-width: ${normalizeValue(160)};
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;
export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
export const Wrapper = styled.div`
  font-size: ${normalizeValue(1.3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow-y: scroll;
  @media screen and (max-height: 830px) {
    justify-content: flex-start;
    margin-top: ${normalizeValue(3)};
  }
`;

export const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 880px) {
    min-width: ${normalizeValue(80)};
    max-width: ${normalizeValue(80)};
  }
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 ${normalizeValue(2)} ${normalizeValue(1)} ${normalizeValue(2)};
    div {
      max-width: ${normalizeValue(15)};
      svg {
        width: 100%;
      }
    }
    a {
      color: ${theme.colors.primary};
    }
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: auto 1fr;
    border-radius: ${normalizeValue(2)};
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      min-height: ${normalizeValue(40)};
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(2)};
    width: ${normalizeValue(3)};
  `}
`;

export const Box = styled.div`
  padding: ${normalizeValue(2)};
  width: 100%;
  @media screen and (min-width: 880px) {
    max-width: ${normalizeValue(40)};
    padding: ${normalizeValue(4)};
    justify-self: center;
    align-self: center;
  }
  h1 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 600;
  }
  form {
    margin-top: ${normalizeValue(2)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
  }
`;

export const BoxTitle = styled.div`
  p {
    margin-top: ${normalizeValue(1)};
  }
`;

export const Show = styled.button`
  ${({ theme }) => css`
    width: ${normalizeValue(2.2)};
    height: ${normalizeValue(2.2)};
    padding: ${normalizeValue(0.3)};
    transition: background 0.5s ease-in;
    border-radius: ${normalizeValue(10)};
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;
export const Success = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: ${normalizeValue(1)};
    padding: ${normalizeValue(8)} ${normalizeValue(2)} ${normalizeValue(9)}
      ${normalizeValue(2)};
    border-radius: ${normalizeValue(2)};
    border: 1px solid ${theme.colors.secondaryBackground};
    margin: ${normalizeValue(2)};
    @media screen and (min-width: 880px) {
      min-height: ${normalizeValue(40)};
    }
    div {
      width: ${normalizeValue(4)};
      img {
        width: 100%;
      }
    }
    p {
      max-width: ${normalizeValue(50)};
      line-height: 1.5;
    }
    small {
      opacity: 0.5;
    }
  `}
`;
