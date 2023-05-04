<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let result = 0;
  const firstDayInYear = String(new Date(Date.now()).getFullYear()) + "-01-01";
  const lastDayInYear = String(new Date(Date.now()).getFullYear()) + "-12-31";

  onMount(async () => {
    const res = await axios.post("/coffee", {
      startDate: firstDayInYear,
      endDate: lastDayInYear,
    });
    result = res.data.liters.toFixed();
  });
</script>

{result}
