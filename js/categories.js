/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   categories.js
   Category Management Module
   ========================================== */

let CATEGORIES = [];

/* ==========================================
   LOAD CATEGORIES
========================================== */

async function loadCategories() {

    try {

        const response = await fetch("data/categories.json");

        if (!response.ok)
            throw new Error("Unable to load categories.json");

        CATEGORIES = await response.json();

        renderCategories(CATEGORIES);

    } catch (error) {

        console.error(error);

        document.getElementById("categories").innerHTML =
            "<p style='color:red'>Failed to load categories.</p>";

    }

}

/* ==========================================
   RENDER CATEGORIES
========================================== */

function renderCategories(list) {

    const container = document.getElementById("categories");

    if (!container) return;

    container.innerHTML = "";

    // All Categories Button
    const allBtn = document.createElement("button");

    allBtn.innerHTML = "📺 All Categories";

    allBtn.onclick = () => showAllChannels();

    container.appendChild(allBtn);

    // Category Buttons
    list.forEach(category => {

        const btn = document.createElement("button");

        btn.innerHTML = `${category.icon} ${category.name}`;

        btn.onclick = () => filterCategory(category.name);

        container.appendChild(btn);

    });

}

/* ==========================================
   FILTER CATEGORY
========================================== */

function filterCategory(categoryName) {

    const filtered = CHANNELS.filter(channel =>
        channel.category.toLowerCase() === categoryName.toLowerCase()
    );

    renderChannels(filtered);

    updateCategoryTitle(categoryName);

}

/* ==========================================
   CATEGORY TITLE
========================================== */

function updateCategoryTitle(category) {

    let title = document.getElementById("categoryTitle");

    if (!title) {

        title = document.createElement("h2");

        title.id = "categoryTitle";

        title.style.margin = "20px 0";

        title.style.color = "#00d2ff";

        const channels = document.getElementById("channels");

        channels.parentNode.insertBefore(title, channels);

    }

    title.innerHTML = `🎬 ${category}`;

}

/* ==========================================
   SEARCH CATEGORY
========================================== */

function searchCategory(keyword) {

    const filtered = CATEGORIES.filter(category =>

        category.name.toLowerCase().includes(keyword.toLowerCase())

    );

    renderCategories(filtered);

}

/* ==========================================
   CATEGORY COUNT
========================================== */

function totalCategories() {

    return CATEGORIES.length;

}

/* ==========================================
   RANDOM CATEGORY
========================================== */

function randomCategory() {

    if (CATEGORIES.length === 0) return;

    const random = CATEGORIES[
        Math.floor(Math.random() * CATEGORIES.length)
    ];

    filterCategory(random.name);

}

/* ==========================================
   NEXT CATEGORY
========================================== */

let currentCategoryIndex = 0;

function nextCategory() {

    if (CATEGORIES.length === 0) return;

    currentCategoryIndex++;

    if (currentCategoryIndex >= CATEGORIES.length)
        currentCategoryIndex = 0;

    filterCategory(CATEGORIES[currentCategoryIndex].name);

}

/* ==========================================
   PREVIOUS CATEGORY
========================================== */

function previousCategory() {

    if (CATEGORIES.length === 0) return;

    currentCategoryIndex--;

    if (currentCategoryIndex < 0)
        currentCategoryIndex = CATEGORIES.length - 1;

    filterCategory(CATEGORIES[currentCategoryIndex].name);

}

/* ==========================================
   REFRESH CATEGORIES
========================================== */

function refreshCategories() {

    loadCategories();

}

/* ==========================================
   CATEGORY STATISTICS
========================================== */

function getCategoryStatistics() {

    const stats = {};

    CHANNELS.forEach(channel => {

        const category = channel.category;

        stats[category] = (stats[category] || 0) + 1;

    });

    return stats;

}

/* ==========================================
   SHOW CATEGORY STATISTICS
========================================== */

function showCategoryStatistics() {

    console.table(getCategoryStatistics());

}

/* ==========================================
   AUTO LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCategories();

});

/* ==========================================
   END
========================================== */
