search();
filterChannels();
/* ===================================
   BTECH-TV WORLD PRO MAX
   js/search.js
=================================== */

/*
=====================================
SEARCH MODULE
=====================================
*/

const Search = {
  query: "",

  results: [],
};

/*
=====================================
LIVE SEARCH
=====================================
*/

function search(keyword) {
  Search.query = keyword.trim().toLowerCase();

  if (Search.query === "") {
    filtered = [...all];

    render();

    stats();

    return;
  }

  Search.results = all.filter((channel) => {
    return (
      channel.name.toLowerCase().includes(Search.query) ||
      (channel.category || "").toLowerCase().includes(Search.query)
    );
  });

  filtered = [...Search.results];

  render();

  stats();
}

/*
=====================================
SEARCH BY CHANNEL NAME
=====================================
*/

function searchByName(name) {
  filtered = all.filter((channel) =>
    channel.name.toLowerCase().includes(name.toLowerCase()),
  );

  render();
}

/*
=====================================
SEARCH CATEGORY
=====================================
*/

function searchCategory(category) {
  filtered = all.filter((channel) =>
    (channel.category || "").toLowerCase().includes(category.toLowerCase()),
  );

  render();
}

/*
=====================================
SEARCH COUNTRY
=====================================
*/

function searchCountry(country) {
  filtered = all.filter((channel) =>
    (channel.country || "").toLowerCase().includes(country.toLowerCase()),
  );

  render();
}

/*
=====================================
SEARCH LANGUAGE
=====================================
*/

function searchLanguage(language) {
  filtered = all.filter((channel) =>
    (channel.language || "").toLowerCase().includes(language.toLowerCase()),
  );

  render();
}

/*
=====================================
SHOW FAVORITES
=====================================
*/

function searchFavorites() {
  filtered = all.filter((channel) => channel.favorite === true);

  render();
}

/*
=====================================
SHOW LIVE CHANNELS
=====================================
*/

function searchLive() {
  filtered = all.filter(
    (channel) => channel.url && channel.url.startsWith("http"),
  );

  render();
}

/*
=====================================
CLEAR SEARCH
=====================================
*/

function clearSearch() {
  const input = document.querySelector(".search-box input");

  if (input) {
    input.value = "";
  }

  filtered = [...all];

  render();

  stats();
}

/*
=====================================
SEARCH RESULT COUNT
=====================================
*/

function searchCount() {
  return filtered.length;
}

/*
=====================================
HIGHLIGHT SEARCH
=====================================
*/

function highlight(text) {
  if (Search.query === "") {
    return text;
  }

  const regex = new RegExp(
    "(" + Search.query + ")",

    "gi",
  );

  return text.replace(
    regex,

    "<span class='search-highlight'>$1</span>",
  );
}

/*
=====================================
NO RESULT MESSAGE
=====================================
*/

function showNoResults() {
  const grid = document.getElementById("grid");

  if (!grid) return;

  grid.innerHTML = `

        <div style="
            width:100%;
            padding:50px;
            text-align:center;
            color:#00d4ff;
            font-size:22px;
        ">

            No channels found.

        </div>

    `;
}

/*
=====================================
SEARCH WITH AUTO UPDATE
=====================================
*/

function performSearch(value) {
  search(value);

  if (filtered.length === 0) {
    showNoResults();
  }
}

/*
=====================================
VOICE SEARCH
=====================================
*/

function voiceSearch() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice search is not supported.");

    return;
  }

  const recognition = new webkitSpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;

    const input = document.querySelector(".search-box input");

    if (input) {
      input.value = text;
    }

    performSearch(text);
  };
}

/*
=====================================
RECENT SEARCHES
=====================================
*/

const recentSearches = [];

function saveRecentSearch(keyword) {
  if (keyword.trim() === "") return;

  if (!recentSearches.includes(keyword)) {
    recentSearches.unshift(keyword);
  }

  if (recentSearches.length > 10) {
    recentSearches.pop();
  }
}

function getRecentSearches() {
  return recentSearches;
}

/*
=====================================
MODULE READY
=====================================
*/

console.log("Search Module Loaded");
