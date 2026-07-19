/* ==========================================
   BTECH-TV WORLD ULTRA MAX X
   player.js
   Advanced IPTV Video Player
   ========================================== */

const video = document.getElementById("video");

let currentVolume = 1;
let isMuted = false;

/* ==========================================
   PLAY CHANNEL
========================================== */

function playChannel(url, title = "Live Channel") {

    if (!video) return;

    // HLS Support
    if (url.endsWith(".m3u8")) {

        if (window.Hls && Hls.isSupported()) {

            if (window.hlsPlayer) {
                window.hlsPlayer.destroy();
            }

            window.hlsPlayer = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 30,
                maxBufferLength: 10,
                maxMaxBufferLength: 20,
                liveSyncDuration: 3,
                liveMaxLatencyDuration: 5
            });

            window.hlsPlayer.loadSource(url);
            window.hlsPlayer.attachMedia(video);

            window.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => {});
            });

        } else {

            video.src = url;
            video.play().catch(() => {});

        }

    } else {

        video.src = url;
        video.play().catch(() => {});

    }

    setChannelTitle(title);

}

/* ==========================================
   PAUSE
========================================== */

function pauseChannel() {

    if (video)
        video.pause();

}

/* ==========================================
   PLAY
========================================== */

function resumeChannel() {

    if (video)
        video.play();

}

/* ==========================================
   STOP
========================================== */

function stopChannel() {

    if (!video) return;

    video.pause();
    video.removeAttribute("src");
    video.load();

}

/* ==========================================
   TOGGLE PLAY
========================================== */

function togglePlay() {

    if (video.paused)

        video.play();

    else

        video.pause();

}

/* ==========================================
   VOLUME
========================================== */

function volumeUp() {

    if (!video) return;

    video.volume = Math.min(1, video.volume + 0.1);

}

function volumeDown() {

    if (!video) return;

    video.volume = Math.max(0, video.volume - 0.1);

}

function setVolume(value) {

    if (!video) return;

    video.volume = value;

}

/* ==========================================
   MUTE
========================================== */

function toggleMute() {

    if (!video) return;

    isMuted = !isMuted;

    video.muted = isMuted;

}

/* ==========================================
   FULLSCREEN
========================================== */

function fullscreenPlayer() {

    const player = document.querySelector(".player");

    if (!player) return;

    if (document.fullscreenElement) {

        document.exitFullscreen();

    } else {

        player.requestFullscreen();

    }

}

/* ==========================================
   PICTURE IN PICTURE
========================================== */

async function pictureInPicture() {

    if (!document.pictureInPictureEnabled) return;

    try {

        if (document.pictureInPictureElement)

            await document.exitPictureInPicture();

        else

            await video.requestPictureInPicture();

    } catch (e) {

        console.log(e);

    }

}

/* ==========================================
   MINI PLAYER
========================================== */

function miniPlayer() {

    document.querySelector(".player").classList.toggle("mini");

}

/* ==========================================
   PLAYBACK SPEED
========================================== */

function setPlaybackSpeed(speed) {

    if (!video) return;

    video.playbackRate = speed;

}

/* ==========================================
   SEEK
========================================== */

function forward(seconds = 10) {

    if (!video) return;

    video.currentTime += seconds;

}

function rewind(seconds = 10) {

    if (!video) return;

    video.currentTime -= seconds;

}

/* ==========================================
   SCREENSHOT
========================================== */

function takeScreenshot() {

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const link = document.createElement("a");

    link.download = "channel.png";
    link.href = canvas.toDataURL("image/png");

    link.click();

}

/* ==========================================
   CHANNEL TITLE
========================================== */

function setChannelTitle(title) {

    let label = document.getElementById("channelTitle");

    if (!label) {

        label = document.createElement("div");

        label.id = "channelTitle";

        label.style.position = "absolute";
        label.style.top = "15px";
        label.style.left = "15px";
        label.style.padding = "8px 14px";
        label.style.background = "rgba(0,0,0,.65)";
        label.style.color = "#fff";
        label.style.borderRadius = "25px";
        label.style.fontWeight = "bold";
        label.style.zIndex = "999";

        document.querySelector(".player").appendChild(label);

    }

    label.innerHTML = "📺 " + title;

}

/* ==========================================
   BUFFER EVENTS
========================================== */

video?.addEventListener("waiting", () => {

    console.log("Buffering...");

});

video?.addEventListener("playing", () => {

    console.log("Playing");

});

/* ==========================================
   ERROR HANDLING
========================================== */

video?.addEventListener("error", () => {

    console.log("Playback Error");

});

/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown", function(e){

    switch(e.key.toLowerCase()){

        case " ":
            e.preventDefault();
            togglePlay();
            break;

        case "f":
            fullscreenPlayer();
            break;

        case "m":
            toggleMute();
            break;

        case "p":
            pictureInPicture();
            break;

        case "arrowright":
            forward(10);
            break;

        case "arrowleft":
            rewind(10);
            break;

        case "+":
            volumeUp();
            break;

        case "-":
            volumeDown();
            break;

    }

});

/* ==========================================
   AUTO PLAY WHEN READY
========================================== */

video?.addEventListener("canplay", () => {

    video.play().catch(()=>{});

});

/* ==========================================
   END
========================================== */
