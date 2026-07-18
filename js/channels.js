load();
loadCat();
loadUltra();
loadM3U();
render();
play();
/* ===================================
   BTECH-TV WORLD PRO MAX
   js/channels.js
=================================== */

/*
=====================================
GLOBAL CHANNEL VARIABLES
=====================================
*/

let all = [];
let filtered = [];
let currentChannel = 0;


/*
=====================================
LOAD COUNTRY CHANNELS
=====================================
*/

async function load(country){

    const url =
        `https://iptv-org.github.io/iptv/countries/${country}.m3u`;

    await loadM3U(url);

}


/*
=====================================
LOAD CATEGORY CHANNELS
=====================================
*/

async function loadCat(category){

    const url =
        `https://iptv-org.github.io/iptv/categories/${category}.m3u`;

    await loadM3U(url);

}


/*
=====================================
LOAD LANGUAGE CHANNELS
=====================================
*/

async function loadLanguage(language){

    const url =
        `https://iptv-org.github.io/iptv/languages/${language}.m3u`;

    await loadM3U(url);

}


/*
=====================================
LOAD GLOBAL IPTV
=====================================
*/

async function loadUltra(){

    const url =
        "https://iptv-org.github.io/iptv/index.country.m3u";

    await loadM3U(url);

}


/*
=====================================
LOAD CUSTOM PLAYLIST
=====================================
*/

async function loadCustom(url){

    await loadM3U(url);

}


/*
=====================================
LOAD M3U PLAYLIST
=====================================
*/

async function loadM3U(url){

    try{

        showLoading();

        const response = await fetch(url);

        if(!response.ok){

            throw new Error("Unable to download playlist.");

        }

        const text = await response.text();

        parseM3U(text);

        render();

        stats();

        hideLoading();

        if(filtered.length){

            play(0);

        }

    }

    catch(error){

        hideLoading();

        console.error(error);

        alert("Unable to load IPTV playlist.");

    }

}


/*
=====================================
PARSE M3U
=====================================
*/

function parseM3U(text){

    all = [];
    filtered = [];

    const lines = text.split("\n");

    for(let i=0;i<lines.length;i++){

        if(lines[i].startsWith("#EXTINF")){

            const info = lines[i];

            const stream = lines[i+1];

            if(!stream) continue;

            if(!stream.startsWith("http")) continue;

            let name = info.split(",").pop().trim();

            let logo = "";

            let group = "";

            const logoMatch =
                info.match(/tvg-logo="([^"]+)"/);

            if(logoMatch){

                logo = logoMatch[1];

            }

            const groupMatch =
                info.match(/group-title="([^"]+)"/);

            if(groupMatch){

                group = groupMatch[1];

            }

            all.push({

                name:name,

                url:stream,

                logo:logo,

                category:group

            });

        }

    }

    filtered = [...all];

}


/*
=====================================
RENDER CHANNEL GRID
=====================================
*/

