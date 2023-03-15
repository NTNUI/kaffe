<script lang="ts">
  import CoffeWeekChart from "./lib/CoffeWeekChart.svelte";

  let result = 0;
  let today = new Date(Date.now()).toLocaleDateString("af-NA");

  async function fetchCoffeToday() {
    const res = await fetch("https://api.coffee.ntnui.no/coffee/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        startDate: today,
        endDate: today,
      }),
    });

    const json = await res.json();
    result = json.liters.toFixed();
  }
  fetchCoffeToday();
</script>

<main>
  <h1>{result} liters brewed today</h1>
  <CoffeWeekChart />

  <p class="love-banner">Coffee drunk with ❤️ at NTNUI</p>
</main>

<style>
  .love-banner {
    color: #888;
  }
</style>
