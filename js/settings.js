/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   settings.js
   User Settings & Preferences
   ========================================== */

const SETTINGS_KEY = "btechtv_settings";

/* ==========================================
   DEFAULT SETTINGS
========================================== */

const DEFAULT_SETTINGS = {

    theme: "dark",

    autoplay: true,

    volume: 1,

    playbackRate: 1,

    miniPlayer: false,

    autoFullscreen: false,

    pictureInPicture: false,

    rememberChannel: true,

    showNotifications: true,

    autoRefresh: true,

    refreshInterval: 300000,

    language: "English"

};

/* ==========================================
   LOAD SETTINGS
========================================== */

function loadSettings() {

    const saved = JSON.parse(
        localStorage.getItem(SETTINGS_KEY)
    );

    return saved || DEFAULT_SETTINGS;

}

/* ==========================================
   SAVE SETTINGS
========================================== */

function saveSettings(settings) {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}

/* ==========================================
   APPLY SETTINGS
========================================== */

function applySettings() {

    const settings = loadSettings();

    // Theme
    if (settings.theme === "light") {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

    // Player Volume
    const video = document.getElementById("video");

    if (video) {

        video.volume = settings.volume;

        video.playbackRate = settings.playbackRate;

        video.autoplay = settings.autoplay;

    }

    // Mini Player

    if (settings.miniPlayer) {

        document.querySelector(".player")?.classList.add("mini");

    }

}

/* ==========================================
   CHANGE THEME
========================================== */

function changeTheme(theme) {

    const settings = loadSettings();

    settings.theme = theme;

    saveSettings(settings);

    applySettings();

}

/* ==========================================
   TOGGLE DARK/LIGHT
========================================== */

function toggleTheme() {

    const settings = loadSettings();

    settings.theme =
        settings.theme === "dark"
            ? "light"
            : "dark";

    saveSettings(settings);

    applySettings();

}

/* ==========================================
   SET VOLUME
========================================== */

function setDefaultVolume(value) {

    const settings = loadSettings();

    settings.volume = value;

    saveSettings(settings);

    applySettings();

}

/* ==========================================
   PLAYBACK SPEED
========================================== */

function setPlaybackRate(speed) {

    const settings = loadSettings();

    settings.playbackRate = speed;

    saveSettings(settings);

    applySettings();

}

/* ==========================================
   AUTOPLAY
========================================== */

function toggleAutoplay() {

    const settings = loadSettings();

    settings.autoplay = !settings.autoplay;

    saveSettings(settings);

    applySettings();

}

/* ==========================================
   MINI PLAYER
========================================== */

function toggleMiniPlayer() {

    const settings = loadSettings();

    settings.miniPlayer = !settings.miniPlayer;

    saveSettings(settings);

    applySettings();

}

/* ==========================================
   AUTO FULLSCREEN
========================================== */

function toggleFullscreenMode() {

    const settings = loadSettings();

    settings.autoFullscreen = !settings.autoFullscreen;

    saveSettings(settings);

}

/* ==========================================
   PICTURE-IN-PICTURE
========================================== */

function togglePiP() {

    const settings = loadSettings();

    settings.pictureInPicture =
        !settings.pictureInPicture;

    saveSettings(settings);

}

/* ==========================================
   REMEMBER LAST CHANNEL
========================================== */

function saveLastChannel(channel) {

    const settings = loadSettings();

    if (settings.rememberChannel) {

        localStorage.setItem(
            "lastChannel",
            JSON.stringify(channel)
        );

    }

}

function loadLastChannel() {

    return JSON.parse(
        localStorage.getItem("lastChannel")
    );

}

/* ==========================================
   NOTIFICATIONS
========================================== */

function notify(message) {

    const settings = loadSettings();

    if (!settings.showNotifications)
        return;

    let notice = document.createElement("div");

    notice.innerHTML = message;

    notice.style.position = "fixed";
    notice.style.top = "20px";
    notice.style.right = "20px";
    notice.style.background = "#00d2ff";
    notice.style.color = "#000";
    notice.style.padding = "12px 20px";
    notice.style.borderRadius = "10px";
    notice.style.zIndex = "99999";
    notice.style.fontWeight = "bold";

    document.body.appendChild(notice);

    setTimeout(() => {

        notice.remove();

    }, 3000);

}

/* ==========================================
   RESET SETTINGS
========================================== */

function resetSettings() {

    if (!confirm("Reset all settings?"))
        return;

    localStorage.removeItem(SETTINGS_KEY);

    applySettings();

    notify("Settings Reset");

}

/* ==========================================
   EXPORT SETTINGS
========================================== */

function exportSettings() {

    const blob = new Blob(
        [
            JSON.stringify(loadSettings(), null, 2)
        ],
        {
            type: "application/json"
        }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "btechtv-settings.json";

    link.click();

}

/* ==========================================
   IMPORT SETTINGS
========================================== */

function importSettings(file) {

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const settings = JSON.parse(e.target.result);

            saveSettings(settings);

            applySettings();

            notify("Settings Imported");

        } catch {

            alert("Invalid settings file.");

        }

    };

    reader.readAsText(file);

}

/* ==========================================
   AUTO REFRESH
========================================== */

let refreshTimer;

function startAutoRefresh() {

    const settings = loadSettings();

    if (!settings.autoRefresh)
        return;

    clearInterval(refreshTimer);

    refreshTimer = setInterval(() => {

        if (typeof loadData === "function") {

            loadData();

            notify("Channel List Updated");

        }

    }, settings.refreshInterval);

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    applySettings();

    startAutoRefresh();

});

/* ==========================================
   END
========================================== */
