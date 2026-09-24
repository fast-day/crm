import { CoinIcon, CloseIcon, PaymentSuccessIcon, SubscribeIcon, GiftIcon, ShopIcon, MegaphoneIcon, PaletteIcon, HandbagIcon, GraphUpIcon, GraphDownIcon, LayersIcon, PieIcon, WalletIcon, RepeatIcon, RecipeIcon, ToolsIcon } from "../icons";

export const TRANSACTION_TYPE: Record<string, React.ComponentType> = {
  cart: PaymentSuccessIcon,
  undo: CloseIcon,
  coin: CoinIcon,
  gift: GiftIcon,
  handbag: HandbagIcon,
  layers: LayersIcon,
  pie: PieIcon,
  wallet: WalletIcon,
  repeat: RepeatIcon,
  recipe: RecipeIcon,
  reply: MegaphoneIcon,
  shop: ShopIcon,
  stars: SubscribeIcon,
  tools: ToolsIcon,
  increase: GraphUpIcon,
  decrease: GraphDownIcon,
  palette: PaletteIcon,
};
