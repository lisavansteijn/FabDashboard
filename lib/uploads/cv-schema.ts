import { z } from "zod";
import { ACCEPTED_CSV_TYPES } from "~~/lib/constants";

export const cvschema = z.object({
  csvFile: z
    .instanceof(File, {
      message: "Please select a .CSV file.",
    })
    .refine(file => ACCEPTED_CSV_TYPES.has(file.type), {
      message: "Please upload a valid CSV file (text/csv).",
    }),
});
export type CvSchema = z.output<typeof cvschema>;
