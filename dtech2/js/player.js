next();
prev();
toggleMute();
toggleFullscreen();
togglePiP();
/* ===================================
   BTECH-TV WORLD PRO MAX
   js/player.js
=================================== */

/*
=====================================
GLOBAL PLAYER VARIABLES
=====================================
*/

let video = document.getElementById("video");
let hls = null;
let currentChannel = 0;

/*
=====================================
PLAY CHANNEL
=====================================
*/

function play(index) {
  if (filtered.length === 0) return;

  currentChannel = index;

  const channel = filtered[currentChannel];

  if (!channel) return;

  updateNowPlaying(channel);

  document.title = channel.name + " | BTECH-TV WORLD PRO MAX";

  showLoading();

  if (hls) {
    hls.destroy();
    hls = null;
  }

  if (Hls.isSupported()) {
    hls = new Hls();

    hls.loadSource(channel.url);

    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      hideLoading();

      video.play();
    });

    hls.on(Hls.Events.ERROR, function () {
      hideLoading();

      console.log("Unable to load stream.");
    });
  } else {
    video.src = channel.url;

    video.onloadedmetadata = function () {
      hideLoading();

      video.play();
    };
  }
}

/*
=====================================
NEXT CHANNEL
=====================================
*/

function next() {
  if (filtered.length === 0) return;

  currentChannel++;

  if (currentChannel >= filtered.length) {
    currentChannel = 0;
  }

  play(currentChannel);
}

/*
=====================================
PREVIOUS CHANNEL
=====================================
*/

function prev() {
  if (filtered.length === 0) return;

  currentChannel--;

  if (currentChannel < 0) {
    currentChannel = filtered.length - 1;
  }

  play(currentChannel);
}

/*
=====================================
PLAY / PAUSE
=====================================
*/

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/*
=====================================
STOP PLAYER
=====================================
*/

function stopPlayer() {
  video.pause();

  video.removeAttribute("src");

  video.load();
}

/*
=====================================
MUTE
=====================================
*/

function toggleMute() {
  video.muted = !video.muted;
}

/*
=====================================
SET VOLUME
=====================================
*/

function setVolume(value) {
  video.volume = value;
}

/*
=====================================
FULLSCREEN
=====================================
*/

function toggleFullscreen() {
  const player = document.querySelector(".player-container");

  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/*
=====================================
PICTURE IN PICTURE
=====================================
*/

async function togglePiP() {
  if (!document.pictureInPictureEnabled) {
    alert("Picture-in-Picture not supported.");

    return;
  }

  try {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
  } catch (error) {
    console.log(error);
  }
}

/*
=====================================
PLAYBACK SPEED
=====================================
*/

function playback(rate) {
  video.playbackRate = rate;
}

/*
=====================================
REWIND
=====================================
*/

function rewind(seconds = 10) {
  video.currentTime -= seconds;
}

/*
=====================================
FORWARD
=====================================
*/

function forward(seconds = 10) {
  video.currentTime += seconds;
}

/*
=====================================
RESTART STREAM
=====================================
*/

function restartStream() {
  video.currentTime = 0;

  video.play();
}

/*
=====================================
CAPTURE CURRENT FRAME
=====================================
*/

function captureFrame() {
  const canvas = document.createElement("canvas");

  canvas.width = video.videoWidth;

  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(video, 0, 0);

  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");

  link.href = image;

  link.download = "channel-frame.png";

  link.click();
}

/*
=====================================
NOW PLAYING
=====================================
*/

function updateNowPlaying(channel) {
  let box = document.getElementById("nowPlaying");

  if (!box) return;

  box.innerHTML = `

        <h3>Now Playing</h3>

        <p>${channel.name}</p>

    `;
}

/*
=====================================
AUTO NEXT IF STREAM ENDS
=====================================
*/

video.addEventListener("ended", function () {
  next();
});

/*
=====================================
VIDEO EVENTS
=====================================
*/

video.addEventListener("play", function () {
  console.log("Playing");
});

video.addEventListener("pause", function () {
  console.log("Paused");
});

video.addEventListener("waiting", function () {
  showLoading();
});

video.addEventListener("playing", function () {
  hideLoading();
});

video.addEventListener("error", function () {
  hideLoading();

  console.log("Playback Error");
});

/*
=====================================
KEYBOARD SHORTCUTS
=====================================
*/

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowRight":
      next();

      break;

    case "ArrowLeft":
      prev();

      break;

    case " ":
      e.preventDefault();

      togglePlay();

      break;

    case "m":

    case "M":
      toggleMute();

      break;

    case "f":

    case "F":
      toggleFullscreen();

      break;

    case "p":

    case "P":
      togglePiP();

      break;
  }
});

/*
=====================================
PLAYER READY
=====================================
*/

console.log("Player Module Loaded");

const sounds = {
  click: new Audio("assets/sounds/click.mp3"),
  success: new Audio("assets/sounds/success.mp3"),
  error: new Audio("assets/sounds/error.mp3"),
  notification: new Audio("assets/sounds/notification.mp3"),
  startup: new Audio("assets/sounds/startup.mp3"),
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(() => {});
  }
}
playSound("click");
playSound("success");
playSound("notification");
playSound("error");
playSound("startup");
const sounds = {
  click: new Audio("assets/sounds/click.mp3"),
  success: new Audio("assets/sounds/success.mp3"),
  error: new Audio("assets/sounds/error.mp3"),
  notification: new Audio("assets/sounds/notification.mp3"),
  startup: new Audio("assets/sounds/startup.mp3"),
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(() => {});
  }
}
playSound("click");
playSound("success");
playSound("notification");
playSound("error");
playSound("startup");

playSound("click");
playSound("success");
playSound("notification");
playSound("error");
playSound("startup");

/* PLAYER */
.player-container{
background:#000;
border-radius:10px;
overflow:hidden;
height:320px;
flex-shrink:0;
}

video{width:100%;height:100%;}

/* CONTROLS */
.controls{
display:flex;
flex-wrap:wrap;
gap:8px;
margin:10px 0;
flex-shrink:0;
}

.controls button{
padding:8px 10px;
border:none;
border-radius:6px;
background:#152445;
color:#fff;
cursor:pointer;
}
.controls button:hover{background:#00d4ff;color:#000}