import type { SVGProps } from "react";
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.492 17.492a3.333 3.333 0 0 0 3.334-3.333v-2.5a.834.834 0 0 0-1.667 0v2.5c0 .92-.746 1.666-1.667 1.666H5.826c-.921 0-1.667-.745-1.667-1.666V7.492c0-.92.746-1.666 1.667-1.666h2.5a.834.834 0 0 0 0-1.667h-2.5a3.333 3.333 0 0 0-3.334 3.333v6.667a3.333 3.333 0 0 0 3.334 3.333zM9.16 11.66a.85.85 0 0 0 .6-.234l6.067-6.069v2.97h1.666v-5a.834.834 0 0 0-.833-.834h-5V4.16h2.968L8.56 10.226a.86.86 0 0 0 0 1.199.85.85 0 0 0 .599.234"
    />
  </svg>
);
export default SvgShare;
