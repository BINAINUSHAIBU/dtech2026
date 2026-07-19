// Global channel array
let allChannels = [];

// Load all channel files
async function loadAllChannels() {
  const files = [
    "data/channels_part1.json",
    "data/channels_part2.json",
    "data/channels_part3.json",
    "data/channels_part4.json",
    "data/channels_part5.json",
    "data/channels_part6.json",
    "data/channels_part7.json",
  ];

  try {
    document.getElementById("status").textContent = "Loading IPTV channels...";

    const data = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }

        return response.json();
      }),
    );

    allChannels = data.flat();

    console.log(`${allChannels.length.toLocaleString()} channels loaded.`);

    if (typeof renderCats === "function") renderCats();

    if (typeof doFilter === "function") doFilter();

    document.getElementById("status").textContent =
      `${allChannels.length.toLocaleString()} Channels Loaded`;

    return allChannels;
  } catch (err) {
    console.error(err);

    document.getElementById("status").textContent = "Failed to load channels";

    return [];
  }
}

// Auto load
window.addEventListener("DOMContentLoaded", loadAllChannels);


----------------------------------------------------
  // ================================
// BTECH-TV SMART IPTV FILTER ENGINE
// ================================

let allChannels = [];

async function loadChannels() {
    try {
        const res = await fetch("data/channels.json");
        allChannels = await res.json();
        renderChannels(allChannels);
    } catch (e) {
        console.error(e);
    }
}

function renderChannels(list) {

    const container = document.getElementById("channelGrid");
    container.innerHTML = "";

    if(list.length===0){
        container.innerHTML="<h2>No channels found.</h2>";
        return;
    }

    list.forEach(channel=>{

        container.innerHTML += `
        <div class="channel-card" onclick="playChannel('${channel.url}')">

            <img src="${channel.logo}" class="channel-logo">

            <h3>${channel.name}</h3>

            <p>🌍 ${channel.country}</p>

            <p>📂 ${channel.category}</p>

            <p>🗣 ${channel.language}</p>

            <span class="live">🔴 LIVE</span>

        </div>
        `;

    });

}

// ================================
// Country Filter
// ================================

function filterCountry(country){

    const result = allChannels.filter(c=>c.country===country);

    renderChannels(result);

}

// ================================
// Category Filter
// ================================

function filterCategory(category){

    const result = allChannels.filter(c=>c.category===category);

    renderChannels(result);

}

// ================================
// Language Filter
// ================================

function filterLanguage(language){

    const result = allChannels.filter(c=>c.language===language);

    renderChannels(result);

}

// ================================
// Search
// ================================

function searchChannels(){

    let keyword=document.getElementById("searchBox").value.toLowerCase();

    const result=allChannels.filter(c=>

        c.name.toLowerCase().includes(keyword) ||

        c.country.toLowerCase().includes(keyword) ||

        c.category.toLowerCase().includes(keyword) ||

        c.language.toLowerCase().includes(keyword)

    );

    renderChannels(result);

}

// ================================
// Play Channel
// ================================

function playChannel(url){

    let video=document.getElementById("player");

    if(Hls.isSupported()){

        let hls=new Hls();

        hls.loadSource(url);

        hls.attachMedia(video);

    }else{

        video.src=url;

    }

    video.play();

}

window.onload=loadChannels;



