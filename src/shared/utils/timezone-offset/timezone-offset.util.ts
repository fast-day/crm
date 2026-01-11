export function extractTimezoneOffset(label: string): string {
  const match = label.match(/UTC([+-]\d{1,2})/);

  if (!match) throw new Error("Не удалось определить timezone offset");

  const hours = match[1].padStart(3, match[1].startsWith("-") ? "-0" : "+0");

  return `${hours}:00`;
}
