<script lang="ts">
  import LitersThisYear from "./LitersThisYear.svelte";

  let hours;
  let minutes;
  const fetchLastCoffee = async () => {
    const res = await fetch("https://api.coffee.ntnui.no/coffee/latest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });

    const lastCoffee = (await res.json()).brewTime;
    const timeSince = Math.abs(
      new Date(Date.parse(lastCoffee)).getTime() - Date.now()
    );
    hours = Math.floor(timeSince / 1000 / 60 / 60);
    minutes = Math.floor((timeSince / 1000 / 60) % 60);
  };
  fetchLastCoffee();
</script>

<div class="info-box">
  <div class="section">
    <h4 class="title">Since last brew:</h4>
    <h4 class="content">{hours} hours and {minutes} minutes</h4>
  </div>

  <div class="section">
    <h4 class="title">
      Liters brewed in {String(new Date(Date.now()).getFullYear())}:
    </h4>
    <h4 class="content">
      <LitersThisYear />
    </h4>
    <h6 class="notice">(Logging started 13.03)</h6>
  </div>
</div>

<style>
  .content {
    margin: 0;
  }
  .title {
    color: #888;
    margin: 0;
    margin-top: 0.5em;
  }
  .info-box {
    padding: 0.5em;
    margin-bottom: 1.5em;
    border: 1px #888 solid;
    width: 25em;
  }
  .section {
    margin-top: 0.5em;
  }
  .notice {
    margin: 0;
    color: #888;
  }
</style>
