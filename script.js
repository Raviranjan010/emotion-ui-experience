/**
 * MOOD CONFIGURATION
 * Add new moods here to automatically update the UI capabilities
 */
const moodData = {
    happy: {
        name: "Radiant",
        emoji: "☀️",
        color1: "#FFD200",
        color2: "#F7971E",
        animation: "anim-bounce",
        quote: "Keep your face to the sunshine and you cannot see a shadow.",
        music: "Listening to: Upbeat Indie Pop 🎸",
        accent: "#ffffff"
    },
    sad: {
        name: "Reflective",
        emoji: "🌧️",
        color1: "#00c6ff",
        color2: "#0072ff",
        animation: "anim-drift",
        quote: "The sky is not always blue, but it's always there.",
        music: "Listening to: Cinematic Piano 🎹",
        accent: "#e0f7fa"
    },
    focused: {
        name: "Deep Work",
        emoji: "💎",
        color1: "#141e30",
        color2: "#243b55",
        animation: "anim-pulse",
        quote: "Concentrate all your thoughts upon the work at hand.",
        music: "Listening to: Brown Noise / Lo-Fi 🎧",
        accent: "#00ffcc"
    },
    angry: {
        name: "Powerful",
        emoji: "🌋",
        color1: "#eb3349",
        color2: "#f45c43",
        animation: "anim-shake",
        quote: "Channel this energy into something unstoppable.",
        music: "Listening to: High-Octane Phonk 🏎️",
        accent: "#ffeb3b"
    },
    chill: {
        name: "Zen",
        emoji: "🌿",
        color1: "#11998e",
        color2: "#38ef7d",
        animation: "anim-float",
        quote: "Nature does not hurry, yet everything is accomplished.",
        music: "Listening to: Ambient Forest Sounds 🍃",
        accent: "#ffffff"
    }
};

// State Elements
const body = document.body;
const root = document.documentElement;
const mainEmoji = document.getElementById('main-emoji');
const moodTitle = document.getElementById('current-mood-display');
const moodQuote = document.getElementById('mood-quote');
const musicText = document.getElementById('music-text');
const greetingText = document.getElementById('greeting');
const bgGradient = document.querySelector('.bg-gradient');
const buttons = document.querySelectorAll('.mood-btn');

/**
 * CORE FUNCTIONS
 */

function applyMood(moodKey, isInitialLoad = false) {
    const data = moodData[moodKey];
    if (!data) return;

    // 1. Update Colors (CSS Variables)
    root.style.setProperty('--bg-color-1', data.color1);
    root.style.setProperty('--bg-color-2', data.color2);
    root.style.setProperty('--accent-color', data.accent);

    // 2. Update Content
    moodTitle.textContent = data.name;
    mainEmoji.textContent = data.emoji;
    moodQuote.textContent = `"${data.quote}"`;
    musicText.textContent = data.music;

    // 3. Update Animations
    mainEmoji.className = ''; // Reset classes
    void mainEmoji.offsetWidth; // Force reflow for animation restart
    mainEmoji.classList.add(data.animation);

    // 4. Update Button Styles
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mood === moodKey);
    });

    // 5. Haptic Feedback (if available on mobile)
    if (!isInitialLoad && 'vibrate' in navigator) {
        navigator.vibrate(50);
    }

    // 6. Persistence
    localStorage.setItem('userMood', moodKey);
}

function setGreeting() {
    const hour = new Date().getHours();
    let message = "Good Morning";
    if (hour >= 12 && hour < 17) message = "Good Afternoon";
    if (hour >= 17) message = "Good Evening";
    greetingText.textContent = message;
}

/**
 * EVENT LISTENERS
 */

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedMood = btn.dataset.mood;
        applyMood(selectedMood);
    });
});

document.getElementById('reset-btn').addEventListener('click', () => {
    localStorage.removeItem('userMood');
    window.location.reload();
});

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    const savedMood = localStorage.getItem('userMood') || 'happy';
    applyMood(savedMood, true);
});
