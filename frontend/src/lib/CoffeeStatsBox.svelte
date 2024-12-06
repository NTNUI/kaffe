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
    <h4 class="title">Liters brewed this semester</h4>
    <h4 class="content">
      <LitersThisYear />
    </h4>
    <!-- <h6 class="notice">(Logging started 30.08)</h6> -->
  </div>
</div>

<style>
  .info-box {
    padding: 1em;
    margin-bottom: 1.5em;
    background-color: rgba(45, 55, 72, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.3),
      0 1px 3px rgba(255, 255, 255, 0.05);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      background-color 0.3s ease;
  }

  .info-box:hover {
    background-color: rgba(35, 40, 50, 1);
    transform: translateY(-6px);
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.5),
      0 2px 4px rgba(255, 255, 255, 0.1);
  }
  .title {
    color: #e2e2e2;
    margin-bottom: 0.5em;
    font-size: 1rem;
    font-weight: 600;
  }

  .content {
    color: #e2e8f0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .notice {
    color: #a0aec0;
    font-size: 0.8rem;
    margin-top: 0.5em;
  }
</style>
