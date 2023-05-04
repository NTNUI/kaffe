<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  let hours = 0;
  let minutes = 0;

  const calculateTimeSinceBrew = async (lastCoffee: string) => {
    const timeSince = Math.abs(
      new Date(Date.parse(lastCoffee)).getTime() - Date.now()
    );
    hours = Math.floor(timeSince / 1000 / 60 / 60);
    minutes = Math.floor((timeSince / 1000 / 60) % 60);
  };

  onMount(async () => {
    const res = await axios.get("/coffee/latest");
    calculateTimeSinceBrew(await res.data.brewTime);
  });
</script>

{hours} hours and {minutes} minutes
