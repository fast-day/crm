import type { SVGProps } from "react";
const SvgArrowCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0M13.36 7.475a.625.625 0 0 1 0 .883l-4.167 4.167a.625.625 0 0 1-.884 0l-1.667-1.667a.625.625 0 1 1 .884-.883l1.225 1.224 1.862-1.862 1.863-1.862a.625.625 0 0 1 .884 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowCircle;
