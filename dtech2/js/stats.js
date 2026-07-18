
stats();
updateDashboard();
/* ===================================
   BTECH-TV WORLD PRO MAX
   js/stats.js
=================================== */

/*
=====================================
STATISTICS MODULE

=====================================
*/

const STATS = {

    total: 0,

    live: 0,

    favorites: 0,

    dead: 0,

    categories: {},

    countries: {}

};


/*
=====================================
UPDATE ALL STATISTICS
=====================================
*/

function stats(){

    STATS.total = all.length;

    STATS.live = 0;

    STATS.dead = 0;

    STATS.favorites = 0;

    STATS.categories = {};

    STATS.countries = {};

    all.forEach(channel => {

        /*
        LIVE CHANNELS
        */

        if(channel.url && channel.url.startsWith("http")){

            STATS.live++;

        }else{

            STATS.dead++;

        }

        /*
        FAVORITES
        */

        if(channel.favorite){

            STATS.favorites++;

        }

        /*
        CATEGORY COUNT
        */

        let category = channel.category || "General";

        STATS.categories[category] =

            (STATS.categories[category] || 0) + 1;

        /*
        COUNTRY COUNT
        */

        let country = channel.country || "Unknown";

        STATS.countries[country] =

            (STATS.countries[country] || 0) + 1;

    });

    updateDashboard();

}


/*
=====================================
UPDATE DASHBOARD
=====================================
*/

function updateDashboard(){

    setValue("total", STATS.total);

    setValue("live", STATS.live);

    setValue("fav", STATS.favorites);

    setValue("dead", STATS.dead);

}


/*
=====================================
SET HTML VALUE
=====================================
*/

function setValue(id,value){

    const element = document.getElementById(id);

    if(element){

        element.textContent = value;

    }

}


/*
=====================================
CATEGORY REPORT
=====================================
*/

function showCategories(){

    console.table(STATS.categories);

}


/*
=====================================
COUNTRY REPORT
=====================================
*/

function showCountries(){

    console.table(STATS.countries);

}


/*
=====================================
TOP CATEGORY
=====================================
*/

function topCategory(){

    let winner = "";

    let highest = 0;

    for(let category in STATS.categories){

        if(STATS.categories[category] > highest){

            highest = STATS.categories[category];

            winner = category;

        }

    }

    return {

        category: winner,

        total: highest

    };

}


/*
=====================================
TOP COUNTRY
=====================================
*/

function topCountry(){

    let winner = "";

    let highest = 0;

    for(let country in STATS.countries){

        if(STATS.countries[country] > highest){

            highest = STATS.countries[country];

            winner = country;

        }

    }

    return {

        country: winner,

        total: highest

    };

}


/*
=====================================
CHANNEL HEALTH
=====================================
*/

function health(){

    let percent = 0;

    if(STATS.total > 0){

        percent =

            ((STATS.live / STATS.total) * 100)

            .toFixed(1);

    }

    return percent;

}


/*
=====================================
PRINT REPORT
=====================================
*/

function report(){

    console.log("========== IPTV REPORT ==========");

    console.table({

        "Total Channels": STATS.total,

        "Live Channels": STATS.live,

        "Dead Channels": STATS.dead,

        "Favorites": STATS.favorites,

        "Health (%)": health()

    });

}


/*
=====================================
AUTO REFRESH
=====================================
*/

setInterval(function(){

    stats();

},30000);


/*
=====================================
MODULE READY
=====================================
*/

console.log("Statistics Module Loaded");
js/
│   ├── stats.js