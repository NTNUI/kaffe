<script lang="ts">
  let hours = 0;
  let minutes = 0;
  const fetchLastCoffee = async () => {
    const res = await fetch("https://api.kaffe.ntnui.no/coffee/latest", {
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

{hours} hours and {minutes} minutes
