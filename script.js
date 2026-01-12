const MODES = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

let currentMode = "pomodoro";
let duration = MODES[currentMode];
let remaining = duration;
let startTimestamp = null;
let timerId = null;
let running = false;

const timeEl = document.getElementById("time");
const progressCircle = document.querySelector(".progress");
const modeLabel = document.getElementById("mode-label");
const todayCountEl = document.getElementById("today-count");
const alarm = document.getElementById("alarm");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
progressCircle.style.strokeDasharray = CIRCUMFERENCE;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updateDisplay() {
  timeEl.textContent = formatTime(remaining);
  const progress = 1 - remaining / duration;
  progressCircle.style.strokeDashoffset =
    CIRCUMFERENCE * (1 - progress);
}

function tick(timestamp) {
  if (!startTimestamp) startTimestamp = timestamp;
  const elapsed = Math.floor((timestamp - startTimestamp) / 1000);
  const newRemaining = Math.max(duration - elapsed, 0);

  if (newRemaining !== remaining) {
    remaining = newRemaining;
    updateDisplay();
  }

  if (remaining === 0) {
    stopTimer();
    handleSessionEnd();
    return;
  }

  if (running) {
    timerId = requestAnimationFrame(tick);
  }
}

function startTimer() {
  if (running) return;
  running = true;
  startTimestamp = performance.now() - (duration - remaining) * 1000;
  timerId = requestAnimationFrame(tick);
}

function stopTimer() {
  running = false;
  cancelAnimationFrame(timerId);
}

function resetTimer() {
  stopTimer();
  remaining = duration;
  startTimestamp = null;
  updateDisplay();
}

function switchMode(mode) {
  currentMode = mode;
  duration = MODES[mode];
  remaining = duration;
  startTimestamp = null;
  updateDisplay();
  modeLabel.textContent =
    mode === "pomodoro" ? "Pomodoro" : mode === "short" ? "Short Break" : "Long Break";

  modeButtons.forEach(btn =>
    btn.classList.toggle("active", btn.dataset.mode === mode)
  );
}

function handleSessionEnd() {
  alarm.currentTime = 0;
  alarm.play();

  if (currentMode === "pomodoro") {
    incrementTodayCount();
    switchMode("short");
  } else {
    switchMode("pomodoro");
  }
}

function incrementTodayCount() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem("pomodoroData") || "{}");
  data[todayKey] = (data[todayKey] || 0) + 1;
  localStorage.setItem("pomodoroData", JSON.stringify(data));
  updateTodayCount();
}

function updateTodayCount() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem("pomodoroData") || "{}");
  todayCountEl.textContent = data[todayKey] || 0;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    stopTimer();
    switchMode(btn.dataset.mode);
  });
});

updateTodayCount();
updateDisplay();
