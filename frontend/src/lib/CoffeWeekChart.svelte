<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import Chart from "svelte-frappe-charts";
  let chartRef;

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

  // Array of the last 7 weekdays in date format
  let days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(new Date().setDate(new Date().getDate() - i)));
  }
  days.reverse();

  onMount(async () => {
    for (const day of days) {
      const dayString = new Date(day).toLocaleDateString("af-NA");
      const res = await axios.post("/coffee", {
        startDate: dayString,
        endDate: dayString,
      });

      chartRef.addDataPoint(weekday[new Date(day).getDay()], [
        res.data.liters.toFixed(1),
      ]);
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
