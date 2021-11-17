import * as React from "react";

function SvgDe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      {...props}>
      <path
        d="M15.923 345.043C52.094 442.527 145.929 512 256 512s203.906-69.473 240.077-166.957L256 322.783l-240.077 22.26z"
        fill="#ffda44"
      />
      <path d="M256 0C145.929 0 52.094 69.472 15.923 166.957L256 189.217l240.077-22.261C459.906 69.472 366.071 0 256 0z" />
      <path
        d="M15.923 166.957C5.633 194.69 0 224.686 0 256s5.633 61.31 15.923 89.043h480.155C506.368 317.31 512 287.314 512 256s-5.632-61.31-15.923-89.043H15.923z"
        fill="#d80027"
      />
    </svg>
  );
}

export default SvgDe;
