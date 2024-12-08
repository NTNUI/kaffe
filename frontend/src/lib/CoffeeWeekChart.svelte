<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import Chart from "svelte-frappe-charts";

  let chartRef;

  // Initialize chart data
  let data = {
    labels: [],
    datasets: [
      {
        values: [],
      },
    ],
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Generate an array of the last 7 days as strings in YYYY-MM-DD format
  let days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split("T")[0]);
  }
  days.reverse();

  onMount(async () => {
    try {
      const res = await axios.post("/coffee/days", { days });

      const labels: string[] = [];
      const values: number[] = [];
      res.data.forEach((dayData: { date: string; liters: number }) => {
        const dayIndex = new Date(dayData.date).getDay();
        labels.push(weekday[dayIndex]);
        values.push(Number(dayData.liters.toFixed(1)));
      });

      data = {
        labels,
        datasets: [
          {
            values,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching week-chart:", error);
    }
  });
</script>

<div class="chart">
  <h5 class="title">Last 7 days in liters</h5>
  <Chart {data} type="line" bind:this={chartRef} />
</div>

<style>
  .title {
    color: #888;
    margin: 0;
  }
  .chart {
    width: 40em;
    max-width: 90vw;
    height: auto;
  }
</style>
