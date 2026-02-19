<script lang="ts" setup>
import { BarChart, LegendPosition } from "vue-chrts";

defineOptions({
  tags: ["barcharts", "vertical", "group"],
});

const route = useRoute();

const { $csrfFetch } = useNuxtApp();
const { data: insights, error, pending } = await useAsyncData(
  `insight:output:${route.params.userid}`,
  () => $csrfFetch<any>("/api/sales-report", { method: "GET" }),
);

// Single computed: each chart gets its categories via chartDataCategories.<key>
const chartDataCategories = computed(() => ({
  totalRevenue: { value: { name: "Total Revenue", color: "var(--color-primary)" } },
  averageRevenuePerProduct: { value: { name: "Average Revenue per Product", color: "var(--color-primary)" } },
  totalSales: { value: { name: "Total Sales", color: "var(--color-primary)" } },
  // License chart uses professional/personal at top level (no "value" wrapper)
  licenseType: {
    professional: { name: "Professional", color: "var(--color-primary)" },
    personal: { name: "Personal", color: "var(--color-secondary)" },
  },
}));

const chartData = computed(() => ({
  totalRevenue: insights.value?.totalRevenue || [],
  totalSales: insights.value?.totalSales || [],
  averageRevenuePerProduct: insights.value?.averageRevenuePerProduct || [],
  licenseType: insights.value?.licenseType || [],
}));

// Returns an x-formatter that only takes (i). BarChart only passes index; data is bound by key.
function xFormatterFor(key: "totalRevenue" | "totalSales" | "averageRevenuePerProduct" | "licenseType"): (i: number) => string {
  return (i: number): string =>
    (chartData.value[key]?.[i]?.month as string) ?? "";
}

const yFormatter = (tick: number) => tick.toString();
</script>

<template>
  <div>
    <div v-if="(!insights || Object.keys(insights).length === 0) && !pending">
      <p>
        No data to display. Please upload a CSV file to get started.
      </p>
    </div>

    <div
      v-if="error"
      role="alert"
      class="alert alert-error my-4"
    >
      <Icon name="tabler:alert-circle" size="24" />
      <span>A random error occured while fetching the insights. Please try again later. {{ error.message }}</span>
    </div>

    <div v-if="pending && !error" class="mt-4 text-center">
      <span class="loading loading-spinner loading-md" />
      <p class="text-sm text-muted mt-2">
        Grabbing sales metrics... Please wait.
      </p>
    </div>

    <div v-else-if="insights && !error">
      <h1 class="text-2xl font-bold pb-4 pt-2 mb-4">
        Core Sales Metrics:
      </h1>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="card bg-base-100 w-full shadow-sm p-4">
          <h3 class="text-lg font-semibold">
            Total Revenue by Month
          </h3>
          <BarChart
            v-if="chartData.totalRevenue && chartData.totalRevenue.length > 0"
            :data="chartData.totalRevenue"
            :height="300"
            :categories="chartDataCategories.totalRevenue"
            :y-axis="['value']"
            :x-num-ticks="15"
            :radius="10"
            :y-grid-line="true"
            :x-formatter="xFormatterFor('totalRevenue')"
            :y-formatter="yFormatter"
            :legend-position="LegendPosition.TopRight"
            :hide-legend="false"
          />
        </div>

        <div class="card bg-base-100 w-full shadow-sm p-4">
          <h3 class="text-lg font-semibold">
            Average Revenue per Product
          </h3>
          <BarChart
            v-if="chartData.averageRevenuePerProduct && chartData.averageRevenuePerProduct.length > 0"
            :data="chartData.averageRevenuePerProduct"
            :height="300"
            :categories="chartDataCategories.averageRevenuePerProduct"
            :y-axis="['value']"
            :x-num-ticks="15"
            :radius="10"
            :y-grid-line="true"
            :x-formatter="xFormatterFor('averageRevenuePerProduct')"
            :y-formatter="yFormatter"
            :legend-position="LegendPosition.TopRight"
            :hide-legend="false"
          />
        </div>

        <div class="card bg-base-100 w-full shadow-sm p-4">
          <h3 class="text-lg font-semibold">
            Total Sales by Month
          </h3>
          <BarChart
            v-if="chartData.totalSales && chartData.totalSales.length > 0"
            :data="chartData.totalSales"
            :height="300"
            :categories="chartDataCategories.totalSales"
            :y-axis="['value']"
            :x-num-ticks="15"
            :radius="10"
            :y-grid-line="true"
            :x-formatter="xFormatterFor('totalSales')"
            :y-formatter="yFormatter"
            :legend-position="LegendPosition.TopRight"
            :hide-legend="false"
          />
        </div>

        <div class="card bg-base-100 w-full shadow-sm p-4">
          <h3 class="text-lg font-semibold">
            Personal vs Professional License
          </h3>
          <BarChart
            v-if="chartData.licenseType && chartData.licenseType.length > 0"
            :data="chartData.licenseType"
            :height="300"
            :categories="chartDataCategories.licenseType"
            :y-axis="['professional', 'personal']"
            :group-padding="0"
            :bar-padding="0.1"
            :x-num-ticks="6"
            :radius="10"
            :y-grid-line="true"
            :x-formatter="xFormatterFor('licenseType')"
            :y-formatter="yFormatter"
            :legend-position="LegendPosition.TopRight"
            :hide-legend="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
