<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let timeSince = null;
  onMount(async () => {
    const res = await axios.get("/coffee/latest");
    timeSince = await res.data.timeSince;
  });
</script>

{#if timeSince}
  <p>{timeSince}</p>
{:else}
  <p>Loading...</p>
{/if}
