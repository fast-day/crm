export const GET_ONLINE_STATUS = () => 
  typeof navigator !== "undefined" && 
  typeof navigator.onLine === "boolean" ? navigator.onLine : true;
