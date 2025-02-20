import { isProduction } from "../PathMap";

export const MissionsAppLink = isProduction
  ? "https://missions.tadle.com"
  : "https://preview-missions.tadle.com";

export const getGoMissionsAppUrl = (path: string = "", locale: string = "") => {
  return `${MissionsAppLink}/${locale}${path}`;
};