import type { SVGProps } from "react";
const SvgUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11.99 1.953c-.261 0-.522.086-.718.281l-4.687 4.72L7.99 8.358l3-2.968v10.562a1 1 0 0 0 2 0V5.391l3 2.968 1.406-1.406-4.687-4.719a1 1 0 0 0-.72-.28m-8 12a1 1 0 0 0-1 1v2a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-2a1 1 0 0 0-2 0v2a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-2a1 1 0 0 0-1-1"
    />
  </svg>
);
export default SvgUpload;
