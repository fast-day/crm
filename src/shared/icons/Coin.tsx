import type { SVGProps } from "react";
const SvgCoin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7.5 9.375c3.452 0 6.25-1.26 6.25-2.812 0-1.554-2.798-2.813-6.25-2.813S1.25 5.01 1.25 6.563 4.048 9.375 7.5 9.375M13.75 7.555c2.852.265 5 1.398 5 2.758 0 1.554-2.797 2.812-6.25 2.812-1.531 0-2.937-.25-4.023-.656 2.992-.211 5.273-1.375 5.273-2.781z"
      opacity={0.2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 9.375c3.452 0 6.25-1.26 6.25-2.812 0-1.554-2.798-2.813-6.25-2.813S1.25 5.01 1.25 6.563 4.048 9.375 7.5 9.375"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.25 6.563v3.125c0 1.554 2.797 2.812 6.25 2.812s6.25-1.258 6.25-2.812V6.562M5 9.14v3.126"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.75 7.555c2.852.265 5 1.398 5 2.758 0 1.554-2.797 2.812-6.25 2.812-1.531 0-2.937-.25-4.023-.656"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.25 12.445v.992c0 1.555 2.797 2.813 6.25 2.813s6.25-1.258 6.25-2.812v-3.126M15 12.89v3.126M10 9.14v6.876"
    />
  </svg>
);
export default SvgCoin;
