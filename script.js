// Muscle groups configurations exactly matching your UI requirements (in hours)
const initialTimersConfig = [
    { id: 'leg', name: 'Leg', durationHours: 72 },
    { id: 'back', name: 'Back', durationHours: 72 },
    { id: 'chest', name: 'Chest', durationHours: 48 },
    { id: 'shoulder', name: 'Shoulder', durationHours: 48 },
    { id: 'triceps', name: 'Triceps', durationHours: 48 },
    { id: 'biceps', name: 'Biceps', durationHours: 24 },
    { id: 'abs', name: 'Abs', durationHours: 24 },
    { id: 'fourarms', name: 'FourArms', durationHours: 24 }
];

// Load states from Local Storage or initialize defaults
let timerStates = JSON.parse(localStorage.getItem('muscleTimersState')) || {};

// Sync local storage with config baseline
initialTimersConfig.forEach(config => {
    if (!timerStates[config.id]) {
        timerStates[config.id] = {
            id: config.id,
            name: config.name,
            totalSeconds: config.durationHours * 3600,
            secondsLeft: config.durationHours * 3600,
            isActive: false,
            endTime: null
        };
    } else {
        // If the timer was active when closed, recalculate missed time gap
        const state = timerStates[config.id];
        if (state.isActive && state.endTime) {
            const now = Date.now();
            const remaining = Math.max(0, Math.round((state.endTime - now) / 1000));
            state.secondsLeft = remaining;
            if (remaining === 0) {
                state.isActive = false;
                state.endTime = null;
            }
        }
    }
});

const dashboard = document.getElementById('dashboard');
const radius = 76;
const circumference = 2 * Math.PI * radius;

// Save layout state helper
function saveState() {
    localStorage.setItem('muscleTimersState', JSON.stringify(timerStates));
}

// Format seconds back into standard HH:MM:SS
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

// Format the exact calendar target completion time
function formatEndTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // modern midnight fix
    return `🔔 ${hours}:${minutes} ${ampm}`;
}

// Build HTML Layout
initialTimersConfig.forEach(config => {
    const state = timerStates[config.id];
    const card = document.createElement('div');
    card.className = `timer-card ${state.isActive ? 'active' : ''}`;
    card.id = `card-${config.id}`;

    card.innerHTML = `
                <div class="card-header">
                    <span class="muscle-title">${state.name}</span>
                    <div class="window-controls">🗖 ✕</div>
                </div>
                <div class="timer-display-container">
                    <svg class="progress-ring" width="180" height="180">
                        <circle class="progress-ring__circle-bg" cx="90" cy="90" r="${radius}"></circle>
                        <circle class="progress-ring__circle" id="ring-${config.id}" cx="90" cy="90" r="${radius}" 
                                stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"></circle>
                    </svg>
                    <div class="timer-text-box">
                        <span class="time-left" id="text-${config.id}">${formatTime(state.secondsLeft)}</span>
                        <span class="target-time" id="target-${config.id}">${formatEndTime(state.endTime)}</span>
                    </div>
                </div>
                <div class="controls">
                    <button class="btn btn-play" id="btn-toggle-${config.id}" onclick="toggleTimer('${config.id}')">
                        <svg id="icon-${config.id}" viewBox="0 0 24 24">
                            ${state.isActive ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' : '<path d="M8 5v14l11-7z"/>'}
                        </svg>
                    </button>
                    <button class="btn" onclick="resetTimer('${config.id}')">
                        <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                    </button>
                </div>
            `;
    dashboard.appendChild(card);
    updateVisuals(config.id);
});

// Update the visual timer components (Text & SVG Stroke)
function updateVisuals(id) {
    const state = timerStates[id];
    const textElement = document.getElementById(`text-${id}`);
    const targetElement = document.getElementById(`target-${id}`);
    const circle = document.getElementById(`ring-${id}`);

    textElement.innerText = formatTime(state.secondsLeft);
    targetElement.innerText = formatEndTime(state.endTime);

    // Compute dashoffset values
    const progress = state.secondsLeft / state.totalSeconds;
    const offset = circumference * (1 - progress);
    circle.style.strokeDashoffset = offset;
}

// Action: Play / Pause
function toggleTimer(id) {
    const state = timerStates[id];
    const card = document.getElementById(`card-${id}`);
    const icon = document.getElementById(`icon-${id}`);

    if (state.isActive) {
        // Pause it
        state.isActive = false;
        state.endTime = null;
        icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        card.classList.remove('active');
    } else {
        // Activate it
        state.isActive = true;
        state.endTime = Date.now() + (state.secondsLeft * 1000);
        icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        card.classList.add('active');
    }
    saveState();
    updateVisuals(id);
}

// Action: Reset
function resetTimer(id) {
    const state = timerStates[id];
    const card = document.getElementById(`card-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    const config = initialTimersConfig.find(c => c.id === id);

    state.isActive = false;
    state.secondsLeft = config.durationHours * 3600;
    state.endTime = null;

    icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    card.classList.remove('active');

    saveState();
    updateVisuals(id);
}

// Master Background Interval Loop tracking time decrement
setInterval(() => {
    initialTimersConfig.forEach(config => {
        const state = timerStates[config.id];
        if (state.isActive) {
            const now = Date.now();
            const remaining = Math.max(0, Math.round((state.endTime - now) / 1000));
            state.secondsLeft = remaining;

            if (remaining <= 0) {
                state.isActive = false;
                state.endTime = null;
                document.getElementById(`card-${config.id}`).classList.remove('active');
                document.getElementById(`icon-${config.id}`).innerHTML = '<path d="M8 5v14l11-7z"/>';
            }
            updateVisuals(config.id);
        }
    });
    // Periodically secure state updates in local storage frame ticks
    saveState();
}, 1000);