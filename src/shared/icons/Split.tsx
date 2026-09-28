import type { SVGProps } from "react";
const SvgSplit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.155 3.255c-1.912 0-3.49 1.482-3.49 3.334v6.666c0 1.852 1.579 3.334 3.49 3.334h9.687c1.913 0 3.49-1.482 3.49-3.334V6.59c0-1.852-1.577-3.334-3.49-3.334H5.155m0 1.667h4.01v10h-4.01c-1.012 0-1.823-.758-1.823-1.667V6.59c0-.91.811-1.667 1.823-1.667m5.677 0h4.01c1.013 0 1.824.758 1.824 1.667v6.666c0 .91-.811 1.667-1.824 1.667h-4.01z"
    />
  </svg>
);
export default SvgSplit;
