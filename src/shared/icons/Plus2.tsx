import type { SVGProps } from "react";
const SvgPlus2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.992 2.441a.834.834 0 0 0-.833.834v5.833H3.326a.834.834 0 0 0 0 1.667h5.833v5.833a.834.834 0 0 0 1.667 0v-5.833h5.833a.834.834 0 0 0 0-1.667h-5.833V3.275a.834.834 0 0 0-.834-.834"
    />
  </svg>
);
export default SvgPlus2;
