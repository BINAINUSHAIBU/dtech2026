/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   app.js
   Main Application
========================================== */

let CHANNELS = [];
let FILTERED = [];
let CURRENT_CHANNEL = null;

/* ===========================
   INITIALIZE
=========================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

async function initializeApp() {

    await loadData();

    setupSearch();

    setupKeyboard();

    console.log("BTECH-TV WORLD ULTRA MAX X Loaded");
}

/* ===========================
   LOAD JSON FILES
=========================== */

async function loadData() {

    try {

        const response = await fetch("data/channels.json");

        if (!response.ok)
            throw new Error("Unable to load channels.json");

        CHANNELS = await response.json();

        FILTERED = [...CHANNELS];

        renderChannels(FILTERED);

        loadCountries();

        loadCategories();

        loadLanguages();

        updateStatistics();

    }

    catch (err) {

        console.error(err);

        document.getElementById("channels").innerHTML = `
        <div style="
            color:white;
            text-align:center;
            padding:60px;
            font-size:22px;">
            Failed to load channels.json
        </div>`;
    }

}

/* ===========================
   RENDER CHANNELS
=========================== */

function renderChannels(list) {

    const container = document.getElementById("channels");

    if (!container) return;

    if (list.length === 0) {

        container.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
        No Channels Found
        </h2>`;

        return;

    }

    container.innerHTML = list.map(channel => `

<div class="card"
onclick="playChannel('${channel.stream}')">

<img src="${channel.logo}"
onerror="this.src='assets/logo.png'">

<div class="card-content">

<div class="name">${channel.name}</div>

<div class="info">🌍 ${channel.country}</div>

<div class="info">📺 ${channel.category}</div>

<div class="info">🗣 ${channel.language || "English"}</div>

<span class="live">LIVE</span>

</div>

</div>

`).join("");

}

/* ===========================
   PLAY CHANNEL
=========================== */

function playChannel(url) {

    const video = document.getElementById("video");

    if (!video) return;

    CURRENT_CHANNEL = url;

    video.src = url;

    video.play().catch(() => { });

}

/* ===========================
   SEARCH
=========================== */

function setupSearch() {

    const search = document.querySelector(".search");

    if (!search) return;

    search.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        FILTERED = CHANNELS.filter(channel =>

            channel.name.toLowerCase().includes(keyword) ||

            channel.country.toLowerCase().includes(keyword) ||

            channel.category.toLowerCase().includes(keyword)

        );

        renderChannels(FILTERED);

    });

}

/* ===========================
   STATISTICS
=========================== */

function updateStatistics() {

    const total = document.getElementById("totalChannels");

    if (total)
        total.innerText = CHANNELS.length;

}

/* ===========================
   RANDOM CHANNEL
=========================== */

function randomChannel() {

    if (CHANNELS.length === 0) return;

    const random = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];

    playChannel(random.stream);

}

/* ===========================
   REFRESH
=========================== */

function refreshChannels() {

    loadData();

}

/* ===========================
   FULLSCREEN
=========================== */

function fullscreenPlayer() {

    const player = document.querySelector(".player");

    if (!player) return;

    if (player.requestFullscreen)

        player.requestFullscreen();

}

/* ===========================
   MINI PLAYER
=========================== */

function miniPlayer() {

    const player = document.querySelector(".player");

    if (!player) return;

    player.classList.toggle("mini");

}

/* ===========================
   THEME
=========================== */

function toggleTheme() {

    document.body.classList.toggle("light-mode");

}

/* ===========================
   KEYBOARD SHORTCUTS
=========================== */

function setupKeyboard() {

    document.addEventListener("keydown", function (e) {

        switch (e.key.toLowerCase()) {

            case "f":
                fullscreenPlayer();
                break;

            case "m":
                miniPlayer();
                break;

            case "r":
                randomChannel();
                break;

            case "t":
                toggleTheme();
                break;

        }

    });

}

/* ===========================
   AUTO REFRESH
=========================== */

setInterval(() => {

    console.log("Refreshing IPTV Data...");

}, 300000);

/* ===========================
   NETWORK STATUS
=========================== */

window.addEventListener("online", () => {

    console.log("Internet Connected");

});

window.addEventListener("offline", () => {

    console.log("Internet Disconnected");

});

/* ===========================
   END
=========================== */

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
    }, 2000);
});

