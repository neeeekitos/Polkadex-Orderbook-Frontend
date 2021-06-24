import styled, { css } from "styled-components";
type Props = {
  isPositive: boolean;
};
export const Wrapper = styled.span<Props>`
  ${({ theme, isPositive }) => css`
    background: ${isPositive ? theme.colors.green : theme.colors.primary};
    font-size: ${theme.font.sizes.xsmall};
    padding: 0.5rem;
    border-radius: 0.8rem;
    display: block;
    font-weight: 600;
    width: fit-content;
    height: fit-content;
  `}
`;
