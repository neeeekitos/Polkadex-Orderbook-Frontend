import * as React from "react";

function SvgDot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="2.5em"
      height="2.5em"
      viewBox="0 6 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.067 6C10.273 6.012 8.011 8.38 8 11.304c0 .585.09 1.167.267 1.722a.717.717 0 00.892.465.765.765 0 00.43-.93 3.649 3.649 0 01-.197-1.351c.061-2.112 1.746-3.773 3.764-3.71 2.018.064 3.604 1.828 3.543 3.94-.057 1.977-1.545 3.583-3.432 3.703 0 0-.71.046-1.065.091-.13.02-.26.046-.387.08a.045.045 0 01-.066.001.05.05 0 010-.06l.11-.629.667-3.144c.08-.393-.158-.78-.534-.863a.695.695 0 00-.824.559s-1.589 7.697-1.589 7.767c-.09.374.125.754.483.85a.1.1 0 00.011.002h.037a.665.665 0 00.818-.52.183.183 0 010-.036c.02-.09.22-1.114.22-1.114.152-.773.747-1.365 1.492-1.485.153-.025.798-.07.798-.07 2.783-.29 4.814-2.887 4.536-5.8-.253-2.657-2.356-4.703-4.907-4.772z" />
      <path
        d="M13.374 18.229c-.457-.1-.903.207-.998.685l-.003.013c-.099.475.189.944.643 1.048h.025c.445.113.892-.174.999-.638l.002-.011v-.049c.079-.48-.214-.94-.668-1.048z"
        fill="#E6007A"
      />
    </svg>
  );
}

export default SvgDot;
