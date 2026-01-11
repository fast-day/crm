import z from "zod";

export const timezoneOffsetMap: Record<string, string> = {
  "Europe/Moscow": "+03:00",
  "Europe/Kaliningrad": "+02:00",
  "Europe/Samara": "+04:00",
  "Asia/Yekaterinburg": "+05:00",
  "Asia/Omsk": "+06:00",
  "Asia/Krasnoyarsk": "+07:00",
  "Asia/Irkutsk": "+08:00",
  "Asia/Yakutsk": "+09:00",
  "Asia/Vladivostok": "+10:00",
  "Asia/Magadan": "+11:00",
  "Asia/Kamchatka": "+12:00",

  "Europe/Minsk": "+03:00",

  "Asia/Aqtau": "+05:00",
  "Asia/Aqtobe": "+05:00",
  "Asia/Almaty": "+06:00",
  "Asia/Qostanay": "+06:00",
  "Asia/Qyzylorda": "+05:00",
};

export const timezoneSchema = z.string("Укажите часовой пояс").min(1, "Укажите часовой пояс");

export const timezoneCredSchema = 
  timezoneSchema.transform(((tz: string) => ({ timezone: tz, timezone_offset: timezoneOffsetMap[tz] ?? "+00:00" })));
