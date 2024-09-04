<script>
  import axios from "axios";
  import moment from "moment";
  import { onMount } from "svelte";
  import SvelteHeatmap from "svelte-heatmap";

  let data = [];
  let endDate = new Date(Date.now());
  let startDate = new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000);

  onMount(async () => {
    const res = await axios.get("/coffee/heatmap");
    constructChartData(await res.data);
  });

  const constructChartData = (chartData) => {
    let dataPoints = [];

    for (const day of chartData.data) {
      dataPoints.push({
        date: moment(day._id).toDate(),
        value: Math.ceil(day.count),
      });
    }
    startDate = new Date(chartData.start);
    endDate = new Date(chartData.end);
    data = dataPoints;
    console.log(dataPoints);
    return dataPoints;
  };
</script>

<div class="container">
  <SvelteHeatmap
    allowOverflow={true}
    cellGap={6}
    cellRadius={2}
    fontColor={"white"}
    {data}
    dayLabelWidth={20}
    emptyColor={"#ecedf0"}
    {endDate}
    monthGap={20}
    monthLabelHeight={20}
    {startDate}
    view={"monthly"}
    unit={{ single: "litre", plural: "litres" }}
  />
</div>

<style>
  .container {
    padding: 20px;
    width: 40em;
  }
</style>
