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
