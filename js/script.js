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
let pause = false;
let allsecond = 0;
let allsecondBackup = 0;

hideBtns();

function hideBtns() {
  elPauseBtn.style.display = "none";
  elStopBtn.style.display = "none";
  elResetBtn.style.display = "none";

  let localSeconds = window.localStorage.getItem("seconds");
  if (localSeconds > 1) {
    startTimer(localSeconds);
  }

  elStartBtn.addEventListener("click", function (evt) {
    evt.preventDefault();

    let hourInput = Number(elHour.value);
    let minuteInput = Number(elMinute.value);
    let secondInput = Number(elSecond.value);
    allsecond = hourInput * 60 * 60 + minuteInput * 60 + secondInput;
    allsecondBackup = hourInput * 60 * 60 + minuteInput * 60 + secondInput;

    startTimer(allsecond);
  });

  elPauseBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    pause = !pause;

    if (pause) {
      interval = clearInterval(interval);
      elPauseBtn.textContent = "Resume";
    } else {
      let localTime = window.localStorage.getItem("seconds");
      startTimer(localTime);
      elPauseBtn.textContent = "Pause";
    }
  });
  elResetBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    pause = false;
    elPauseBtn.textContent = "Pause";
    allsecond = allsecondBackup;
    interval = clearInterval(interval);
    startTimer(allsecond);
  });
  elStopBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    allsecond = 1;
    window.localStorage.setItem("seconds", allsecond);
    interval = clearInterval(interval);
    startTimer(allsecond);
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
      interval = clearInterval(interval);
    }
  }, 1000);
}

function updateTime(allseconds) {
  let hours = Math.floor(allseconds / 60 / 60);
  let minutes = Math.floor((allsecond - hours * 60 * 60) / 60);
  let seconds = Math.floor(allseconds % 60);

  elTimeHour.textContent = hours;
  elTimeMinute.textContent = minutes;
  elTimeSecond.textContent = seconds;
}
