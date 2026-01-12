/* ================================
   CSS Variables (Theme)
   ================================ */
:root {
  --color-bg: #0f1115;
  --color-surface: #161a21;
  --color-primary: #5b8cff;
  --color-secondary: #2a2f3a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #9aa4b2;
  --color-accent: #4cd964;

  --font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;

  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
}

/* ================================
   Global Reset & Base Styles
   ================================ */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  font-family: var(--font-family);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ================================
   App Layout
   ================================ */
.app {
  width: 100%;
  max-width: 420px;
  padding: 24px;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ================================
   Header
   ================================ */
.app-header {
  text-align: center;
}

.app-title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.app-subtitle {
  margin: 8px 0 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

/* ================================
   Timer Section
   ================================ */
.timer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.progress-container {
  position: relative;
  width: 260px;
  height: 260px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring__background {
  fill: transparent;
  stroke: var(--color-secondary);
  stroke-width: 12;
}

.progress-ring__circle {
  fill: transparent;
  stroke: var(--color-primary);
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset var(--transition-normal);
}

.time-display {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.time-separator {
  margin: 0 2px;
}

/* ================================
   Controls
   ================================ */
.controls {
  display: flex;
  gap: 12px;
  width: 100%;
}

.btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: none;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition-fast),
    transform var(--transition-fast);
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #4a7df0;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-primary);
}

.btn-secondary:hover {
  background-color: #343a46;
}

/* ================================
   Mode Selector
   ================================ */
.mode-selector {
  display: flex;
  gap: 8px;
}

.mode-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: var(--radius-sm);
  background-color: transparent;
  border: 1px solid var(--color-secondary);
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.mode-btn:hover {
  color: var(--color-text-primary);
}

.mode-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

/* ================================
   Settings
   ================================ */
.settings {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.setting-item input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

/* ================================
   Stats
   ================================ */
.stats {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}

.stats strong {
  color: var(--color-text-primary);
}

/* ================================
   Footer
   ================================ */
.app-footer {
  text-align: center;
}

.hint {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

kbd {
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--color-secondary);
  font-size: 0.75rem;
}

/* ================================
   Responsive
   ================================ */
@media (max-width: 480px) {
  .progress-container {
    width: 220px;
    height: 220px;
  }

  .time-display {
    font-size: 2.5rem;
  }
}
