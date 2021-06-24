import * as React from "react";

function SvgTransactions(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      {...props}
    >
      <g>
        <path
          data-name="c2/calendar"
          d="M15.08 4a.509.509 0 01-.48-.533V1.333A1.271 1.271 0 0115.8 0 1.271 1.271 0 0117 1.333v2.134a.509.509 0 01-.48.533zm-9.6 0A.509.509 0 015 3.467V1.333A1.271 1.271 0 016.2 0a1.271 1.271 0 011.2 1.333v2.134A.509.509 0 016.92 4z"
          opacity={0.5}
        />
        <path
          data-name="c1/calendar"
          d="M18.334 22H3.666A3.69 3.69 0 010 18.295V1.494A.492.492 0 01.488 1h2.934a.246.246 0 01.244.247v1.977a.246.246 0 01-.244.247h-.978v1.234h17.112V3.47h-.978a.246.246 0 01-.244-.247V1.247A.246.246 0 0118.578 1h2.934a.492.492 0 01.488.494v16.8A3.69 3.69 0 0118.334 22zM2.444 7.177v11.118a1.23 1.23 0 001.222 1.235h14.668a1.23 1.23 0 001.222-1.235V7.177zm14.178 9.881h-6.356a.492.492 0 01-.488-.494v-1.481a.492.492 0 01.488-.495h6.356a.493.493 0 01.489.495v1.482a.492.492 0 01-.489.493zm-8.8 0h-2.2c-.4 0-.734-.221-.734-.494v-1.481c0-.273.329-.495.734-.495h2.2c.4 0 .734.222.734.495v1.482c0 .272-.329.493-.734.493zm8.556-4.941h-2.2c-.4 0-.734-.221-.734-.494v-1.482c0-.272.329-.494.734-.494h2.2c.4 0 .734.221.734.494v1.483c0 .276-.33.494-.734.494zm-4.644 0H5.378a.492.492 0 01-.49-.494v-1.482a.492.492 0 01.49-.494h6.356a.492.492 0 01.488.494v1.483a.492.492 0 01-.488.494zM13.2 3.47H8.8a.246.246 0 01-.244-.247V1.247A.246.246 0 018.8 1h4.4a.246.246 0 01.244.247v1.977a.246.246 0 01-.244.246z"
        />
      </g>
    </svg>
  );
}

export default SvgTransactions;
