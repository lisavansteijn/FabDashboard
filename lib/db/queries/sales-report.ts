import type { InsertSalesReport } from "../schema";

import { eq } from "drizzle-orm";
import { createHash } from "~~/utils/hash";
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

export async function insertSalesReports(
  reports: InsertSalesReport[],
  userId: number,
) {
  // 1. Prepare the data: Add the userId and hash to every single item
  const valuesToInsert = reports.map(report => ({
    ...report,
    userId,
    hash: createHash(report),
  }));

  // 2. Perform a single batch insert
  const createdRecords = await db
    .insert(SalesReport)
    .values(valuesToInsert)
    .onConflictDoNothing({
      target: SalesReport.hash,
    })
    .returning();

  return createdRecords;
}

export async function getSalesInsights(userId: number) {
  const reports = await findSalesReportsByUserId(userId);

  if (!reports || reports.length === 0) {
    // Return empty array instead of error - allows frontend to handle empty state
    return [];
  }

  return populateInsights(reports);
}

type InsightItem = {
  month: string;
  year: number;
  value: number | undefined;
  professional: number | undefined;
  personal: number | undefined;
};

// Define the map structure: keys are 'totalRevenue', etc.
type InsightMap = Record<string, InsightItem[]>;

function populateInsights(reports: any[]): InsightMap {
  // 1. Initialize the object so it's not undefined
  const insights: InsightMap = {};

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  reports.forEach((report: any) => {
    const reportDate = new Date(report.day);
    const reportMonth = monthNames[reportDate.getMonth()];
    const reportYear = reportDate.getFullYear();

    const keys = ["totalRevenue", "totalSales", "averageRevenuePerProduct", "licenseType"];

    for (const key of keys) {
      let newItem: InsightItem;
      if (key === "licenseType") {
        const [professional, personal] = grabLicenseValue(key, report);

        newItem = {
          month: reportMonth as string,
          year: reportYear as number,
          value: undefined,
          professional: professional as number,
          personal: personal as number,
        };
      }
      else {
        const value = grabValue(key, report);

        newItem = {
          month: reportMonth as string,
          year: reportYear as number,
          value: value as number,
          professional: undefined,
          personal: undefined,
        };
      }

      // 2. Check if the key exists, if not, initialize the array
      if (!insights[key]) {
        insights[key] = [newItem];
      }
      else {
        // 3. Look for an existing entry for this specific month/year
        const existingItem = insights[key].find(
          item => item.month === reportMonth && item.year === reportYear,
        );

        if (!existingItem) {
          insights[key].push(newItem);
        }
        else {
          // Add to existing value and round
          if (key === "licenseType") {
            existingItem.professional! += newItem.professional as number;
            existingItem.personal! += newItem.personal as number;
          }
          else {
            existingItem.value = Math.round((existingItem.value! + newItem.value!) * 100) / 100;
          }
        }
      }
    }
  });

  return insights;
}

function grabValue(key: string, report: any) {
  if (key === "totalRevenue") {
    return report.netSales;
  }
  else if (key === "totalSales") {
    return report.netUnits;
  }
  else if (key === "averageRevenuePerProduct") {
    return report.netSales / report.netUnits;
  }
}

function grabLicenseValue(key: string, report: any): [number, number] {
  const license = String(report.license).toLowerCase().trim();
  const isProfessional = license.includes("professional");
  const isPersonal = license.includes("personal");

  const netUnits = report.netUnits;
  // grab the count of the license type, and check the net Units against the license type
  const professionalCount = isProfessional ? netUnits : 0;
  const personalCount = isPersonal ? netUnits : 0;

  return [professionalCount, personalCount];
}
