<script lang="ts">
  import LastCoffee from "./LastCoffee.svelte";
  import LitersThisYear from "./LitersThisYear.svelte";
</script>

<div class="info-box">
  <div class="section">
    <h4 class="title">Since last brew:</h4>
    <h4 class="content">
      <LastCoffee />
    </h4>
  </div>

  <div class="section">
    <h4 class="title">
      <!-- Liters brewed in {String(new Date(Date.now()).getFullYear())}: -->
      Liters brewed this semester
    </h4>
    <h4 class="content">
      <LitersThisYear />
    </h4>
    <h6 class="notice">(Logging started 30.08)</h6>
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
