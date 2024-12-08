<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let data = null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-CA", { month: "long" });
    const year = date.getFullYear();
    return `${day}. ${month} ${year}`;
  };

  onMount(async () => {
    const res = await axios.get("/coffee/records");
    data = await res.data;
  });
</script>

{#if data}
  <div>
    <p>
      Overall brew record<br />
      <strong>{formatDate(data.overall.date)}</strong><br />
      <strong>{data.overall.liters.toFixed(0)} liters</strong>
    </p>
    <p>
      This month<br />
      <strong>{formatDate(data.thisMonth.date)}</strong><br />
      <strong>{data.thisMonth.liters.toFixed(0)} liters</strong>
    </p>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
  p {
    font-size: 1rem;
    line-height: 1.4;
  }

  strong {
    font-weight: bold;
  }

  div {
    padding: 8px;
  }
</style>
