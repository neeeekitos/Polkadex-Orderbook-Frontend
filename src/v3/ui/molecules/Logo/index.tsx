import Link from "next/link";

import * as S from "./styles";

export type LogoProps = {
  size?: "Small" | "Medium" | "Large";
  href?: string;
};
export const Logo = ({ href = "#", size }: LogoProps) => (
  <Link href={href}>
    <S.Link size={size}>
      <S.Svg
        xmlns="http://www.w3.org/2000/svg"
        width="118.516"
        height="24.013"
        viewBox="0 0 118.516 24.013">
        <g id="Logo" transform="translate(0 -14.834)" stroke="none">
          <S.LogoIcon id="Logo-Icon" transform="translate(0 14.834)" stroke="none">
            <g
              id="Icon-X"
              data-name="Group 1"
              transform="translate(24.291 24.013) rotate(180)"
              stroke="none">
              <path
                id="Path_1"
                data-name="Path 1"
                d="M0,0V3.3l5.645,5.7h3.4Z"
                transform="translate(0 3.242)"
                stroke="none"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M9.045,8.993V5.7L3.4,0H0Z"
                transform="translate(15.245 11.501)"
                stroke="none"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M9.045,0V3.3L3.4,8.993,9.045,14.64v3.443L0,8.993Z"
                transform="translate(21.326 14.968) rotate(90)"
                stroke="none"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M9.045,18.083v-3.3L3.4,9.09,9.045,3.443V0L0,9.09Z"
                transform="translate(2.688 9.045) rotate(-90)"
                stroke="none"
              />
            </g>
            <circle
              id="Ellipse"
              data-name="Ellipse 1"
              cx="1.5"
              cy="1.5"
              r="1.5"
              transform="translate(10.686 11.068)"
              fill="#e6007a"
              stroke="none"
            />
          </S.LogoIcon>
          <S.LogoText id="Logo-Text" transform="translate(31.955 15.951)" stroke="none">
            <path
              id="Path_8137"
              data-name="Path 8137"
              d="M280.058-12.432a1.608,1.608,0,0,1,1.33.6,1.681,1.681,0,0,1,.307,1.449,2.51,2.51,0,0,1-.921,1.449,2.483,2.483,0,0,1-1.568.563,1.6,1.6,0,0,1-1.313-.563,1.605,1.605,0,0,1-.256-1.449,2.515,2.515,0,0,1,.869-1.449A2.333,2.333,0,0,1,280.058-12.432Z"
              transform="translate(-195.179 25.334)"
              fill="#e6007a"
              stroke="none"
            />
            <path
              id="Path_8136"
              data-name="Path 8136"
              d="M14.558-41.718h-.9a.939.939,0,0,1-.821-.348.937.937,0,0,1-.124-.821,1.412,1.412,0,0,1,.46-.784,1.348,1.348,0,0,1,.958-.361h.9l.921-4.23a1.358,1.358,0,0,1,.56-.871,1.583,1.583,0,0,1,.908-.3,1.075,1.075,0,0,1,.734.274.89.89,0,0,1,.187.9l-.921,4.23h.9a2.766,2.766,0,0,0,1.232-.274,3.835,3.835,0,0,0,1-.7,3.792,3.792,0,0,0,.722-.97,4.452,4.452,0,0,0,.411-1.12,4.264,4.264,0,0,0,.062-1.07,2.356,2.356,0,0,0-.261-.945,1.765,1.765,0,0,0-.647-.684,2,2,0,0,0-1.07-.261H15.006a5.131,5.131,0,0,0-.983.1,3.4,3.4,0,0,0-.97.348,2.831,2.831,0,0,0-.8.634,2.112,2.112,0,0,0-.46.958,1.5,1.5,0,0,0,.124,1.045,6.73,6.73,0,0,0,.523.846.971.971,0,0,1,.249.921,1.5,1.5,0,0,1-.485.8,1.28,1.28,0,0,1-.883.348,1.219,1.219,0,0,1-.771-.274,3.821,3.821,0,0,1-1.02-1.592,4,4,0,0,1-.1-2.09,4.757,4.757,0,0,1,.821-1.854,5.753,5.753,0,0,1,1.431-1.368,6.457,6.457,0,0,1,1.829-.846,7.174,7.174,0,0,1,1.991-.286h4.6a4.42,4.42,0,0,1,2.152.473,3.443,3.443,0,0,1,1.319,1.232,3.936,3.936,0,0,1,.547,1.7,6.515,6.515,0,0,1-.112,1.916,7.515,7.515,0,0,1-.746,1.953,6.9,6.9,0,0,1-1.306,1.7,6.319,6.319,0,0,1-1.829,1.207,5.616,5.616,0,0,1-2.289.46h-.9L16.7-40.548a5.907,5.907,0,0,1-.411,1.169,3.433,3.433,0,0,1-.672.958,2.953,2.953,0,0,1-1,.647,3.673,3.673,0,0,1-1.381.236,4.332,4.332,0,0,1-1.132-.174,1.559,1.559,0,0,1-.983-.846,1.025,1.025,0,0,1-.149-.746,1.454,1.454,0,0,1,.547-.821,1.484,1.484,0,0,1,.921-.323,1.044,1.044,0,0,1,.8.348.548.548,0,0,0,.473.249.447.447,0,0,0,.4-.286,5.75,5.75,0,0,0,.348-1.182Zm8.957-.722a5.872,5.872,0,0,1,.8-1.916,6.747,6.747,0,0,1,1.381-1.568,6.754,6.754,0,0,1,1.791-1.07,5.292,5.292,0,0,1,2-.4,4.224,4.224,0,0,1,1.866.4,3.735,3.735,0,0,1,1.344,1.07,3.89,3.89,0,0,1,.722,1.568,4.4,4.4,0,0,1-.025,1.916,5.735,5.735,0,0,1-.8,1.9,6.858,6.858,0,0,1-1.381,1.555,6.5,6.5,0,0,1-1.791,1.057,5.5,5.5,0,0,1-2.028.386,4.279,4.279,0,0,1-1.841-.386,3.62,3.62,0,0,1-1.344-1.057,3.889,3.889,0,0,1-.722-1.555A4.349,4.349,0,0,1,23.515-42.439Zm7.564,0a2.48,2.48,0,0,0,.025-1.045,2.079,2.079,0,0,0-.386-.871A1.991,1.991,0,0,0,30-44.94a2.221,2.221,0,0,0-.983-.211,2.828,2.828,0,0,0-1.07.211,3.456,3.456,0,0,0-.958.585,3.771,3.771,0,0,0-.746.871,3.372,3.372,0,0,0-.435,1.045,2.173,2.173,0,0,0,.348,1.891,2.042,2.042,0,0,0,1.717.771,2.828,2.828,0,0,0,1.07-.211,3.624,3.624,0,0,0,.958-.572,3.646,3.646,0,0,0,.746-.846A3.226,3.226,0,0,0,31.079-42.439Zm8.634-9.43q-.075,0-.112.149l-.087.348-2.289,10.8q-.05.2-.1.411a2.448,2.448,0,0,1-.1.336,1.389,1.389,0,0,1,.485-.336,1.327,1.327,0,0,1,.46-.087.922.922,0,0,1,.7.286.752.752,0,0,1,.149.759,1.443,1.443,0,0,1-.373.722,2.494,2.494,0,0,1-1.033.759,3.129,3.129,0,0,1-1.033.187,1.631,1.631,0,0,1-1.443-.61,2.691,2.691,0,0,1-.149-2L37.175-51.3a5.724,5.724,0,0,1,.448-1.443,2.721,2.721,0,0,1,.634-.858,1.943,1.943,0,0,1,.846-.423,4.947,4.947,0,0,1,1.107-.112h.2a.776.776,0,0,1,.684.348.935.935,0,0,1,.137.771,1.444,1.444,0,0,1-.473.771,1.224,1.224,0,0,1-.846.373Zm4.628,12.192a7.177,7.177,0,0,1-.423-1,2.157,2.157,0,0,1-.075-1.169,1.49,1.49,0,0,1,.56-.834,8.7,8.7,0,0,1,1.057-.684,3.156,3.156,0,0,0,.858-.7,1.812,1.812,0,0,0,.411-.722q.075-.373-.572-.373a2.662,2.662,0,0,0-1,.2,2.872,2.872,0,0,0-.933.622,4.7,4.7,0,0,0-.8,1.057,5.024,5.024,0,0,0-.535,1.505l-.647,3.11a1.265,1.265,0,0,1-.56.846,1.644,1.644,0,0,1-.883.274.986.986,0,0,1-.709-.274.854.854,0,0,1-.162-.846L42.6-51.2a5.95,5.95,0,0,1,.448-1.456,2.691,2.691,0,0,1,.634-.871,1.943,1.943,0,0,1,.834-.423,4.782,4.782,0,0,1,1.095-.112h.224a.739.739,0,0,1,.684.348,1.078,1.078,0,0,1,.137.771,1.648,1.648,0,0,1-.46.759,1.145,1.145,0,0,1-.834.361h-.224q-.075,0-.112.149t-.087.373L43.794-46a6.505,6.505,0,0,1,1.568-1.02,3.7,3.7,0,0,1,1.518-.373,2.421,2.421,0,0,1,1.791.672,1.78,1.78,0,0,1,.423,1.767,4.1,4.1,0,0,1-1.057,1.941,5.188,5.188,0,0,1-1.9,1.319q.075.124.224.435t.311.634a3.838,3.838,0,0,0,.336.56q.174.236.323.236a3.789,3.789,0,0,1,.448-.286,1.069,1.069,0,0,1,.523-.137.883.883,0,0,1,.684.286.769.769,0,0,1,.137.759,1.374,1.374,0,0,1-.373.709,3.194,3.194,0,0,1-.647.523,3.277,3.277,0,0,1-.7.323,1.958,1.958,0,0,1-.572.112,1.984,1.984,0,0,1-.9-.187,2.381,2.381,0,0,1-.659-.485,3.585,3.585,0,0,1-.51-.684Q44.54-39.279,44.341-39.677ZM58.524-40.6q-.05.224-.112.46a1.924,1.924,0,0,1-.112.336l.124-.1a1.42,1.42,0,0,1,.871-.323.845.845,0,0,1,.672.286.8.8,0,0,1,.149.734,1.879,1.879,0,0,1-.423.771,3.342,3.342,0,0,1-1.008.684,2.561,2.561,0,0,1-.983.211,1.457,1.457,0,0,1-1.642-1.269,5.625,5.625,0,0,1-1.418.921A3.944,3.944,0,0,1,53-37.537a3.2,3.2,0,0,1-1.555-.336,2.343,2.343,0,0,1-.933-.908,3.057,3.057,0,0,1-.373-1.319,5.386,5.386,0,0,1,.149-1.592,7.767,7.767,0,0,1,.722-2.015A8,8,0,0,1,52.3-45.549a6.5,6.5,0,0,1,1.754-1.331,4.5,4.5,0,0,1,2.1-.51,2.286,2.286,0,0,1,1.568.547,1.455,1.455,0,0,1,.523-.411,1.423,1.423,0,0,1,.6-.137.963.963,0,0,1,.709.286.883.883,0,0,1,.162.858Zm-2.836-4.553a1.974,1.974,0,0,0-1.107.336,4.02,4.02,0,0,0-.921.846,5.243,5.243,0,0,0-.684,1.107,4.836,4.836,0,0,0-.373,1.145,3.677,3.677,0,0,0-.075.722,1.488,1.488,0,0,0,.124.622,1,1,0,0,0,.373.435,1.169,1.169,0,0,0,.647.162,2.209,2.209,0,0,0,1.057-.274,3.291,3.291,0,0,0,.908-.722,4.668,4.668,0,0,0,.684-1.02,4.8,4.8,0,0,0,.411-1.169,2.7,2.7,0,0,0-.037-1.53A.963.963,0,0,0,55.687-45.151Zm14.108,4.578q-.05.2-.1.411a2.45,2.45,0,0,1-.1.336,1.831,1.831,0,0,1,.51-.311,1.327,1.327,0,0,1,.46-.087.845.845,0,0,1,.672.286.8.8,0,0,1,.149.734,2.279,2.279,0,0,1-.4.771,2.659,2.659,0,0,1-1.033.709,3,3,0,0,1-.983.187,1.837,1.837,0,0,1-1.232-.373,1.537,1.537,0,0,1-.485-1.12,5.72,5.72,0,0,1-1.493,1.082A3.9,3.9,0,0,1,64-37.537a3.274,3.274,0,0,1-1.568-.336,2.242,2.242,0,0,1-.933-.908,3.17,3.17,0,0,1-.361-1.319,5.386,5.386,0,0,1,.149-1.592,7.521,7.521,0,0,1,.734-2.015,8.543,8.543,0,0,1,1.294-1.841,6.32,6.32,0,0,1,1.742-1.331,4.448,4.448,0,0,1,2.078-.51,1.767,1.767,0,0,1,1.617.846l1.443-6.768a1.331,1.331,0,0,1,.535-.834,1.479,1.479,0,0,1,.858-.286,1.036,1.036,0,0,1,.746.286.827.827,0,0,1,.174.834ZM66.66-45.151a1.974,1.974,0,0,0-1.107.336,4.02,4.02,0,0,0-.921.846,5.243,5.243,0,0,0-.684,1.107,4.837,4.837,0,0,0-.373,1.145A3.677,3.677,0,0,0,63.5-41a1.488,1.488,0,0,0,.124.622,1,1,0,0,0,.373.435,1.22,1.22,0,0,0,.672.162,2.111,2.111,0,0,0,1.07-.286,3.465,3.465,0,0,0,.9-.746,4.722,4.722,0,0,0,.672-1.02,4.985,4.985,0,0,0,.4-1.132,2.7,2.7,0,0,0-.037-1.53A.963.963,0,0,0,66.66-45.151Zm9.455,7.614a4.016,4.016,0,0,1-1.816-.386,3.291,3.291,0,0,1-1.244-1.057,3.756,3.756,0,0,1-.622-1.568,4.895,4.895,0,0,1,.075-1.891,6.711,6.711,0,0,1,.746-1.953,6.191,6.191,0,0,1,1.269-1.568A5.854,5.854,0,0,1,76.227-47a5.444,5.444,0,0,1,2.053-.386,4.608,4.608,0,0,1,1.742.286,2.959,2.959,0,0,1,1.107.746,2.155,2.155,0,0,1,.523,1.045,2.986,2.986,0,0,1-.012,1.182A3.583,3.583,0,0,1,81.166-43a4.132,4.132,0,0,1-.871,1,4.139,4.139,0,0,1-1.232.7,4.392,4.392,0,0,1-1.53.261,5.758,5.758,0,0,1-.634-.037,2.264,2.264,0,0,1-.61-.149.879.879,0,0,1-.423-.348.922.922,0,0,1-.075-.659,1.6,1.6,0,0,1,.473-.784,1.214,1.214,0,0,1,.871-.361,1.046,1.046,0,0,1,.473.1,1.345,1.345,0,0,0,.547.1,1.137,1.137,0,0,0,.821-.311,1.15,1.15,0,0,0,.373-.585.8.8,0,0,0-.249-.734,1.777,1.777,0,0,0-1.269-.336,2.724,2.724,0,0,0-1.966.8,3.745,3.745,0,0,0-1.07,1.916,2.517,2.517,0,0,0,.211,1.891,1.64,1.64,0,0,0,1.53.771,3.348,3.348,0,0,0,1.132-.174,3.919,3.919,0,0,0,1.057-.622,1.36,1.36,0,0,1,.871-.348.887.887,0,0,1,.7.311.855.855,0,0,1,.174.784,1.562,1.562,0,0,1-.174.411,2.065,2.065,0,0,1-.323.411,4.767,4.767,0,0,1-1.841,1.132A6.417,6.417,0,0,1,76.115-37.537Zm11.819-5.076,1.841,3.259a.673.673,0,0,1,.137.336.952.952,0,0,1-.037.336,1.432,1.432,0,0,1-.522.8,1.36,1.36,0,0,1-.871.348.85.85,0,0,1-.423-.112.894.894,0,0,1-.323-.311l-1.617-2.787L83.38-37.96a1.145,1.145,0,0,1-.485.336,1.482,1.482,0,0,1-.46.087.849.849,0,0,1-.7-.348.909.909,0,0,1-.174-.8,2.943,2.943,0,0,1,.112-.323,1.178,1.178,0,0,1,.261-.348l3.185-3.235-1.667-2.936a1.158,1.158,0,0,1-.05-.672A1.382,1.382,0,0,1,83.928-47a1.388,1.388,0,0,1,.871-.336.876.876,0,0,1,.411.112.867.867,0,0,1,.336.311l1.393,2.463,2.438-2.463a1.456,1.456,0,0,1,.46-.311,1.194,1.194,0,0,1,.46-.112.9.9,0,0,1,.734.361.92.92,0,0,1,.187.809,1.378,1.378,0,0,1-.4.647Z"
              transform="translate(-9.341 54.432)"
              stroke="none"
            />
          </S.LogoText>
        </g>
      </S.Svg>
    </S.Link>
  </Link>
);
