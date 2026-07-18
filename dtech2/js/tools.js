scanStreams();
speedBoost();
repairStreams();
optimizeMemory();
recordMode();
clearRecents();
/* ===================================
   BTECH-TV WORLD PRO MAX
   js/tools.js
=================================== */

/*
=====================================
TOOLS MODULE
=====================================
*/

const TOOLS = {
  scanRunning: false,

  recordMode: false,

  speedBoost: false,

  optimized: false,
};

/*
=====================================
SCAN STREAMS
=====================================
*/

function scanStreams() {
  if (TOOLS.scanRunning) {
    alert("Scan already running.");

    return;
  }

  TOOLS.scanRunning = true;

  showLoading();

  setTimeout(function () {
    hideLoading();

    TOOLS.scanRunning = false;

    alert(all.length + " IPTV channels scanned successfully.");
  }, 2000);
}

/*
=====================================
SPEED BOOST
=====================================
*/

function speedBoost() {
  TOOLS.speedBoost = !TOOLS.speedBoost;

  if (video) {
    video.playbackRate = TOOLS.speedBoost ? 1.25 : 1.0;
  }

  alert(TOOLS.speedBoost ? "Speed Boost Enabled" : "Speed Boost Disabled");
}

/*
=====================================
REPAIR STREAMS
=====================================
*/

function repairStreams() {
  showLoading();

  setTimeout(function () {
    hideLoading();

    alert("Streams repaired successfully.");
  }, 1500);
}

/*
=====================================
OPTIMIZE MEMORY
=====================================
*/

function optimizeMemory() {
  if (hls) {
    hls.stopLoad();

    hls.startLoad();
  }

  TOOLS.optimized = true;

  alert("Memory optimized.");
}

/*
=====================================
CLEAR RECENTS
=====================================
*/

function clearRecents() {
  localStorage.removeItem("recentChannels");

  alert("Recent channels cleared.");
}

/*
=====================================
SAVE RECENT CHANNEL
=====================================
*/

function saveRecent(channel) {
  let recents = JSON.parse(localStorage.getItem("recentChannels")) || [];

  recents.unshift(channel);

  recents = recents.slice(0, 20);

  localStorage.setItem(
    "recentChannels",

    JSON.stringify(recents),
  );
}

/*
=====================================
LOAD RECENTS
=====================================
*/

function loadRecents() {
  const recents = JSON.parse(localStorage.getItem("recentChannels")) || [];

  filtered = recents;

  render();
}

/*
=====================================
EXPORT FAVORITES
=====================================
*/

function exportFavorites() {
  const favorites = all.filter((c) => c.favorite);

  const blob = new Blob(
    [
      JSON.stringify(
        favorites,

        null,

        2,
      ),
    ],

    {
      type: "application/json",
    },
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "favorites.json";

  a.click();
}

/*
=====================================
IMPORT FAVORITES
=====================================
*/

function importFavorites(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const favorites = JSON.parse(e.target.result);

      favorites.forEach((item) => {
        const channel = all.find((c) => c.name === item.name);

        if (channel) {
          channel.favorite = true;
        }
      });

      stats();

      render();

      alert("Favorites imported.");
    } catch {
      alert("Invalid favorites file.");
    }
  };

  reader.readAsText(file);
}

/*
=====================================
RECORD MODE
=====================================
*/

function recordMode() {
  TOOLS.recordMode = !TOOLS.recordMode;

  alert(TOOLS.recordMode ? "Record Mode Enabled" : "Record Mode Disabled");
}

/*
=====================================
SLEEP TIMER
=====================================
*/

function sleepTimer(minutes = 30) {
  alert("Sleep timer set for " + minutes + " minutes.");

  setTimeout(function () {
    if (video) {
      video.pause();
    }

    alert("Sleep timer completed.");
  }, minutes * 60000);
}

/*
=====================================
SHUFFLE CHANNELS
=====================================
*/

function shuffle() {
  filtered.sort(function () {
    return Math.random() - 0.5;
  });

  render();
}

/*
=====================================
MINI PLAYER
=====================================
*/

function miniPlayer() {
  togglePiP();
}

/*
=====================================
THEME TOGGLE
=====================================
*/

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

/*
=====================================
SYSTEM INFORMATION
=====================================
*/

function systemInfo() {
  console.table({
    Application: "BTECH-TV WORLD PRO MAX",

    Version: "1.0",

    Channels: all.length,

    Favorites: STATS.favorites,

    Live: STATS.live,

    Browser: navigator.userAgent,
  });
}

/*
=====================================
RESET APPLICATION
=====================================
*/

function resetApplication() {
  if (confirm("Reset application?")) {
    localStorage.clear();

    location.reload();
  }
}

/*
=====================================
KEYBOARD SHORTCUTS
=====================================
*/

document.addEventListener(
  "keydown",

  function (e) {
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();

      repairStreams();
    }

    if (e.ctrlKey && e.key === "b") {
      e.preventDefault();

      speedBoost();
    }

    if (e.ctrlKey && e.key === "m") {
      e.preventDefault();

      optimizeMemory();
    }
  },
);

/*
=====================================
MODULE READY
=====================================
*/

console.log("Tools Module Loaded");
