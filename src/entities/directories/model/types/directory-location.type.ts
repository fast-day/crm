import type { ImageUrls } from "@/entities/user";

export interface IDirectoryLocation {
  id: string;
  name: string;
  avatar: ImageUrls;
  active?: boolean;
}
