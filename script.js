'use strict';

/* ============================================================
   CONSTANTS & CONFIGURATION
   ============================================================ */
const DURATIONS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

const STORAGE_KEYS = {
  SETTINGS: 'pomodoro_settings',
  DAILY_COUNT: 'pomodoro_daily_count',
  DAILY_DATE: 'pomodoro_daily_date'
};

/* ============================================================
   DOM REFERENCES (DEFENSIVE LOOKUPS)
   ============================================================ */
const modeLabel = document.getElementById('mode-label');
const minutesEl = document.getElementById('time-minutes');
const secondsEl = document.getElementById('time-seconds');

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));

const autoSwitchToggle = document.getElementById('auto-switch-toggle');
const soundToggle = document.getElementById('sound-toggle');

const pomodoroCountEl = document.getElementById('pomodoro-count');

const alarmSound = document.getElementById('alarm-sound');

const progressCircle = document.querySelector('.progress-ring__circle');

/* ============================================================
   STATE
   ============================================================ */
let currentMode = 'pomodoro';
let remainingTime = DURATIONS[currentMode];
let totalTime = DURATIONS[currentMode];

let isRunning = false;
let timerStartTimestamp = null;
let animationFrameId = null;

/* ============================================================
   LOCAL STORAGE HANDLING
   ============================================================ */
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      return {
        autoSwitch: true,
        sound: true
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      autoSwitch: true,
      sound: true
    };
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify(settings)
    );
  } catch {
    /* silently fail */
  }
}

function loadDailyCount() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem(STORAGE_KEYS.DAILY_DATE);

    if (storedDate !== today) {
      localStorage.setItem(STORAGE_KEYS.DAILY_DATE, today);
      localStorage.setItem(STORAGE_KEYS.DAILY_COUNT, '0');
      return 0;
    }

    const count = parseInt(
      localStorage.getItem(STORAGE_KEYS.DAILY_COUNT),
      10
    );

    return Number.isFinite(count) ? count : 0;
  } catch {
    return 0;
  }
}

function incrementDailyCount() {
  const current = loadDailyCount();
  const next = current + 1;

  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_COUNT, String(next));
  } catch {
    /* silently fail */
  }

  pomodoroCountEl.textContent = String(next);
}

/* ============================================================
   TIMER LOGIC (ACCURATE, BACKGROUND-SAFE)
   ============================================================ */
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startPauseBtn.textContent = 'Pause';

  timerStartTimestamp = Date.now() - (totalTime - remainingTime) * 1000;
  requestTick();
}

function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  startPauseBtn.textContent = 'Start';

  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
}

function resetTimer() {
  pauseTimer();
  remainingTime = DURATIONS[currentMode];
  totalTime = DURATIONS[currentMode];
  updateDisplay();
  updateProgress();
}

function requestTick() {
  animationFrameId = requestAnimationFrame(tick);
}

function tick() {
  if (!isRunning) return;

  const elapsedSeconds = Math.floor(
    (Date.now() - timerStartTimestamp) / 1000
  );

  remainingTime = Math.max(totalTime - elapsedSeconds, 0);

  updateDisplay();
  updateProgress();

  if (remainingTime <= 0) {
    handleSessionComplete();
    return;
  }

  requestTick();
}

/* ============================================================
   SESSION TRANSITIONS
   ============================================================ */
function handleSessionComplete() {
  pauseTimer();

  if (soundToggle.checked && alarmSound) {
    alarmSound.currentTime = 0;
    alarmSound.play().catch(() => {});
  }

  if (currentMode === 'pomodoro') {
    incrementDailyCount();
  }

  if (autoSwitchToggle.checked) {
    switchMode(getNextMode());
    startTimer();
  } else {
    resetTimer();
  }
}

function getNextMode() {
  if (currentMode === 'pomodoro') {
    return 'shortBreak';
  }
  return 'pomodoro';
}

/* ============================================================
   UI UPDATES
   ============================================================ */
function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function updateProgress() {
  if (!progressCircle) return;

  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference}`;
  const offset =
    circumference - (remainingTime / totalTime) * circumference;

  progressCircle.style.strokeDashoffset = `${offset}`;
}

function updateModeUI() {
  modeLabel.textContent =
    currentMode === 'pomodoro'
      ? 'Pomodoro'
      : currentMode === 'shortBreak'
      ? 'Short Break'
      : 'Long Break';

  modeButtons.forEach(btn => {
    const isActive = btn.dataset.mode === currentMode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
}

/* ============================================================
   MODE MANAGEMENT
   ============================================================ */
function switchMode(mode) {
  if (!DURATIONS[mode]) return;

  pauseTimer();
  currentMode = mode;
  totalTime = DURATIONS[mode];
  remainingTime = totalTime;

  updateModeUI();
  updateDisplay();
  updateProgress();
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
startPauseBtn.addEventListener('click', () => {
  isRunning ? pauseTimer() : startTimer();
});

resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    switchMode(mode);
  });
});

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    event.preventDefault();
    isRunning ? pauseTimer() : startTimer();
  }
});

autoSwitchToggle.addEventListener('change', () => {
  saveSettings({
    autoSwitch: autoSwitchToggle.checked,
    sound: soundToggle.checked
  });
});

soundToggle.addEventListener('change', () => {
  saveSettings({
    autoSwitch: autoSwitchToggle.checked,
    sound: soundToggle.checked
  });
});

/* ============================================================
   INITIALIZATION
   ============================================================ */
(function init() {
  const settings = loadSettings();

  autoSwitchToggle.checked = Boolean(settings.autoSwitch);
  soundToggle.checked = Boolean(settings.sound);

  pomodoroCountEl.textContent = String(loadDailyCount());

  updateModeUI();
  updateDisplay();
  updateProgress();
})();
