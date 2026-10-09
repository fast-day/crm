import type { SVGProps } from "react";
const SvgTelegram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12m9.8 5.5.204-3.059 5.564-5.022c.245-.216-.053-.322-.377-.125l-6.867 4.332-2.967-.926c-.64-.196-.645-.636.144-.952l11.56-4.458c.527-.24 1.037.127.835.935l-1.968 9.277c-.138.659-.536.816-1.088.512l-2.999-2.215L10.4 17.2l-.014.013c-.16.157-.294.287-.586.287"
    />
  </svg>
);
export default SvgTelegram;
