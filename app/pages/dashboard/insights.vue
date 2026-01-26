<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import type { InsertSalesReport } from "~~/lib/db/schema/sales-report";
import Papa from "papaparse";
import { z } from "zod";
import { ACCEPTED_CSV_TYPES } from "~~/lib/constants";

const { $csrfFetch } = useNuxtApp();

const state = reactive({
  readFile: false as boolean, // whether the CSV file has been read
  errorMsg: "Error parsing CSV file... Please try again." as string, // the error message
  hasError: false as boolean, // whether there has been an error
  processing: false as boolean, // whether the CSV is being processed
  processedCount: 0 as number, // the number of rows processed
  totalCount: 0 as number, // the total number of rows in the CSV
  hasProcessed: false as boolean, // whether the CSV has been processed
  hasPressedSubmit: false as boolean, // whether the submit button has been pressed
});

const schema = z.object({
  csvFile: z
    .instanceof(File, {
      message: "Please select a .CSV file.",
    })
    .refine(file => ACCEPTED_CSV_TYPES.has(file.type), {
      message: "Please upload a valid CSV file (text/csv).",
    }),
});
type Schema = z.output<typeof schema>;

const schemaState = reactive<Partial<Schema>>({
  csvFile: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  schemaState.csvFile = event.data.csvFile;
  state.hasProcessed = false;
  state.processing = true;
  state.hasError = false;
  state.processedCount = 0;
  state.totalCount = 0;

  try {
    // added this for debug reasons... remove later.
    return await navigateTo({
      path: `/dashboard/report/${schemaState.csvFile?.name}`,
    });
    await readCSVFile(event.data.csvFile);
    state.hasProcessed = true;
    state.readFile = true;

    return await navigateTo({
      path: `/dashboard/report/${schemaState.csvFile?.name}`,
    });
  }
  catch (error: any) {
    handleErrors(error);
    state.hasProcessed = false;
  }
  finally {
    state.processing = false;
  }
}

async function readCSVFile(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse(file, {
        header: true,
        delimiter: ",",
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim(),
        transform: (value: string) => value.trim(),
        complete: async (results: any) => {
          try {
            const rows = results.data.filter((row: any) => {
              // Filter out empty rows
              return row && Object.keys(row).length > 0 && row.Day;
            });

            state.totalCount = rows.length;
            for (let i = 0; i < rows.length; i++) {
              const val = rows[i];
              // Process row...
              const csvData: InsertSalesReport = {
                day: val.Day ?? "",
                source: val.Source ?? "",
                listingTitle: val["Listing Title"] ?? "",
                license: val.License ?? "",
                basePrice: Number.parseFloat(val["Base Price"] ?? "0"),
                totalVAT: Number.parseFloat(val["Total VAT"] ?? "0"),
                totalTax: Number.parseFloat(val["Total Tax"] ?? "0"),
                netUnits: Number.parseInt(val["Net Units"] ?? "0"),
                netSales: Number.parseFloat(val["Net Sales"] ?? "0"),
              };

              await processCSVData(csvData);
              state.processedCount++;

              // Yield to UI between batches
              await new Promise(resolve => setTimeout(resolve, 10));
            }

            resolve();
          }
          catch (error) {
            reject(error);
          }
        },
        error: (err: any) => {
          reject(err);
        },
      });
    }
    catch (err: any) {
      reject(err);
    }
  });
}

async function processCSVData(data: InsertSalesReport): Promise<void> {
  try {
    // Send data to the server to be added to the database...
    await $csrfFetch(`/api/sales-report`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  catch (error: any) {
    // Log error but don't stop processing other rows
    console.error("Error processing CSV row:", error);
    // Only set error state if it's a critical error
    if (error.message?.includes("401") || error.message?.includes("403") || error.message?.includes("422")) {
      handleErrors(error);
      throw error; // Re-throw to stop processing
    }
  }
}

function handleErrors(error: any) {
  state.hasError = true;
  state.readFile = false;
  console.error("Error: ", error);
}
</script>

<template>
  <div class="container max-w-2xl mx-auto mt-4 pt-10">
    <div class="mb-2">
      <h1 class="text-2xl font-bold mb-2">
        Sales Insights
      </h1>
      <p class="text-sm">
        This is the insights page! Here you can see your sales, specific trends over the months and more! Simply import your CSV file and you're good to go!
      </p>
    </div>

    <div class="mt-4 flex justify-center mx-auto">
      <UForm
        :schema="schema"
        :state="schemaState"
        class="space-y-4 w-64 bg-base-100 p-4 rounded-lg "
        @submit="onSubmit"
      >
        <UFormField
          name="csvFile"
          label="Upload your .CSV file"
          description=".CSV file (max. 2MB)"
        >
          <UFileUpload
            v-slot="{ open, removeFile }"
            v-model="schemaState.csvFile"
            accept="text/csv"
            class="mt-3"
          >
            <div class="flex flex-wrap items-center gap-3">
              <UAvatar
                size="lg"
                icon="tabler:file"
              />

              <UButton
                :label="schemaState.csvFile ? 'Change .CSV file' : 'Upload .CSV file'"
                class="btn btn-secondary btn-outline"
                @click="open()"
              />
            </div>

            <p v-if="schemaState.csvFile" class="text-xs text-muted mt-1.5">
              {{ schemaState.csvFile.name }}

              <UButton
                label="Remove"
                class="btn btn-error btn-outline "
                icon="tabler:trash"
                @click="removeFile()"
              />
            </p>
          </UFileUpload>
        </UFormField>
        <UButton
          type="submit"
          label="Submit"
          class="btn btn-primary mx-auto block"
          icon="tabler:upload"
          @click="state.hasPressedSubmit = true;"
        />
      </UForm>
    </div>

    <!-- if no file has been uploaded, show a message -->
    <div v-if="!state.readFile && !state.hasProcessed" class="mt-4 text-center">
      <p class="text-sm text-muted">
        Please upload a .CSV file to get started.
      </p>
    </div>

    <!-- if results are in, show them off here... -->
    <div
      v-if="state.hasError"
      role="alert"
      class="alert alert-error"
    >
      <Icon name="tabler:alert-circle" size="24" />
      <span>{{ state.errorMsg }}</span>
    </div>

    <!-- if the CSV is being processed, show a loading spinner -->
    <div v-if="state.processing" class="mt-4 text-center">
      <span class="loading loading-spinner loading-md" />
      <p class="text-sm text-muted mt-2">
        Processing {{ state.processedCount }} of {{ state.totalCount }} rows...
      </p>
    </div>
  </div>
</template>
