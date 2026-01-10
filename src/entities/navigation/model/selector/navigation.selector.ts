import type { RootState } from "@/app/providers/redux/config";

export const navigationSelector = (state: RootState) => state.navigation;
