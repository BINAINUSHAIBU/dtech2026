// Global channel array
let allChannels = [];

// Load all channel files
async function loadAllChannels() {
  const files = [
    "data/channels_part1.json",
    "data/channels_part2.json",
    "data/channels_part3.json",
    "data/channels_part4.json",
    "data/channels_part5.json",
    "data/channels_part6.json",
    "data/channels_part7.json",
  ];

  try {
    document.getElementById("status").textContent = "Loading IPTV channels...";

    const data = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }

        return response.json();
      }),
    );

    allChannels = data.flat();

    console.log(`${allChannels.length.toLocaleString()} channels loaded.`);

    if (typeof renderCats === "function") renderCats();

    if (typeof doFilter === "function") doFilter();

    document.getElementById("status").textContent =
      `${allChannels.length.toLocaleString()} Channels Loaded`;

    return allChannels;
  } catch (err) {
    console.error(err);

    document.getElementById("status").textContent = "Failed to load channels";

    return [];
  }
}

// Auto load
window.addEventListener("DOMContentLoaded", loadAllChannels);
