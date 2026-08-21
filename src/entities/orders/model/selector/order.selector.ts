import type { RootState } from "@/app/providers/redux/config";

export const orderSelector = (state: RootState) => state.order;
