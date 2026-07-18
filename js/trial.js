/* ===================================
   BTECH-TV WORLD PRO MAX
   js/trial.js
=================================== */

/*
=====================================
TRIAL CONFIGURATION
=====================================
*/

const TRIAL = {
  duration: 120, // 2 Minutes

  remaining: 120,

  expired: false,

  timer: null,
};

/*
=====================================
START TRIAL
=====================================
*/

function startTrial() {
  TRIAL.remaining = TRIAL.duration;

  updateTrialTimer();

  TRIAL.timer = setInterval(function () {
    TRIAL.remaining--;

    updateTrialTimer();

    if (TRIAL.remaining <= 0) {
      expireTrial();
    }
  }, 1000);
}

/*
=====================================
UPDATE TIMER
=====================================
*/

function updateTrialTimer() {
  const minutes = Math.floor(TRIAL.remaining / 60);

  const seconds = TRIAL.remaining % 60;

  const text =
    "Trial expires in : " +
    minutes +
    "m " +
    String(seconds).padStart(2, "0") +
    "s";

  const timer = document.getElementById("timer");

  if (timer) {
    timer.innerHTML = text;
  }

  const floating = document.getElementById("floatingTimer");

  if (floating) {
    floating.innerHTML =
      "⏱ " + minutes + "m " + String(seconds).padStart(2, "0") + "s";
  }
}

/*
=====================================
TRIAL EXPIRED
=====================================
*/

function expireTrial() {
  clearInterval(TRIAL.timer);

  TRIAL.expired = true;

  if (video) {
    video.pause();
  }

  showTrialOverlay();

  const timer = document.getElementById("timer");

  if (timer) {
    timer.innerHTML = "TRIAL EXPIRED";
  }

  const payment = document.getElementById("paymentArea");

  if (payment) {
    payment.style.display = "block";
  }
}

/*
=====================================
SHOW OVERLAY
=====================================
*/

function showTrialOverlay() {
  const overlay = document.getElementById("trialOverlay");

  if (!overlay) return;

  overlay.style.display = "flex";

  overlay.classList.remove("fade-out");

  overlay.classList.add("fade-in");
}

/*
=====================================
HIDE OVERLAY
=====================================
*/

function hideTrialOverlay() {
  const overlay = document.getElementById("trialOverlay");

  if (!overlay) return;

  overlay.classList.remove("fade-in");

  overlay.classList.add("fade-out");

  setTimeout(function () {
    overlay.style.display = "none";
  }, 300);
}

/*
=====================================
RESET TRIAL
=====================================
*/

function resetTrial() {
  clearInterval(TRIAL.timer);

  TRIAL.expired = false;

  TRIAL.remaining = TRIAL.duration;

  hideTrialOverlay();

  startTrial();
}

/*
=====================================
EXTEND TRIAL
=====================================
*/

function extendTrial(seconds) {
  TRIAL.remaining += seconds;
}

/*
=====================================
CHECK STATUS
=====================================
*/

function isTrialExpired() {
  return TRIAL.expired;
}

/*
=====================================
LOCK PLAYER
=====================================
*/

function lockPlayer() {
  if (video) {
    video.pause();

    video.controls = false;
  }
}

/*
=====================================
UNLOCK PLAYER
=====================================
*/

function unlockPlayer() {
  if (video) {
    video.controls = true;
  }
}

/*
=====================================
SHOW PAYMENT
=====================================
*/

function showPayment() {
  const payment = document.getElementById("paymentArea");

  if (payment) {
    payment.style.display = "block";
  }
}

/*
=====================================
HIDE PAYMENT
=====================================
*/

function hidePayment() {
  const payment = document.getElementById("paymentArea");

  if (payment) {
    payment.style.display = "none";
  }
}

/*
=====================================
AUTO START
=====================================
*/

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("trialOverlay");

  if (overlay) {
    overlay.style.display = "none";
  }

  startTrial();
});

/*
=====================================
WARNING MESSAGE
=====================================
*/

setInterval(function () {
  if (TRIAL.expired) return;

  if (TRIAL.remaining === 60) {
    alert("Only 1 minute remaining in your free trial.");
  }

  if (TRIAL.remaining === 30) {
    alert("30 seconds remaining.");
  }

  if (TRIAL.remaining === 10) {
    alert("Only 10 seconds left.");
  }
}, 1000);

/*
=====================================
UPGRADE BUTTON
=====================================
*/

function upgradeNow() {
  showPayment();
}

/*
=====================================
TRIAL INFORMATION
=====================================
*/

function trialInfo() {
  console.table({
    Status: TRIAL.expired ? "Expired" : "Running",

    Remaining: TRIAL.remaining + " Seconds",

    Duration: TRIAL.duration + " Seconds",
  });
}

/*
=====================================
MODULE READY
=====================================
*/

console.log("Trial Module Loaded");