function render(){

    const grid =
        document.getElementById("grid");

    if(!grid) return;

    grid.innerHTML = "";

    filtered.forEach((channel,index)=>{

        const number =
            String(index+1).padStart(3,"0");

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="badge">
                LIVE
            </div>

            <div class="card-number">
                CH ${number}
            </div>

            ${
                channel.logo
                ?
                `<img
                    src="${channel.logo}"
                    style="
                        width:100%;
                        height:120px;
                        object-fit:contain;
                        margin-bottom:10px;
                    ">`
                :
                ""
            }

            <div class="card-title">

                ${channel.name}

            </div>

            <div class="card-category">

                ${channel.category || "General"}

            </div>

        `;

        card.onclick=function(){

            play(index);

        };

        grid.appendChild(card);

    });

}


/*
=====================================
SEARCH
=====================================
*/

function filterChannels(keyword){

    filtered = all.filter(channel=>{

        return channel.name
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            );

    });

    render();

}


/*
=====================================
SORT CHANNELS

/* CHANNELS */
.channel-wrapper{flex:1;overflow:hidden;display:flex;flex-direction:column;}

.channels{
overflow-y:auto;
flex:1;
display:grid;
grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); 
gap:10px;
padding-right:5px;
}

.card{
background:#111a31;
padding:10px;
border-radius:10px;
cursor:pointer;
border:1px solid #1f355d;
transition:.3s;
}
.card:hover{transform:scale(1.03);border-color:#00d4ff;}

.badge{
background:red;
padding:3px 6px;
border-radius:10px;
font-size:10px;
float:right;
}

@media(max-width:900px){
body{flex-direction:column;}
.sidebar{width:100%;}
}

=====================================
*/

function sortChannels(){

    filtered.sort((a,b)=>{

        return a.name.localeCompare(b.name);

    });

    render();

}


/*
=====================================
SHUFFLE CHANNELS
=====================================
*/

function shuffleChannels(){

    filtered.sort(()=>Math.random()-0.5);

    render();

}


/*
=====================================
FAVORITES
=====================================
*/

function favorite(index){

    all[index].favorite = true;

}


/*
=====================================
REMOVE FAVORITE
=====================================
*/

function removeFavorite(index){

    all[index].favorite = false;

}


/*
=====================================
SHOW FAVORITES
=====================================
*/

function showFavorites(){

    filtered =
        all.filter(c=>c.favorite);

    render();

}


/*
=====================================
CHANNEL INFORMATION
=====================================
*/

function channelInfo(index){

    console.table(filtered[index]);

}


/*
=====================================
EXPORT CHANNEL LIST
=====================================
*/

function exportChannels(){

    const json =
        JSON.stringify(all,null,2);

    const blob =
        new Blob([json],{

            type:"application/json"

        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =

        "channels.json";

    a.click();

}


/*
=====================================
RELOAD CURRENT PLAYLIST
=====================================
*/

function reloadChannels(){

    loadUltra();

}


/*
=====================================
CHANNEL COUNT
=====================================
*/

function totalChannels(){

    return all.length;

}


/*
=====================================
MODULE READY
=====================================
*/

console.log("Channels Module Loaded");

<script>

let all=[],filtered=[],i=0;
let video=document.getElementById("video");
let hls;

/* LOAD */
async function load(code){
await loadM3U(`https://iptv-org.github.io/iptv/countries/${code}.m3u`);
}

async function loadCat(c){
await loadM3U(`https://iptv-org.github.io/iptv/categories/${c}.m3u`);
}

async function loadUltra(){
await loadM3U("https://iptv-org.github.io/iptv/index.country.m3u");
}

/* M3U */
async function loadM3U(url){
const res=await fetch(url);
const text=await res.text();

all=[];filtered=[];i=0;

let lines=text.split("\n");

for(let x=0;x<lines.length;x++){
if(lines[x].startsWith("#EXTINF")){
let name=lines[x].split(",").pop();
let url=lines[x+1];
if(url && url.startsWith("http")) all.push({name,url});
}
}

filtered=[...all];
render();
stats();
}
/* RENDER */
function render(){

    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    filtered.forEach((c, idx)=>{

        // Remove quality labels only
      let cleanName = c.name
    .replace(/\s*\(\d+p\)/gi, "")
    .trim();

        // Channel number with leading zeros
        let ch = String(idx + 1).padStart(3, "0");

        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
    <div class="badge">LIVE</div>

    <div style="
        color:#00d4ff;
        font-weight:bold;
        font-size:14px;
        margin-bottom:6px;
    ">
        BTECH-TV&nbsp;&nbsp;CH ${ch}
    </div>

    <div style="
        color:#fff;
        font-size:16px;
        font-weight:600;
    ">
        ${cleanName}
    </div>
`;
        div.onclick = ()=>play(idx);

        grid.appendChild(div);

    });

}
async function loadAllChannels() {
  const files = [
    "data/channels_part1.json",
    "data/channels_part2.json",
    "data/channels_part3.json",
    "data/channels_part4.json",
    "data/channels_part5.json",
    "data/channels_part6.json",
    "data/channels_part7.json"
  ];

  const data = await Promise.all(
    files.map(file => fetch(file).then(r => r.json()))
  );

  const channels = data.flat();

  console.log(`Loaded ${channels.length} channels`);

  return channels;
}
const fs = require("fs");

const files = [
  "channels_part1.json",
  "channels_part2.json",
  "channels_part3.json",
  "channels_part4.json",
  "channels_part5.json",
  "channels_part6.json",
  "channels_part7.json"
];

let channels = [];

for (const file of files) {
  channels.push(...JSON.parse(fs.readFileSync(file, "utf8")));
}

fs.writeFileSync(
  "channels.json",
  JSON.stringify(channels, null, 2)
);

console.log(`${channels.length} channels merged successfully.`);
fetch("data/categories.json")
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      console.log(category.name);
    });
  });
  async function loadCountries() {
    const response = await fetch("data/countries.json");
    const countries = await response.json();

    const select = document.getElementById("countryFilter");

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name} (${country.channels})`;
        select.appendChild(option);
    });
}

loadCountries();
async function loadLanguages() {
    const response = await fetch("data/languages.json");
    const languages = await response.json();

    const select = document.getElementById("languageFilter");

    languages.forEach(language => {
        const option = document.createElement("option");
        option.value = language.code;
        option.textContent =
            `${language.flag} ${language.name} (${language.channels})`;

        select.appendChild(option);
    });
}

loadLanguages();
async function loadLogos() {
    const response = await fetch("data/logos.json");
    const logos = await response.json();

    const logoMap = {};

    logos.forEach(item => {
        logoMap[item.channelId] = item.logo;
    });

    return logoMap;
}

loadLogos().then(logos => {
    console.log(logos[1]); // logos/a2cnn.png
});
async function loadEPG() {
    const response = await fetch("data/epg.json");
    const epg = await response.json();

    const epgMap = {};

    epg.forEach(channel => {
        epgMap[channel.channelId] = channel;
    });

    return epgMap;
}

loadEPG().then(epg => {
    console.log(epg[1]);
});
function getCurrentProgram(channel) {
    const now = new Date();

    return channel.programs.find(program => {
        const start = new Date(program.start);
        const end = new Date(program.end);

        return now >= start && now < end;
    });
}
async function loadEPG() {
    const response = await fetch("data/epg.json");
    const epg = await response.json();

    const epgMap = {};

    epg.forEach(item => {
        epgMap[item.channelId] = item;
    });

    return epgMap;
}
function getCurrentProgram(channelId, epgMap) {
    const channel = epgMap[channelId];
    if (!channel) return null;

    const now = new Date();

    return channel.schedule.find(program => {
        return now >= new Date(program.start) &&
               now < new Date(program.end);
    });
}
const current = getCurrentProgram(1, epgMap);

if (current) {
    console.log(current.title);
    console.log(current.start);
    console.log(current.end);
}
Promise.all([
    fetch("data/channels.json").then(r => r.json()),
    fetch("data/categories.json").then(r => r.json()),
    fetch("data/countries.json").then(r => r.json()),
    fetch("data/languages.json").then(r => r.json()),
    fetch("data/settings.json").then(r => r.json())
]).then(([channels, categories, countries, languages, settings]) => {

    window.channels = channels;

    buildCountryMenu(countries);
    buildCategoryMenu(categories);
    buildLanguageMenu(languages);

    renderChannels(channels);

});


/* ==========================================================
   BTECH-TV WORLD ULTRA MAX X
   Channel Loader
========================================================== */

let allChannels = [];

// Load every channel database
async function loadAllChannels() {

    const files = [
        "data/channels_part1.json",
        "data/channels_part2.json",
        "data/channels_part3.json",
        "data/channels_part4.json",
        "data/channels_part5.json",
        "data/channels_part6.json",
        "data/channels_part7.json"
    ];

    const status = document.getElementById("status");

    try {

        if (status) {
            status.textContent = "Loading IPTV channels...";
        }

        const responses = await Promise.all(

            files.map(async file => {

                const response = await fetch(file);

                if (!response.ok) {
                    throw new Error(`Unable to load ${file}`);
                }

                return response.json();

            })

        );

        // Merge all files
        allChannels = responses.flat();

        // Sort by ID
        allChannels.sort((a, b) => a.id - b.id);

        console.log(
            `Loaded ${allChannels.length.toLocaleString()} channels`
        );

        // Render categories
        if (typeof renderCats === "function") {
            renderCats();
        }

        // Render countries
        if (typeof renderCountries === "function") {
            renderCountries();
        }

        // Render languages
        if (typeof renderLanguages === "function") {
            renderLanguages();
        }

        // Apply filters
        if (typeof doFilter === "function") {
            doFilter();
        }

        // Dashboard statistics
        if (status) {
            status.textContent =
                `${allChannels.length.toLocaleString()} Channels Loaded`;
        }

        const total = document.getElementById("totalChannels");

        if (total) {
            total.textContent =
                allChannels.length.toLocaleString();
        }

        return allChannels;

    }
    catch (error) {

        console.error(error);

        if (status) {
            status.textContent =
                "❌ Failed to load IPTV channels";
        }

        return [];

    }

}

/* ==========================================================
   Helpers
========================================================== */

function getChannelById(id) {
    return allChannels.find(channel => channel.id === id);
}

function getFavorites() {
    return allChannels.filter(channel => channel.favorite);
}

function getPremiumChannels() {
    return allChannels.filter(channel => channel.type === "Premium");
}

function getFreeChannels() {
    return allChannels.filter(channel => channel.type === "Free");
}

function getLockedChannels() {
    return allChannels.filter(channel => channel.locked);
}

function getOnlineChannels() {
    return allChannels.filter(channel => channel.status === "Online");
}

/* ==========================================================
   Auto Start
========================================================== */

window.addEventListener("DOMContentLoaded", async () => {

    await loadAllChannels();

    console.log("BTECH-TV Channel Database Ready");

});

