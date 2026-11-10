import type { ImageUrls } from "@/entities/user";

export interface IDirectoryService {
  id: string;
  name: string;
  mark: MarkType;
  public_name: string;
  avatar: ImageUrls;
}

export interface IDirectoryLocationService extends IDirectoryService {
  duration: number;
  category: string | null;
  prices: {
    price: number;
    cost_price?: number | null;
  };
  users: Array<{ id: string }>;
}
