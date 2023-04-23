<script lang="ts">
  import CoffeeStatsBox from "./lib/CoffeeStatsBox.svelte";
  import CoffeWeekChart from "./lib/CoffeWeekChart.svelte";
  import Heatmap from "./lib/Heatmap.svelte";
</script>

<main>
  <div class="coffee-stats">
    <CoffeeStatsBox />
    <CoffeWeekChart />
    <Heatmap />
  </div>
</main>

<style>
  .coffee-stats {
    margin-top: 10vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 1em;
  }
  .love-banner {
    color: #888;
  }
</style>
