import { ComponentProps } from "react";

export function Activity(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        d="M12.4761 2.28086C15.3521 4.91147 15.5572 9.39399 12.9216 12.2756C10.2859 15.1571 5.80288 15.3516 2.92179 12.7265C1.87999 11.7737 1.15575 10.5515 0.823961 9.18951C0.746587 8.88465 0.934938 8.57858 1.23472 8.50675C1.53958 8.42938 1.84565 8.61773 1.91748 8.91751C2.1969 10.0585 2.80605 11.0839 3.6816 11.8847C6.10323 14.0997 9.86981 13.9318 12.0848 11.5102C14.2998 9.08857 14.1319 5.322 11.7103 3.10702C9.28865 0.892038 5.52207 1.05991 3.30709 3.48153C2.90329 3.923 2.56527 4.40937 2.2957 4.92325L4.13059 4.55249C4.43639 4.49634 4.73232 4.69577 4.79355 4.99603C4.82835 5.18052 4.77272 5.36373 4.65615 5.49119C4.57505 5.57985 4.47685 5.6427 4.35555 5.66405L1.35025 6.26527C1.31141 6.27786 1.27078 6.28555 1.22891 6.28742C1.06796 6.30575 0.914045 6.25205 0.799047 6.15256C0.743435 6.10524 0.697024 6.04704 0.6637 5.98019C0.633864 5.92176 0.613828 5.85734 0.606038 5.78893L0.231094 2.50467C0.19616 2.19792 0.422829 1.91673 0.729576 1.88179C1.03632 1.84686 1.31752 2.07353 1.35245 2.38028L1.53415 3.97182C1.80325 3.52921 2.11817 3.11231 2.47587 2.72124C5.11154 -0.160325 9.60008 -0.34974 12.4761 2.28086Z"
        fill="currentColor"
      />
      <path
        d="M9.44622 10.5434C9.53633 10.6035 9.63396 10.626 9.73159 10.626C9.91934 10.626 10.1071 10.5284 10.2197 10.3482C10.3774 10.0778 10.2948 9.73236 10.0245 9.57465L7.69641 8.18532C7.4636 8.05014 7.2383 7.65211 7.2383 7.38176V4.3027C7.2383 3.99479 6.98297 3.73945 6.67506 3.73945C6.36716 3.73945 6.11182 3.99479 6.11182 4.3027V7.38176C6.11182 8.05014 6.53988 8.80864 7.11814 9.1541L9.44622 10.5434Z"
        fill="currentColor"
      />
    </svg>
  );
}
