let elForm = document.querySelector(".timer__form");
let elStartBtn = document.querySelector(".startBtn");
let elPauseBtn = document.querySelector(".pauseBtn");
let elStopBtn = document.querySelector(".stopBtn");
let elResetBtn = document.querySelector(".resetBtn");
let elHour = document.querySelector(".hour");
let elMinute = document.querySelector(".minute");
let elSecond = document.querySelector(".second");
let elTimeHour = document.querySelector(".hourTime");
let elTimeMinute = document.querySelector(".minuteTime");
let elTimeSecond = document.querySelector(".secondTime");

let interval;
let pause;
let allsecond;
let allsecondBackup;
let pauses;

let tugadi = new Audio("Tugadi.mp3");
let start = new Audio("start.mp3");

hideBtns();

function hideBtns() {
  elPauseBtn.style.display = "none";
  elStopBtn.style.display = "none";
  elResetBtn.style.display = "none";

  if (!JSON.parse(window.localStorage.getItem("localPause")) || null) {
    allsecond = window.localStorage.getItem("seconds");
    if (allsecond > 1) {
      interval = clearInterval(interval);
      startTimer(allsecond);
      start.play();
    }
    elPauseBtn.textContent = "Pause";
  } else {
    elPauseBtn.style.display = "inline-block";
    elStopBtn.style.display = "inline-block";
    elResetBtn.style.display = "inline-block";
    elStartBtn.style.display = "none";
    elPauseBtn.textContent = "Resume";

    allsecond = window.localStorage.getItem("seconds");
    updateTime(allsecond);
  }

  elStartBtn.addEventListener("click", function (evt) {
    evt.preventDefault();

    let hourInput = Number(elHour.value);
    let minuteInput = Number(elMinute.value);
    let secondInput = Number(elSecond.value);
    if (hourInput != 0 || minuteInput != 0 || secondInput != 0) {
      allsecond = hourInput * 60 * 60 + minuteInput * 60 + secondInput;
      allsecondBackup = hourInput * 60 * 60 + minuteInput * 60 + secondInput;
      console.log(allsecond);
      window.localStorage.setItem("seconds", allsecond);
      window.localStorage.setItem("secondsBackup", allsecondBackup);
      if (window.localStorage.getItem("seconds") > 0) {
        startTimer(allsecond);
        start.play();
      }
    }
  });

  elPauseBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    pause = !JSON.parse(window.localStorage.getItem("localPause"));
    window.localStorage.setItem("localPause", pause);
    if (pause) {
      window.localStorage.setItem("localPause", pause);
      interval = clearInterval(interval);
      elPauseBtn.textContent = "Resume";
    } else {
      let localTime = window.localStorage.getItem("seconds");
      interval = clearInterval(interval);
      startTimer(localTime);
      start.play();
      elPauseBtn.textContent = "Pause";
    }
  });
  elResetBtn.addEventListener("click", function (evt) {
    window.localStorage.setItem("localPause", false);
    elPauseBtn.textContent = "Pause";
    allsecondBackup = window.localStorage.getItem("secondsBackup");
    console.log(allsecond);
    window.localStorage.setItem("seconds", allsecondBackup);
    interval = clearInterval(interval);
    startTimer(allsecond);
    start.play();
  });
  elStopBtn.addEventListener("click", function (evt) {
    allsecond = 1;
    window.localStorage.setItem("seconds", allsecond);
    window.localStorage.setItem("localPause", false);
    if (window.localStorage.getItem("seconds") <= 0) {
      interval = clearInterval(interval);
      startTimer(allsecond);
      tugadi.play();
      elPauseBtn.style.display = "none";
      elStopBtn.style.display = "none";
      elResetBtn.style.display = "none";
      elStartBtn.style.display = "inline-block";
    }
    interval = clearInterval(interval);
    startTimer(allsecond);
    tugadi.play();
    elPauseBtn.style.display = "none";
    elStopBtn.style.display = "none";
    elResetBtn.style.display = "none";
    elStartBtn.style.display = "inline-block";
  });
}

function startTimer(seconds) {
  elPauseBtn.style.display = "inline-block";
  elStopBtn.style.display = "inline-block";
  elResetBtn.style.display = "inline-block";
  elStartBtn.style.display = "none";

  interval = setInterval(function () {
    window.localStorage.setItem("seconds", seconds);
    seconds--;

    updateTime(seconds);

    if (seconds <= 0) {
      elPauseBtn.style.display = "none";
      elStopBtn.style.display = "none";
      elResetBtn.style.display = "none";
      elStartBtn.style.display = "inline-block";
      interval = clearInterval(interval);
      tugadi.play();
    }
  }, 1000);
}

function updateTime(secondsUpdate) {
  let hours = Math.floor(secondsUpdate / 60 / 60);

  let minutes = Math.floor((secondsUpdate - hours * 3600) / 60);
  let seconds = Math.floor(secondsUpdate % 60);

  elTimeHour.textContent = hours;
  elTimeMinute.textContent = minutes;
  elTimeSecond.textContent = seconds;
}
