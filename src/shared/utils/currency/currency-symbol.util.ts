const CURRENCY_SYMBOL_MAP: Record<CurrencyType, string> = {
  USD: "$",
  EUR: "€",
  RUB: "₽",
};

export function getCurrencySymbol(currency: CurrencyType): string {
  return CURRENCY_SYMBOL_MAP[currency];
}
