import type { InsertSalesReport } from "../schema";

import { eq } from "drizzle-orm";
import db from "../index";
import { SalesReport } from "../schema";

export async function findSalesReportsByUserId(userId: number) {
  return db.query.SalesReport.findMany({
    where: eq(SalesReport.userId, userId),
  });
};
export async function findSalesReportByHash(hash: string) {
  return db.query.SalesReport.findFirst({
    where: eq(SalesReport.hash, hash),
  });
};

export async function findSalesReportsByName(name: string) {
  return db.query.SalesReport.findMany({
    where: eq(SalesReport.listingTitle, name),
  });
};

export async function insertSalesReport(
  insertable: InsertSalesReport,
  userId: number,
  hash: string,
) {
  const [created] = await db.insert(SalesReport).values({
    ...insertable,
    userId,
    hash,
  }).onConflictDoNothing({
    target: SalesReport.hash,
  }).returning();
  return created;
}

export async function getSalesInsights(userId: number) {
  const reports = await findSalesReportsByUserId(userId);

  if (!reports || reports.length === 0) {
    // Return empty array instead of error - allows frontend to handle empty state
    return [];
  }

  const insights: {
    [key: string]: {
      month: string;
      year: number;
      value: number | string;
    };
  }[] = [];

  const licenseInsights: {
    [key: string]: {
      month: string;
      year: number;
      professional: number;
      personal: number;
    };
  }[] = [];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  reports.forEach((report) => {
    populateInsights(report, insights, "totalRevenue", monthNames, report.netSales);
    populateInsights(report, insights, "totalSales", monthNames, report.netUnits);
    populateInsights(report, insights, "averageRevenuePerProduct", monthNames, report.netSales / report.netUnits || 0);
    populateLicenseInsights(report, licenseInsights, monthNames);
  });

  // Sort once by month/year (both totalRevenue and totalSales share the same month/year per entry)
  insights.sort((a: any, b: any) => {
    // Use totalRevenue as reference for sorting (or totalSales if totalRevenue doesn't exist)
    const aData = a.totalRevenue || a.totalSales;
    const bData = b.totalRevenue || b.totalSales;
    const cData = a.averageRevenuePerProduct || b.averageRevenuePerProduct;

    if (!aData || !bData || !cData)
      return 0;

    if (aData.year !== bData.year || aData.year !== cData.year) {
      return aData.year - bData.year - cData.year;
    }
    return monthNames.indexOf(aData.month) - monthNames.indexOf(bData.month) - monthNames.indexOf(cData.month);
  });

  // Sort license insights by month/year
  licenseInsights.sort((a: any, b: any) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
  });

  // Transform to the desired structure: single object with arrays for each key
  const transformedInsights = [{
    totalRevenue: insights
      .map(insight => insight.totalRevenue)
      .filter((item): item is { month: string; year: number; value: number } => item !== undefined),
    totalSales: insights
      .map(insight => insight.totalSales)
      .filter((item): item is { month: string; year: number; value: number } => item !== undefined),
    averageRevenuePerProduct: insights
      .map(insight => insight.averageRevenuePerProduct)
      .filter((item): item is { month: string; year: number; value: number } => item !== undefined),
    LicenseType: licenseInsights.map(insight => ({
      month: insight.month,
      year: insight.year,
      professional: insight.professional,
      personal: insight.personal,
    })),
  }];

  return transformedInsights;
}

function populateInsights(
  report: any,
  insights: Array<{ [key: string]: { month: string; year: number; value: number | string } }>,
  key: string,
  monthNames: string[],
  value: number | string,
): void {
  const reportDate = new Date(report.day);
  const reportMonth = monthNames[reportDate.getMonth()];
  const reportYear = reportDate.getFullYear();

  // Find existing insight for this month/year with the same key
  const existingInsight = insights.find(
    (insight: any) =>
      insight[key]
      && insight[key].month === reportMonth
      && insight[key].year === reportYear,
  );

  if (existingInsight && existingInsight[key]) {
    // If we're dealing with a number, add to existing month, then round to 2 decimal places
    if (typeof existingInsight[key].value === "number" && typeof value === "number") {
      // Add to existing month, then round to 2 decimal places
      existingInsight[key].value = Math.round((existingInsight[key].value + value) * 100) / 100;
    }
    else {
      // If we're dealing with a string, add to existing month
      existingInsight[key].value = existingInsight[key].value + value;
    }
  }
  else {
    // Check if there's an existing entry for this month/year (might have other keys)
    const existingMonthEntry = insights.find(
      (insight: any) =>
        (insight.totalRevenue?.month === reportMonth && insight.totalRevenue?.year === reportYear)
        || (insight.totalSales?.month === reportMonth && insight.totalSales?.year === reportYear),
    );

    if (existingMonthEntry) {
      // Add the new key to existing month entry
      existingMonthEntry[key] = {
        month: reportMonth,
        year: reportYear,
        value: Math.round(value * 100) / 100,
      };
    }
    else {
      // Create new month entry with this key
      insights.push({
        [key]: {
          month: reportMonth,
          year: reportYear,
          value: Math.round(value * 100) / 100,
        },
      });
    }
  }
}

function populateLicenseInsights(
  report: any,
  licenseInsights: Array<{ month: string; year: number; professional: number; personal: number }>,
  monthNames: string[],
): void {
  const reportDate = new Date(report.day);
  const reportMonth = monthNames[reportDate.getMonth()];
  const reportYear = reportDate.getFullYear();

  // Normalize license value (case-insensitive)
  const license = String(report.license).toLowerCase().trim();
  const isProfessional = license.includes("professional") || license.includes("pro");
  const isPersonal = license.includes("personal") || (!isProfessional && license.length > 0);

  // Find existing license insight for this month/year
  const existingInsight = licenseInsights.find(
    insight =>
      insight.month === reportMonth
      && insight.year === reportYear,
  );

  if (existingInsight) {
    // Increment the appropriate counter based on license type
    if (isProfessional) {
      existingInsight.professional += report.netUnits || 1;
    }
    if (isPersonal) {
      existingInsight.personal += report.netUnits || 1;
    }
  }
  else {
    // Create new month entry
    licenseInsights.push({
      month: reportMonth,
      year: reportYear,
      professional: isProfessional ? (report.netUnits || 1) : 0,
      personal: isPersonal ? (report.netUnits || 1) : 0,
    });
  }
}
