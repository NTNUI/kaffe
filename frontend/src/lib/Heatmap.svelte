<script lang="ts">
  // Props
  export let data = [];
  export let start: number;
  export let end: number;

  let monthData = []; // Array of objects { month, days: [] }
  const timeZone = "Europe/Oslo";

  // Reactive: Recalculate monthData whenever data, start, or end changes
  $: monthData = groupDataByMonth(data);

  // Group data by month and fill missing days
  function groupDataByMonth(data) {
    const grouped = [];
    const startDate = new Date(start);
    const endDate = new Date(end);

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const monthName = currentDate.toLocaleString("en", { month: "long" });
      const key = `${year}-${month}`;

      // Find or create the month group
      let monthGroup = grouped.find((g) => g.key === key);
      if (!monthGroup) {
        monthGroup = { key, month: monthName, days: [] };
        grouped.push(monthGroup);
      }

      // Find the day's data or fill with default
      const isoDate = currentDate.toLocaleDateString("en-CA", { timeZone });
      const dayData = data.find((d: { _id: string }) => d._id === isoDate) || {
        _id: isoDate,
        count: 0,
      };
      monthGroup.days.push(dayData);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return grouped;
  }

  // Compute intensity class based on count
  function getIntensityClass(count: number): string {
    if (!count) return "intensity-0";
    const maxCount =
      data.length > 0 ? Math.max(...data.map((d) => d.count)) : 1;
    const intensity = Math.ceil((count / maxCount) * 4); // Scale to 0-4
    return `intensity-${intensity}`;
  }
</script>

<div class="heatmap">
  {#each monthData as { month, days }}
    <div class="month">
      <div class="month-label">{month}</div>
      <div class="days">
        {#each days as { _id, count }}
          <div
            class="day {getIntensityClass(count)}"
            data-tooltip="{new Date(
              _id
            ).toDateString()}, Liters: {count.toFixed(2)}"
          ></div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .heatmap {
    display: flex;
    flex-direction: row;
    gap: 30px;
    flex-wrap: wrap;
  }

  .month {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 600px) {
    .heatmap {
      flex-direction: column;
    }
  }

  .month-label {
    font-weight: bold;
    font-size: 12px;
    color: #e2e8f0;
    margin-bottom: 4px;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 12px); /* 7 days in a week */
    grid-auto-rows: 10px;
    gap: 10px;
  }

  .day {
    width: 1em;
    height: 1em;
    border-radius: 2px;
    position: relative;
    background-color: rgb(53, 53, 53); /* Default no data */
  }

  .day.intensity-1 {
    background-color: #0d4e2b; /* Low intensity */
  }
  .day.intensity-2 {
    background-color: #209054; /* Medium intensity */
  }
  .day.intensity-3 {
    background-color: #39bb76; /* High intensity */
  }
  .day.intensity-4 {
    background-color: #5fe89f; /* Very high intensity */
  }

  .day:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -36px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2d3748;
    color: #edf2f7;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    z-index: 10;
    border: 1px solid #4a5568;
  }

  .day:hover::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: #1a202c;
    z-index: 9;
  }
</style>
