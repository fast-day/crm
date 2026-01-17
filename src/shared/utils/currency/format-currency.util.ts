import { getCurrencySymbol } from "./currency-symbol.util";

export function formatCurrency(value: number | string, currency: CurrencyType): string {
  const symbol = getCurrencySymbol(currency);

  const currencyPref: CurrencyType[] = ["USD", "EUR"];
  return currencyPref.includes(currency) ? `${symbol}${value}` : `${value} ${symbol}`;
}
