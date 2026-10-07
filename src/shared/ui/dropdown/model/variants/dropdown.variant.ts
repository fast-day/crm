import type { Align, Side } from "../types/types.type";

export const alignVariant: Record<Align, Record<Side, string>> = {
  start: {
    top: "left-0",
    bottom: "left-0",
    left: "top-0",
    right: "top-0",
    center_right: "left-57 top-1/2 -translate-y-1/2",
    top_right: "top-0",
    bottom_right: "",
  },
  center: {
    top: "left-1/2 -translate-x-1/2",
    bottom: "left-1/2 -translate-x-1/2",
    left: "top-1/2 -translate-y-1/2",
    right: "top-1/2 -translate-y-1/2",
    center_right: "left-57 top-1/2 -translate-y-1/2",
    top_right: "top-0",
    bottom_right: "",
  },
  end: {
    top: "right-0",
    bottom: "right-0",
    left: "bottom-0",
    right: "bottom-0",
    center_right: "left-57 top-1/2 -translate-y-1/2",
    top_right: "left-57 top-22",
    bottom_right: "bottom-3 left-56.5",
  },
};