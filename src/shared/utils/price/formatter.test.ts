import { describe, it, expect } from "vitest";
import { formatPrice } from './formatter';

describe("formatPrice", () => {
  it("форматирует целое число с пробелами", () => {
    expect(formatPrice(1555)).toBe("1\u00A0555")
  });

  it("обработка 0", () => {
    expect(formatPrice(0)).toBe("0");
  });

  it("обрабатывает отрицательное число", () => {
    expect(formatPrice(-300)).toBe("-300");
  });
});
