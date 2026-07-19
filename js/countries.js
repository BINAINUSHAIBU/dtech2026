/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   countries.js
   Country Management Module
   ========================================== */

let COUNTRIES = [];

/* ==========================================
   LOAD COUNTRIES
========================================== */

async function loadCountries() {

    try {

        const response = await fetch("data/countries.json");

        if (!response.ok)
            throw new Error("Unable to load countries.json");

        COUNTRIES = await response.json();

        renderCountries(COUNTRIES);

    } catch (error) {

        console.error(error);

        document.getElementById("countries").innerHTML =
            "<p style='color:red'>Failed to load countries.</p>";

    }

}

/* ==========================================
   RENDER COUNTRIES
========================================== */

function renderCountries(list) {

    const container = document.getElementById("countries");

    if (!container) return;

    container.innerHTML = "";

    // ALL button
    const allButton = document.createElement("button");

    allButton.innerHTML = "🌍 All Countries";

    allButton.onclick = () => showAllChannels();

    container.appendChild(allButton);

    // Country buttons
    list.forEach(country => {

        const btn = document.createElement("button");

        btn.innerHTML = `${country.flag} ${country.name}`;

        btn.onclick = () => filterCountry(country.name);

        container.appendChild(btn);

    });

}

/* ==========================================
   FILTER COUNTRY
========================================== */

function filterCountry(countryName) {

    const filtered = CHANNELS.filter(channel =>
        channel.country.toLowerCase() === countryName.toLowerCase()
    );

    renderChannels(filtered);

    updateCountryTitle(countryName);

}

/* ==========================================
   COUNTRY TITLE
========================================== */

function updateCountryTitle(country) {

    let title = document.getElementById("countryTitle");

    if (!title) {

        title = document.createElement("h2");

        title.id = "countryTitle";

        title.style.margin = "20px 0";

        title.style.color = "#00d2ff";

        const channels = document.getElementById("channels");

        channels.parentNode.insertBefore(title, channels);

    }

    title.innerHTML = `🌍 ${country}`;

}

/* ==========================================
   COUNTRY SEARCH
========================================== */

function searchCountry(keyword) {

    const filtered = COUNTRIES.filter(country =>

        country.name.toLowerCase().includes(keyword.toLowerCase())

    );

    renderCountries(filtered);

}

/* ==========================================
   TOTAL COUNTRIES
========================================== */

function totalCountries() {

    return COUNTRIES.length;

}

/* ==========================================
   RANDOM COUNTRY
========================================== */

function randomCountry() {

    if (COUNTRIES.length === 0) return;

    const random = COUNTRIES[
        Math.floor(Math.random() * COUNTRIES.length)
    ];

    filterCountry(random.name);

}

/* ==========================================
   NEXT COUNTRY
========================================== */

let currentCountryIndex = 0;

function nextCountry() {

    if (COUNTRIES.length === 0) return;

    currentCountryIndex++;

    if (currentCountryIndex >= COUNTRIES.length)
        currentCountryIndex = 0;

    filterCountry(COUNTRIES[currentCountryIndex].name);

}

/* ==========================================
   PREVIOUS COUNTRY
========================================== */

function previousCountry() {

    if (COUNTRIES.length === 0) return;

    currentCountryIndex--;

    if (currentCountryIndex < 0)
        currentCountryIndex = COUNTRIES.length - 1;

    filterCountry(COUNTRIES[currentCountryIndex].name);

}

/* ==========================================
   REFRESH COUNTRIES
========================================== */

function refreshCountries() {

    loadCountries();

}

/* ==========================================
   AUTO LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCountries();

});

/* ==========================================
   END
========================================== */
