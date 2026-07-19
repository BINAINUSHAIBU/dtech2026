/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   languages.js
   Language Management Module
   ========================================== */

let LANGUAGES = [];

/* ==========================================
   LOAD LANGUAGES
========================================== */

async function loadLanguages() {

    try {

        const response = await fetch("data/languages.json");

        if (!response.ok)
            throw new Error("Unable to load languages.json");

        LANGUAGES = await response.json();

        renderLanguages(LANGUAGES);

    } catch (error) {

        console.error(error);

        document.getElementById("languages").innerHTML =
            "<p style='color:red'>Failed to load languages.</p>";

    }

}

/* ==========================================
   RENDER LANGUAGES
========================================== */

function renderLanguages(list) {

    const container = document.getElementById("languages");

    if (!container) return;

    container.innerHTML = "";

    // All Languages Button
    const allBtn = document.createElement("button");

    allBtn.innerHTML = "🌐 All Languages";

    allBtn.onclick = () => showAllChannels();

    container.appendChild(allBtn);

    // Language Buttons
    list.forEach(language => {

        const btn = document.createElement("button");

        btn.innerHTML = `${language.flag} ${language.name}`;

        btn.onclick = () => filterLanguage(language.name);

        container.appendChild(btn);

    });

}

/* ==========================================
   FILTER LANGUAGE
========================================== */

function filterLanguage(languageName) {

    const filtered = CHANNELS.filter(channel => {

        const lang = channel.language || "English";

        return lang.toLowerCase() === languageName.toLowerCase();

    });

    renderChannels(filtered);

    updateLanguageTitle(languageName);

}

/* ==========================================
   LANGUAGE TITLE
========================================== */

function updateLanguageTitle(language) {

    let title = document.getElementById("languageTitle");

    if (!title) {

        title = document.createElement("h2");

        title.id = "languageTitle";

        title.style.margin = "20px 0";

        title.style.color = "#00d2ff";

        const channels = document.getElementById("channels");

        channels.parentNode.insertBefore(title, channels);

    }

    title.innerHTML = `🌐 ${language}`;

}

/* ==========================================
   SEARCH LANGUAGE
========================================== */

function searchLanguage(keyword) {

    const filtered = LANGUAGES.filter(language =>

        language.name.toLowerCase().includes(keyword.toLowerCase())

    );

    renderLanguages(filtered);

}

/* ==========================================
   TOTAL LANGUAGES
========================================== */

function totalLanguages() {

    return LANGUAGES.length;

}

/* ==========================================
   RANDOM LANGUAGE
========================================== */

function randomLanguage() {

    if (LANGUAGES.length === 0) return;

    const random = LANGUAGES[
        Math.floor(Math.random() * LANGUAGES.length)
    ];

    filterLanguage(random.name);

}

/* ==========================================
   NEXT LANGUAGE
========================================== */

let currentLanguageIndex = 0;

function nextLanguage() {

    if (LANGUAGES.length === 0) return;

    currentLanguageIndex++;

    if (currentLanguageIndex >= LANGUAGES.length)
        currentLanguageIndex = 0;

    filterLanguage(LANGUAGES[currentLanguageIndex].name);

}

/* ==========================================
   PREVIOUS LANGUAGE
========================================== */

function previousLanguage() {

    if (LANGUAGES.length === 0) return;

    currentLanguageIndex--;

    if (currentLanguageIndex < 0)
        currentLanguageIndex = LANGUAGES.length - 1;

    filterLanguage(LANGUAGES[currentLanguageIndex].name);

}

/* ==========================================
   LANGUAGE STATISTICS
========================================== */

function getLanguageStatistics() {

    const stats = {};

    CHANNELS.forEach(channel => {

        const lang = channel.language || "English";

        stats[lang] = (stats[lang] || 0) + 1;

    });

    return stats;

}

/* ==========================================
   SHOW LANGUAGE STATISTICS
========================================== */

function showLanguageStatistics() {

    console.table(getLanguageStatistics());

}

/* ==========================================
   REFRESH LANGUAGES
========================================== */

function refreshLanguages() {

    loadLanguages();

}

/* ==========================================
   AUTO LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadLanguages();

});

/* ==========================================
   END
========================================== */
