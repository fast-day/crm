export const getOnlineStatus = () => 
  typeof navigator !== "undefined" && 
  typeof navigator.onLine === "boolean" ? navigator.onLine : true;
