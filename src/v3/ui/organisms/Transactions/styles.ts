import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Section = styled.section`
  flex: 1;
`;

// Header
export const Header = styled.div`
  display: grid;
  grid-template-columns: 1.2fr auto;
  padding: 2rem 0;
  align-items: center;
  ${media.lessThan("large")`
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
    `}
`;
export const Content = styled.div``;

export const HeaderContent = styled.ul`
  display: flex;
  gap: 2rem;
`;
export const TabHeader = styled.li<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    list-style: none;
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    border-bottom-color: ${isActive ? theme.colors.text : "transparent"};
    cursor: pointer;
  `}
`;

export const Tab = styled.ul`
  li {
    font-size: 1.4rem;
    font-weight: 800;
    display: inline-block;
  }

  li :not(:last-child) {
    margin-right: 2rem;
  }
`;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;
export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

export const ContainerTransactions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
