<script lang="ts">
  import CoffeeStatsBox from "./lib/CoffeeStatsBox.svelte";
  import CoffeWeekChart from "./lib/CoffeWeekChart.svelte";
  import Heatmap from "./lib/Heatmap.svelte";
  import { onMount } from "svelte";
  import axios from "axios";

  // Initialize heatmap data with 3 empty months
  let heatmapData = {
    data: [],
    start: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 2,
      1
    ).getTime(),
    end: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getTime(),
  };

  onMount(async () => {
    try {
      const response = await axios.get("/coffee/heatmap");
      heatmapData = response.data;
    } catch (error) {
      console.error("Failed to fetch heatmap data:", error);
    }
  });
</script>

<main>
  <div class="coffee-stats">
    <CoffeeStatsBox />
    <CoffeWeekChart />
    <Heatmap
      data={heatmapData.data}
      start={heatmapData.start}
      end={heatmapData.end}
    />
  </div>
</main>

<style>
  .coffee-stats {
    margin-top: 10vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 2em;
  }
</style>
