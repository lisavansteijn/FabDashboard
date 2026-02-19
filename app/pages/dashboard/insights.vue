<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import type { InsertSalesReport } from "~~/lib/db/schema/sales-report";
import type { CvSchema } from "~~/lib/uploads/cv-schema";
import Papa from "papaparse";
import { useInsights } from "~~/app/compositions/insights";
import { buildUserInsightsPath, NUXT_PATHS } from "~~/lib/constants";
import { cvschema } from "~~/lib/uploads/cv-schema";

const { $csrfFetch } = useNuxtApp();
const Insights = useInsights();
const authStore = useAuthStore();

async function onSubmit(event: FormSubmitEvent<CvSchema>) {
  Insights.cvState.csvFile = event.data.csvFile;
  Insights.resetStore();

  try {
    const csvDatas = await readCSVFile(event.data.csvFile);
    await processCSVData(csvDatas);
    Insights.readFile.value = true;

    const userId = authStore.user?.id;
    if (userId == null) {
      return navigateTo(NUXT_PATHS.get("Insights"), { replace: true });
    }
    return await navigateTo({
      path: buildUserInsightsPath(userId),
      query: { name: Insights.cvState.csvFile?.name },
    });
  }
  catch (error: any) {
    Insights.handleErrors(error);
  }
  finally {
    Insights.processing.value = false;
  }
}

async function readCSVFile(file: File): Promise<InsertSalesReport[]> {
  return new Promise((resolve, reject) => {
    Insights.processing.value = true;

    Papa.parse(file, {
      header: true,
      delimiter: ",",
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      transform: (value: string) => value.trim(),
      complete: (results: any) => {
        // Process row...
        const csvDatas = results.data.map((val: any) => ({
          day: val.Day ?? "",
          source: val.Source ?? "",
          listingTitle: val["Listing Title"] ?? "",
          license: val.License ?? "",
          basePrice: Number.parseFloat(val["Base Price"] ?? "0"),
          totalVAT: Number.parseFloat(val["Total VAT"] ?? "0"),
          totalTax: Number.parseFloat(val["Total Tax"] ?? "0"),
          netUnits: Number.parseInt(val["Net Units"] ?? "0"),
          netSales: Number.parseFloat(val["Net Sales"] ?? "0"),
        }));
          // processedCount.value++;

        resolve(csvDatas);
      },
      error: (err: any) => {
        reject(err);
      },
    });
  });
}

async function processCSVData(data: InsertSalesReport[]): Promise<void> {
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
      Insights.handleErrors(error);
      throw error; // Re-throw to stop processing
    }
  }
}
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="text-4xl font-bold mb-2">
        Sales Insights
      </h1>
      <div class="card bg-base-100 w-full shadow-sm p-4 mt-2">
        <p class="text-sm font-bold">
          This is the insights page!
        </p>
        <p class="text-sm">
          Here you can see your sales, specific trends over the months and more! Simply import your CSV file (If you haven't already) and you're good to go!
        </p>
      </div>
    </div>

    <AppModal id="upload-csv-modal" title="Upload CSV">
      <template #trigger>
        <UButton
          label="Upload CSV"
          class="btn btn-primary"
          icon="tabler:upload"
        />
      </template>
      <template #content>
        <div class="mt-4 flex justify-center mx-auto">
          <UForm
            :schema="cvschema"
            :state="Insights.cvState"
            class="space-y-4 w-64 bg-base-200 p-4 rounded-lg border-4 border-base-300"
            @submit="onSubmit($event)"
          >
            <UFormField
              name="csvFile"
              label="Upload your .CSV file"
              description=".CSV file (max. 2MB)"
            >
              <UFileUpload
                v-slot="{ open, removeFile }"
                v-model="Insights.cvState.csvFile"
                accept="text/csv"
                class="mt-3"
              >
                <div class="flex flex-wrap items-center gap-3">
                  <UAvatar
                    size="lg"
                    icon="tabler:file"
                  />

                  <UButton
                    :label="Insights.cvState.csvFile ? 'Change .CSV file' : 'Upload .CSV file'"
                    class="btn btn-success btn-outline"
                    @click="open()"
                  />
                </div>

                <p v-if="Insights.cvState.csvFile" class="text-xs text-muted mt-1.5">
                  {{ Insights.cvState.csvFile.name }}

                  <UButton
                    v-if="!Insights.processing.value"
                    label="Remove"
                    class="btn btn-error btn-outline "
                    icon="tabler:trash"
                    @click="removeFile()"
                  />
                </p>
                <!-- If we're loading, show a loading spinner -->
                <Icon
                  v-if="Insights.processing.value"
                  name="tabler:loader"
                  class="animate-spin mx-auto mt-3"
                  size="24"
                />
              </UFileUpload>
            </UFormField>
            <UButton
              type="submit"
              label="Submit"
              class="btn btn-primary mx-auto block"
              icon="tabler:upload"
              :disabled="Insights.processing.value"
              @click="Insights.hasPressedSubmit.value = true"
            />
          </UForm>
        </div>
      </template>
    </AppModal>

    <div class="divider" />
    <div
      v-if="Insights.hasError.value"
      role="alert"
      class="alert alert-error"
    >
      <Icon name="tabler:alert-circle" size="24" />
      <span>{{ Insights.errorMsg.value }}</span>
    </div>
    <div
      v-if="Insights.readFile.value && !Insights.processing.value"
      role="alert"
      class="alert alert-success mb-2"
    >
      <Icon name="tabler:check-circle" size="24" />
      <span>File uploaded successfully!</span>
    </div>

    <!-- Child route renders here (e.g. output.vue = report/charts) -->
    <NuxtPage />
  </div>
</template>
