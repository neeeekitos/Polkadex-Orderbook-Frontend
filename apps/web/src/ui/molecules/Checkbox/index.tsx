import { mergeRefs } from "@react-aria/utils";
import { forwardRef, Ref, useRef } from "react";
import { useCheckbox } from "react-aria";
import { useToggleState } from "react-stately";
import { isValidChildren } from "@orderbook/core/utils";

import * as S from "./styles";
import * as T from "./types";

export const Checkbox = forwardRef(
  (
    {
      children,
      name = `polkadexui${String(Math.random())}`,
      ...props
    }: T.Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    const componentRef = useRef();
    const state = useToggleState(props);
    const { inputProps } = useCheckbox(props, state, componentRef);
    const { ...restProps } = inputProps;
    const hasChild =
      isValidChildren(children)?.length || children?.toString()?.length;

    return (
      <S.Wrapper disabled={props.disabled}>
        <input
          type="checkbox"
          id={name}
          {...restProps}
          ref={mergeRefs(componentRef, ref)}
        />
        {hasChild && <label htmlFor={name}>{children}</label>}
      </S.Wrapper>
    );
  },
);
Checkbox.displayName = "Checkbox";

Checkbox.defaultProps = {
  "aria-label": "Checkbox",
};
