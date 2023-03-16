<script lang="ts">
  let result = 0;
  const firstDayInYear = String(new Date(Date.now()).getFullYear()) + "-01-01";
  const lastDayInYear = String(new Date(Date.now()).getFullYear()) + "-12-31";

  async function fetchCoffeYear() {
    const res = await fetch("https://api.coffee.ntnui.no/coffee/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        startDate: firstDayInYear,
        endDate: lastDayInYear,
      }),
    });

    const json = await res.json();
    result = json.liters.toFixed();
  }
  fetchCoffeYear();
</script>

{result}
