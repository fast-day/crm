import type { SVGProps } from "react";
const SvgChecks = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="checks_svg__icon checks_svg__icon-tabler checks_svg__icons-tabler-outline checks_svg__icon-tabler-checks"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m7 12 5 5L22 7M2 12l5 5m5-5 5-5" />
  </svg>
);
export default SvgChecks;
