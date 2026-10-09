import type { TSupportContactKey, TSupportContacts } from "../types/support.type";

export const SUPPORT_CONTACTS: Record<TSupportContactKey, TSupportContacts> = {
  phone: { label: "+7 (961) 328-58-27", href: "tel:+79613285827" },
  telegram: { label: "Telegram", href: "https://t.me/ikiryukha" },
  instagram: { label: "Instagram", href: "https://www.instagram.com/ikiryukha" },
};
