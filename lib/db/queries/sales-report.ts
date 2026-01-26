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
      value: number;
    };
  }[] = [];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  reports.forEach((report) => {
    populateInsights(report, insights, "totalRevenue", monthNames, report.netSales);
    populateInsights(report, insights, "totalSales", monthNames, report.netUnits);
  });

  // Sort once by month/year (both totalRevenue and totalSales share the same month/year per entry)
  insights.sort((a: any, b: any) => {
    // Use totalRevenue as reference for sorting (or totalSales if totalRevenue doesn't exist)
    const aData = a.totalRevenue || a.totalSales;
    const bData = b.totalRevenue || b.totalSales;

    if (!aData || !bData)
      return 0;

    if (aData.year !== bData.year) {
      return aData.year - bData.year;
    }
    return monthNames.indexOf(aData.month) - monthNames.indexOf(bData.month);
  });

  // Transform to the desired structure: single object with arrays for each key
  const transformedInsights = [{
    totalRevenue: insights
      .map(insight => insight.totalRevenue)
      .filter((item): item is { month: string; year: number; value: number } => item !== undefined),
    totalSales: insights
      .map(insight => insight.totalSales)
      .filter((item): item is { month: string; year: number; value: number } => item !== undefined),
  }];

  return transformedInsights;
}

function populateInsights(
  report: any,
  insights: Array<{ [key: string]: { month: string; year: number; value: number } }>,
  key: string,
  monthNames: string[],
  value: number,
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

  if (existingInsight) {
    // Add to existing month, then round to 2 decimal places
    existingInsight[key].value = Math.round((existingInsight[key].value + value) * 100) / 100;
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
