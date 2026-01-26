<script lang="ts" setup>
import { BarChart, LegendPosition } from "vue-chrts";

defineOptions({
  tags: ["barcharts", "vertical"],
});
withDefaults(
  defineProps<{
    showTitle?: boolean;
  }>(),
  {
    showTitle: true,
  },
);
const route = useRoute();
// const authStore = useAuthStore();
const { $csrfFetch } = useNuxtApp();

const { data: insights, error, pending } = await useAsyncData(`insight:${route.params.id}`, () => $csrfFetch<any>("/api/sales-report", {
  method: "GET",
}));

// Computed to get the chart data
const totalRevenueData = computed(() => {
  return insights.value?.[0]?.totalRevenue || [];
});

const totalSalesData = computed(() => {
  return insights.value?.[0]?.totalSales || [];
});

// Revenue categories for the chart
const RevenueCategories = computed(() => ({
  value: {
    name: "Revenue",
    color: "#22c55e",
  },
}));

// Revenue categories for the chart
const SalesCategories = computed(() => ({
  value: {
    name: "Sales",
    color: "#22c55e",
  },
}));

// X formatter - uses the actual month from the data
// We keep this globally for now, as all stats are using the same months anyways.
function xFormatter(i: number): string {
  const data = totalRevenueData.value;
  if (data && data[i]) {
    return data[i].month || "";
  }
  return "";
}

const yFormatter = (tick: number) => tick.toString();
</script>

<template>
  <div class="container max-w-4xl mx-auto mt-4 pt-10">
    <h1 class="text-4xl font-bold mb-2 pb-4">
      🛒 Sales Report Overview
    </h1>

    <div class="card bg-base-100 w-full shadow-sm p-4 my-4">
      <h3 class="text-sm text-muted italic">
        <strong>(CSV file:</strong> {{ route.params.id }})
      </h3>
      <p class="text-sm pt-2">
        This is the sales report overview page! Here you'll find an overview of your sales, specific trends over the months and more, based off the CSV file you imported.
      </p>
      <!-- if we have an error, show it -->
      <div
        v-if="error"
        role="alert"
        class="alert alert-error my-4"
      >
        <Icon name="tabler:alert-circle" size="24" />
        <span>A random error occured while fetching the insights. Please try again later. {{ error.message }}</span>
      </div>

      <div v-if="pending" class="mt-4 text-center">
        <span class="loading loading-spinner loading-md" />
        <p class="text-sm text-muted mt-2">
          Processing...
        </p>
      </div>
    </div>

    <h1 class="text-4xl font-bold pb-4 pt-2">
      Core Sales Metrics:
    </h1>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="card bg-base-100 w-full shadow-sm p-4 my-4">
        <h3 class="text-lg font-semibold">
          Total Revenue by Month
        </h3>
        <BarChart
          v-if="totalRevenueData && totalRevenueData.length > 0"
          :data="totalRevenueData"
          :height="300"
          :categories="RevenueCategories"
          :y-axis="['value']"
          :x-num-ticks="6"
          :radius="4"
          :y-grid-line="true"
          :x-formatter="xFormatter"
          :y-formatter="yFormatter"
          :legend-position="LegendPosition.TopRight"
          :hide-legend="false"
        />
      </div>

      <div class="card bg-base-100 w-full shadow-sm p-4 my-4">
        <h3 class="text-lg font-semibold">
          Total Sales by Month
        </h3>
        <BarChart
          v-if="totalSalesData && totalSalesData.length > 0"
          :data="totalSalesData"
          :height="300"
          :categories="SalesCategories"
          :y-axis="['value']"
          :x-num-ticks="6"
          :radius="4"
          :y-grid-line="true"
          :x-formatter="xFormatter"
          :y-formatter="yFormatter"
          :legend-position="LegendPosition.TopRight"
          :hide-legend="false"
        />
      </div>
    </div>

    <div>
      <h1>Product Performance Table</h1>
      <p>
        This table shows the performance of each product in the report.
      </p>

      <ul class="list-disc pl-6">
        <li>Product name</li>
        <li>Release date</li>
        <li>Days since release</li>
        <li>Total sales</li>
        <li>Sales last 30 days</li>
        <li>Revenue (personal / professional split)</li>
        <li>Current price</li>
        <li>Tags / category (dress, swimwear, NPC, etc.)</li>
        <li>Status (Active / New / Needs Update / Underperforming)</li>
      </ul>

      <p>Add sorting by: Sales velocity (sales ÷ days), Revenue, Recency</p>
    </div>

    <div>
      <h1>Trend Signals</h1>
      <ul>
        <li>Best-selling category</li>
        <li>Worst performing category</li>
        <li>seasonal signal (trending up / down)</li>
        <li>Style Signal</li>
      </ul>
    </div>

    <div>
      <h1>Release Impact Snapshot (per product)</h1>
      <ul>
        <li>Sales in first 7 days</li>
        <li>Sales in first 30 days</li>
        <li>% of lifetime sales earned in first month</li>
      </ul>
    </div>

    <div>
      <h1>Pricing Intelligence</h1>
      <ul>
        <li>Price vs sales correlation</li>
        <li>Sales before/after price changes</li>
        <li>Average price of your top 20% sellers</li>
      </ul>
    </div>
  </div>
</template>
