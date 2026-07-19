/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   search.js
   Advanced IPTV Search Engine
   ========================================== */

let searchResults = [];
let currentFilter = "all";

/* ==========================================
   SEARCH BY TEXT
========================================== */

function searchChannel(query) {

    query = query.trim().toLowerCase();

    if (query === "") {
        renderChannels(CHANNELS);
        return;
    }

    searchResults = CHANNELS.filter(channel => {

        return (

            channel.name.toLowerCase().includes(query) ||

            channel.country.toLowerCase().includes(query) ||

            channel.category.toLowerCase().includes(query) ||

            (channel.language || "").toLowerCase().includes(query)

        );

    });

    renderChannels(searchResults);

    updateSearchCount(searchResults.length);

}

/* ==========================================
   SEARCH COUNTRY
========================================== */

function searchCountry(country) {

    currentFilter = country;

    const result = CHANNELS.filter(channel =>
        channel.country === country
    );

    renderChannels(result);

    updateSearchCount(result.length);

}

/* ==========================================
   SEARCH CATEGORY
========================================== */

function searchCategory(category) {

    currentFilter = category;

    const result = CHANNELS.filter(channel =>
        channel.category === category
    );

    renderChannels(result);

    updateSearchCount(result.length);

}

/* ==========================================
   SEARCH LANGUAGE
========================================== */

function searchLanguage(language) {

    currentFilter = language;

    const result = CHANNELS.filter(channel =>
        (channel.language || "").toLowerCase() === language.toLowerCase()
    );

    renderChannels(result);

    updateSearchCount(result.length);

}

/* ==========================================
   SHOW ALL CHANNELS
========================================== */

function showAllChannels() {

    currentFilter = "all";

    renderChannels(CHANNELS);

    updateSearchCount(CHANNELS.length);

}

/* ==========================================
   LIVE CHANNELS
========================================== */

function showLiveChannels() {

    const result = CHANNELS.filter(channel =>
        channel.live !== false
    );

    renderChannels(result);

    updateSearchCount(result.length);

}

/* ==========================================
   FAVORITES
========================================== */

function searchFavorites() {

    const favorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    const result = CHANNELS.filter(channel =>
        favorites.includes(channel.name)
    );

    renderChannels(result);

    updateSearchCount(result.length);

}

/* ==========================================
   RECENT CHANNELS
========================================== */

function searchRecent() {

    const recent = JSON.parse(
        localStorage.getItem("recentChannels") || "[]"
    );

    const result = CHANNELS.filter(channel =>
        recent.includes(channel.name)
    );

    renderChannels(result);

    updateSearchCount(result.length);

}

/* ==========================================
   SORT
========================================== */

function sortChannels(type) {

    let list = [...CHANNELS];

    switch (type) {

        case "name":

            list.sort((a, b) =>
                a.name.localeCompare(b.name));

            break;

        case "country":

            list.sort((a, b) =>
                a.country.localeCompare(b.country));

            break;

        case "category":

            list.sort((a, b) =>
                a.category.localeCompare(b.category));

            break;

        default:

            break;

    }

    renderChannels(list);

}

/* ==========================================
   RANDOM SEARCH
========================================== */

function randomChannelSearch() {

    const random =
        CHANNELS[Math.floor(Math.random() * CHANNELS.length)];

    renderChannels([random]);

}

/* ==========================================
   SEARCH RESULT COUNT
========================================== */

function updateSearchCount(total) {

    let counter = document.getElementById("searchCount");

    if (!counter) {

        counter = document.createElement("div");

        counter.id = "searchCount";

        counter.style.margin = "15px 0";
        counter.style.color = "#00d2ff";
        counter.style.fontWeight = "bold";

        const main = document.querySelector(".main");

        if (main)
            main.insertBefore(counter, document.getElementById("channels"));

    }

    counter.innerHTML = `📺 ${total} Channel(s) Found`;

}

/* ==========================================
   SEARCH INPUT LISTENER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const search = document.querySelector(".search");

    if (!search) return;

    search.addEventListener("input", e => {

        searchChannel(e.target.value);

    });

});

/* ==========================================
   CLEAR SEARCH
========================================== */

function clearSearch() {

    const input = document.querySelector(".search");

    if (input)
        input.value = "";

    showAllChannels();

}

/* ==========================================
   END
========================================== */
