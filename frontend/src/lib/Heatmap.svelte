<script>
  import moment from "moment";
  import SvelteHeatmap from "svelte-heatmap";

  let data = [];
  let startDate = new Date(Date.now());
  let endDate = new Date(Date.now());

  const fetchChartData = async () => {
    let dataPoints = [];
    const res = await fetch("https://api.kaffe.ntnui.no/coffee/heatmap", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const resJson = await res.json();

    for (const day of resJson.data) {
      dataPoints.push({
        date: moment(day._id).toDate(),
        value: Math.ceil(day.count),
      });
    }
    startDate = new Date(resJson.start);
    endDate = new Date(resJson.end);
    data = dataPoints;
    console.log(dataPoints);
    return dataPoints;
  };
  fetchChartData();
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
  />
</div>

<style>
  .container {
    padding: 20px;
    width: 40em;
  }
</style>
