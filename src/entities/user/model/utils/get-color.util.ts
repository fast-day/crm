import { AVATAR_COLORS } from "../constant/colors.constant";

export const getAvatarColor = (id: string, opacity = 1) => {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const result = AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];

  return `rgb(${result} / ${opacity})`;
}
