/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   favorites.js
   Favorites Management
   ========================================== */

const FAVORITES_KEY = "btechtv_favorites";

/* ==========================================
   LOAD FAVORITES
========================================== */

function getFavorites() {

    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

}

/* ==========================================
   SAVE FAVORITES
========================================== */

function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}

/* ==========================================
   ADD FAVORITE
========================================== */

function addFavorite(channelName) {

    let favorites = getFavorites();

    if (!favorites.includes(channelName)) {

        favorites.push(channelName);

        saveFavorites(favorites);

        console.log(channelName + " added to Favorites");

    }

}

/* ==========================================
   REMOVE FAVORITE
========================================== */

function removeFavorite(channelName) {

    let favorites = getFavorites();

    favorites = favorites.filter(
        item => item !== channelName
    );

    saveFavorites(favorites);

}

/* ==========================================
   TOGGLE FAVORITE
========================================== */

function toggleFavorite(channelName) {

    if (isFavorite(channelName))

        removeFavorite(channelName);

    else

        addFavorite(channelName);

    renderChannels(CHANNELS);

}

/* ==========================================
   CHECK FAVORITE
========================================== */

function isFavorite(channelName) {

    return getFavorites().includes(channelName);

}

/* ==========================================
   SHOW FAVORITES
========================================== */

function showFavorites() {

    const favorites = getFavorites();

    const list = CHANNELS.filter(channel =>
        favorites.includes(channel.name)
    );

    renderChannels(list);

    updateFavoriteCount();

}

/* ==========================================
   CLEAR FAVORITES
========================================== */

function clearFavorites() {

    if (!confirm("Clear all favorite channels?"))
        return;

    localStorage.removeItem(FAVORITES_KEY);

    renderChannels(CHANNELS);

    updateFavoriteCount();

}

/* ==========================================
   FAVORITE COUNT
========================================== */

function favoriteCount() {

    return getFavorites().length;

}

/* ==========================================
   UPDATE FAVORITE BADGE
========================================== */

function updateFavoriteCount() {

    let badge = document.getElementById("favoriteCount");

    if (!badge) {

        badge = document.createElement("span");

        badge.id = "favoriteCount";

        badge.style.color = "#FFD700";
        badge.style.marginLeft = "10px";
        badge.style.fontWeight = "bold";

        const sidebar = document.querySelector(".sidebar");

        if (sidebar)
            sidebar.prepend(badge);

    }

    badge.innerHTML = `⭐ Favorites (${favoriteCount()})`;

}

/* ==========================================
   ADD FAVORITE BUTTON TO CARD
========================================== */

function favoriteButton(channelName) {

    return `
        <button
            class="favorite-btn"
            onclick="event.stopPropagation();
            toggleFavorite('${channelName}')">

            ${isFavorite(channelName) ? "⭐" : "☆"}

        </button>
    `;

}

/* ==========================================
   EXPORT FAVORITES
========================================== */

function exportFavorites() {

    const data = JSON.stringify(getFavorites(), null, 2);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "favorites.json";

    link.click();

    URL.revokeObjectURL(url);

}

/* ==========================================
   IMPORT FAVORITES
========================================== */

function importFavorites(file) {

    const reader = new FileReader();

    reader.onload = function(e) {

        try {

            const favorites = JSON.parse(e.target.result);

            saveFavorites(favorites);

            updateFavoriteCount();

            alert("Favorites Imported");

        } catch {

            alert("Invalid favorites file.");

        }

    };

    reader.readAsText(file);

}

/* ==========================================
   AUTO UPDATE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateFavoriteCount();

});

/* ==========================================
   END
========================================== */
