<script lang="ts">
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

  const fetchLitersPerDay = async () => {
    for (const day of days) {
      const dayString = new Date(day).toLocaleDateString("af-NA");
      const res = await fetch("https://api.coffee.ntnui.no/coffee/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startDate: dayString,
          endDate: dayString,
        }),
      });

      const json = await res.json();
      chartRef.addDataPoint(weekday[new Date(day).getDay()], [
        json.liters.toFixed(1),
      ]);
    }
  };
  fetchLitersPerDay();
</script>

<div class="chart">
  <h5 class="title">Last 7 days</h5>
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
