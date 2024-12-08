<script lang="ts">
  import LastCoffee from "./LastCoffee.svelte";
  import LitersThisYear from "./LitersThisYear.svelte";
  import MostBrewed from "./MostBrewed.svelte";
</script>

<div class="card-container">
  <div class="card">
    <!-- Front of the card -->
    <div class="card-front">
      <div class="info-box">
        <div class="section">
          <h4 class="title">Since last brew</h4>
          <h4 class="content">
            <LastCoffee />
          </h4>
        </div>

        <div class="section">
          <h4 class="title">Liters brewed this semester</h4>
          <h4 class="content">
            <LitersThisYear />
          </h4>
        </div>
      </div>
    </div>

    <!-- Back of the card -->
    <div class="card-back">
      <div class="info-box">
        <p class="content">
          <MostBrewed />
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .card-container {
    perspective: 1000px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    position: relative;
    width: 100%;
    max-width: 400px;
    min-height: 200px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.3),
      0 1px 3px rgba(255, 255, 255, 0.0005);
    border-radius: 30px;
  }

  .card-container:hover .card {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    padding: 1em;
    box-sizing: border-box;
    display: grid;
    place-items: center;
    background-color: rgba(45, 55, 72, 0.95);
  }

  .card-back {
    transform: rotateY(180deg);
  }

  .title {
    color: #e2e2e2;
    font-size: 1rem;
    font-weight: 600;
  }

  .section {
    line-height: 0.5;
  }

  .content {
    color: #e2e8f0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .card {
      max-width: 80%;
    }
  }
</style>
