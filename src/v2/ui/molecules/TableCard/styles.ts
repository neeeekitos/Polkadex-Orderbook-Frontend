import styled, { css } from "styled-components";

// Card
export const Container = styled.div<{ isOpenOrder?: boolean }>`
  ${({ theme, isOpenOrder }) => css`
    display: grid;
    grid-template-columns: 3fr fit-content(100%);
    border-top: 1px solid ${theme.colors.secondaryBackground};
    padding: 0 0.5rem;
    transition: border 0.4s ease-in-out;
    user-select: none;
    opacity: ${isOpenOrder ? 1 : 0.7};
    transition: opacity 0.4s ease-in-out, border-color 0.4s ease-in-out;
    cursor: pointer;
    span {
      font-weight: 550;
    }
    p {
      opacity: 0.6;
    }
    :hover {
      border-color: ${theme.colors.text}99;
      box-shadow: ${theme.shadows.quaternary};
      ${Tag} {
        visibility: visible;
        opacity: 1;
      }
    }
  `}
`;
export const Wrapper = styled.div<{ columns?: number }>`
  ${({ columns = 2 }) => css`
    display: grid;
    grid-template-columns: ${`repeat(${columns + 1}, auto)`};
    grid-gap: 0.5rem;
    overflow: overlay;
    ::-webkit-scrollbar {
      height: 0;
    }
  `}
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 0.5rem;
  min-width: 10rem;
  div span {
    font-size: 1.2rem;
  }
`;

export const InfoToken = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 8rem;
    margin-right: 0.5rem;
  `}
`;

export const Tag = styled.span<{ isSell?: boolean }>`
  ${({ theme, isSell = false }) => css`
    position: absolute;
    bottom: -0.5rem;
    right: 50%;
    transform: translate(50%, 0);
    color: ${theme.colors.white};
    background: ${isSell ? theme.colors.primary : theme.colors.green};
    padding: 0.2rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    width: fit-content;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  `}
`;

export const Info = styled.div`
  padding: 1rem;
  align-self: center;
  :not(:nth-child(2)) {
    min-width: 10rem;
  }
  :nth-child(2) {
    min-width: 15rem;
  }
  span {
    font-size: 1.2rem;
  }
`;

export const Actions = styled.div<{ hasOrder?: boolean }>`
  ${({ theme, hasOrder }) => css`
    position: sticky;
    right: 0;
    min-width: ${hasOrder ? "8rem" : "15.3rem"};
    background: ${theme.colors.inverse};
    height: 100%;
    padding: 1rem;
    border-left: 1px solid ${theme.colors.secondaryBackground};
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    ul {
      list-style: none;
      li {
        font-size: 1.1rem;
        font-weight: 500;
        text-transform: uppercase;
        cursor: pointer;
        padding: 0.5rem;
        display: inline-block;
        transition: opacity 0.4s ease-in-out;
        :not(:last-child) {
          margin-right: 0.3rem;
        }
        :hover {
          opacity: 0.5;
        }
      }
    }
  `}
`;

export const Deposit = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.green};
  `}
`;

export const Cancel = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`;
