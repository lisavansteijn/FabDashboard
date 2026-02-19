export const ACCEPTED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
]);

export const ACCEPTED_CSV_TYPES = new Set([
  "text/csv",
]);

export type CSVDataObject = {
  [index: number]: string;
  day: Date;
  source: string;
  listingTitle: string;
  license: string;
  basePrice: number;
  totalVAT: number;
  totalTax: number;
  netUnits: number;
  netSales: number;
};

/** Paths use trailing slashes for directory-style routes (e.g. /dashboard/insights/). */
export const NUXT_PATHS = new Map([
  ["Home", "/"],
  ["Dashboard", "/dashboard/"],
  ["Insights", "/dashboard/insights/"],
  ["UserInsightsPath", "/dashboard/insights/[userid]/"],
  ["Products", "/dashboard/products/"],
  ["Trello", "/dashboard/trello/"],
  ["SignOut", "/dashboard/sign-out/"],
  ["SalesReport", "/sales-report/"],
  ["Error", "/error/"],
]);

/** Build the insights URL for a given user id (replaces [userid] in UserInsightsPath). */
export function buildUserInsightsPath(userId: number | string): string {
  return (NUXT_PATHS.get("UserInsightsPath") as string).replace("[userid]", String(userId));
}
