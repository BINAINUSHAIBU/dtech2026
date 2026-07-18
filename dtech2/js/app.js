/* ===================================
   BTECH-TV WORLD PRO MAX
   js/app.js
=================================== */

/*
=====================================
GLOBAL VARIABLES
=====================================
*/

let all = [];
let filtered = [];
let currentChannel = 0;

let video = document.getElementById("video");

let hls = null;

/*
=====================================
APPLICATION STARTUP
=====================================
*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("==================================");
  console.log(" BTECH-TV WORLD PRO MAX Started ");
  console.log("==================================");

  initializePlayer();

  initializeDashboard();

  initializeTrial();

  initializeEvents();

  loadUltra();
});

/*
=====================================
PLAYER INITIALIZATION
=====================================
*/

function initializePlayer() {
  if (!video) {
    console.error("Video player not found.");

    return;
  }

  video.volume = 0.5;

  video.muted = true;
}

/*
=====================================
DASHBOARD
=====================================
*/

function initializeDashboard() {
  updateStatistics();
}

/*
=====================================
TRIAL
=====================================
*/

function initializeTrial() {
  if (typeof startTrial === "function") {
    startTrial();
  }
}

/*
=====================================
EVENTS
=====================================
*/

function initializeEvents() {
  /*
    Keyboard shortcuts
    */

  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowRight":
        next();

        break;

      case "ArrowLeft":
        prev();

        break;

      case " ":
        e.preventDefault();

        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }

        break;

      case "m":

      case "M":
        toggleMute();

        break;

      case "f":

      case "F":
        toggleFullscreen();

        break;
    }
  });
}

/*
=====================================
AUTO PLAY FIRST CHANNEL
=====================================
*/

function autoPlay() {
  if (filtered.length > 0) {
    play(0);
  }
}

/*
=====================================
AFTER CHANNELS LOADED
=====================================
*/

function afterChannelsLoaded() {
  updateStatistics();

  render();

  autoPlay();
}

/*
=====================================
LOADING SCREEN
=====================================
*/

function showLoading() {
  let player = document.querySelector(".player-container");

  if (!player) return;

  let loading = document.createElement("div");

  loading.className = "player-loading";

  loading.id = "loadingScreen";

  loading.innerHTML = '<div class="spinner"></div>';

  player.appendChild(loading);
}

function hideLoading() {
  let loading = document.getElementById("loadingScreen");

  if (loading) {
    loading.remove();
  }
}

/*
=====================================
NOTIFICATION
=====================================
*/

function notify(message) {
  console.log(message);
}

/*
=====================================
UPDATE TITLE
=====================================
*/

function updateTitle(channel) {
  if (!channel) return;

  document.title = channel.name + " | BTECH-TV WORLD PRO MAX";
}

/*
=====================================
STATISTICS
=====================================
*/

function updateStatistics() {
  if (typeof stats === "function") {
    stats();
  }
}

/*
=====================================
REFRESH DASHBOARD
=====================================
*/

function refreshDashboard() {
  updateStatistics();

  render();
}

/*
=====================================
NETWORK STATUS
=====================================
*/

window.addEventListener("online", function () {
  notify("Internet Connected");
});

window.addEventListener("offline", function () {
  notify("Internet Disconnected");
});

/*
=====================================
WINDOW RESIZE
=====================================
*/

window.addEventListener("resize", function () {
  console.log(
    "Screen Size:",

    window.innerWidth,

    "x",

    window.innerHeight,
  );
});

/*
=====================================
ERROR HANDLER
=====================================
*/

window.onerror = function (message) {
  console.error(message);
};

/*
=====================================
WELCOME MESSAGE
=====================================
*/

console.log("Welcome to BTECH-TV WORLD PRO MAX");

/*
=====================================
VERSION
=====================================
*/

const APP = {
  name: "BTECH-TV WORLD PRO MAX",

  version: "1.0",

  developer: "BINAINU SHAIBU",

  company: "BTECH WEBSITE DESIGN",
};

console.table(APP);

<style>#trialOverlay{position:relative;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;align-items:center;justify-content:center}#trialBox{background:#111;padding:20px;border-radius:12px;width:420px;color:white;border:1px solid #00d4ff}#paymentArea{display:none}#trialBox input,#trialBox select,#trialBox button{width:100%;padding:10px;margin:8px 0;border-radius:6px}</style>
<style>
#floatingTimer{
position:relative;
top:15px;
right:15px;
z-index:10000;
background:#111a31;
color:#00d4ff;
padding:12px 18px;
border-radius:10px;
border:1px solid #00d4ff;
font-weight:bold;
font-size:18px;
box-shadow:0 0 10px rgba(0,212,255,.5);
}
</style>