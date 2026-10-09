import type { SVGProps } from "react";
const SvgNetworkOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="network-off_svg__icon network-off_svg__icon-tabler network-off_svg__icons-tabler-outline network-off_svg__icon-tabler-access-point-off"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m3 3 18 18M14.828 9.172A4 4 0 0 1 16 12M17.657 6.343a8 8 0 0 1 1.635 8.952M9.168 14.828a4 4 0 0 1 0-5.656M6.337 17.657a8 8 0 0 1 0-11.314" />
  </svg>
);
export default SvgNetworkOff;
