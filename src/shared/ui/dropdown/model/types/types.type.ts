import type { PropsWithChildren, RefObject } from "react";

export type Side = "top" | "bottom" | "left" | "right" | "top_right" | "bottom_right" | "center_right";
export type Align = "start" | "center" | "end";

export type IDropdownContext = {
  open: boolean;
  setOpen: (v: boolean) => void;
  close: () => void;
  mainRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
} | null;

export type TDropdownContentProps = {
  children: React.ReactNode;
  side?: Side,
  align?: Align,
  className?: string;
}

export type TDropdownProps = {
  children?: React.ReactNode;
  className?: string;
};

export type TDropdownComponent = React.FC<TDropdownProps> & {
  Trigger: React.FC<PropsWithChildren>;
};
