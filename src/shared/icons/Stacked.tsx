import type { SVGProps } from "react";
const SvgStacked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.992 2.441a2.5 2.5 0 0 0-2.5 2.5v1.667a2.5 2.5 0 0 0 2.5 2.5h10a2.5 2.5 0 0 0 2.5-2.5V4.941a2.5 2.5 0 0 0-2.5-2.5zm0 1.667h10c.46 0 .834.373.834.833v1.667c0 .46-.374.833-.834.833h-10a.834.834 0 0 1-.833-.833V4.941c0-.46.373-.833.833-.833m0 6.667a2.5 2.5 0 0 0-2.5 2.5v1.666a2.5 2.5 0 0 0 2.5 2.5h10a2.5 2.5 0 0 0 2.5-2.5v-1.666a2.5 2.5 0 0 0-2.5-2.5zm0 1.666h10c.46 0 .834.374.834.834v1.666c0 .46-.374.834-.834.834h-10a.834.834 0 0 1-.833-.834v-1.666c0-.46.373-.834.833-.834"
    />
  </svg>
);
export default SvgStacked;
