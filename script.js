const body = document.body;
const aura = document.querySelector('.aura-fluid');
const cursor = document.querySelector('.cursor-glow');

// 1. Mouse Interaction (The Fluid Effect)
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    aura.style.setProperty('--x', `${x}%`);
    aura.style.setProperty('--y', `${y}%`);
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Keyboard Shortcuts (Unique Feature)
document.addEventListener('keydown', (e) => {
    const keyMap = {
        '1': 'happy',
        '2': 'sad',
        '3': 'focused',
        '4': 'angry',
        '5': 'chill'
    };
    if (keyMap[e.key]) applyMood(keyMap[e.key]);
});

// 3. Real-Time Clock
setInterval(() => {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);

// 4. Enhanced Mood Logic
const moods = {
    happy: { color: '#FFD700', title: 'Radiant', quote: 'Sunshine is the best medicine.' },
    sad: { color: '#1E90FF', title: 'Deep Blue', quote: 'Rain cleanses the soul.' },
    focused: { color: '#00FA9A', title: 'Flow State', quote: 'Distraction is the enemy of greatness.' },
    angry: { color: '#FF4500', title: 'Ignite', quote: 'Power is energy under control.' },
    chill: { color: '#DDA0DD', title: 'Zenith', quote: 'Stillness is where the answer lies.' }
};

function applyMood(key) {
    const data = moods[key];
    body.style.setProperty('--aura-color', data.color);
    document.getElementById('mood-title').textContent = data.title;
    document.getElementById('mood-quote').textContent = data.quote;
    
    // Animate the Rings
    document.querySelector('.outer').style.borderColor = data.color;
    document.querySelector('.outer').style.transform = 'scale(1.2)';
    setTimeout(() => document.querySelector('.outer').style.transform = 'scale(1)', 500);

    // Save history
    addToHistory(key);
}

function addToHistory(key) {
    const list = document.getElementById('history-list');
    const item = document.createElement('div');
    item.className = 'history-entry';
    item.textContent = `${new Date().getHours()}:${new Date().getMinutes()} - ${key}`;
    list.prepend(item);
}

// Dock click listeners
document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => applyMood(item.dataset.mood));
});
