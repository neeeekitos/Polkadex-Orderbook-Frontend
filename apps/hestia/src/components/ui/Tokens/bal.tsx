import { ComponentProps } from "react";

export function BAL(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.643 18.077c4.064 0 7.357-1.174 7.357-2.747 0-.82-.897-1.56-2.333-2.081-1.12.72-3 1.088-5.133 1.088-2.081 0-3.92-.45-5.052-1.139-1.354.516-2.195 1.235-2.195 2.028 0 1.575 3.293 2.851 7.356 2.851z"
        fill="#fff"
      />
      <path
        d="M13.6 13.983c3.08 0 5.578-.965 5.578-2.157 0-.66-.77-1.253-1.977-1.647-.861.45-2.152.737-3.6.737-1.45 0-2.74-.287-3.602-.737-1.21.397-1.977.986-1.977 1.647-.002 1.192 2.496 2.157 5.578 2.157z"
        fill="#fff"
      />
      <path
        d="M13.62 10.558c2.382 0 4.313-.798 4.313-1.78 0-.98-1.931-1.778-4.313-1.778-2.38 0-4.312.798-4.312 1.779 0 .98 1.931 1.779 4.313 1.779z"
        fill="#fff"
      />
    </svg>
  );
}
