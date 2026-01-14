:root {
    --bg-color-1: #1a1a2e;
    --bg-color-2: #16213e;
    --accent-color: #ffffff;
    --text-color: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.1);
    --font-main: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-main);
    background-color: var(--bg-color-1);
    color: var(--text-color);
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.8s ease;
}

/* Dynamic Animated Background */
.bg-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: linear-gradient(45deg, var(--bg-color-1), var(--bg-color-2));
    background-size: 400% 400%;
    animation: gradientMove 15s ease infinite;
    transition: all 1.2s ease;
}

.bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    backdrop-filter: blur(80px);
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
}

@keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Layout */
.app-container {
    text-align: center;
    z-index: 10;
    width: 90%;
    max-width: 600px;
}

h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 2rem;
    letter-spacing: -2px;
    text-transform: uppercase;
}

.greeting {
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
}

/* Stage & Emoji */
.stage {
    margin-bottom: 3rem;
}

.emoji-wrapper {
    font-size: 6rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    filter: drop-shadow(0 0 20px rgba(255,255,255,0.3));
}

/* Emoji Animations */
.anim-bounce { animation: bounce 2s infinite ease-in-out; }
.anim-float { animation: float 4s infinite ease-in-out; }
.anim-pulse { animation: pulse 2s infinite ease-in-out; }
.anim-shake { animation: shake 0.5s infinite; }
.anim-drift { animation: drift 5s infinite linear; }

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(5deg); } }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px) rotate(-5deg); } 75% { transform: translateX(5px) rotate(5deg); } }
@keyframes drift { 0% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 100% { transform: translateX(-10px); } }

/* Content Card */
.glass {
    background: var(--glass-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 2rem;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
}

#mood-quote {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-style: italic;
}

.music-suggestion {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-weight: 600;
    color: var(--accent-color);
}

/* Mood Selector */
.mood-selector {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 2rem;
}

.mood-btn {
    background: var(--glass-bg);
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 1.5rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mood-btn:hover {
    transform: scale(1.2);
    background: rgba(255,255,255,0.2);
    box-shadow: 0 0 20px var(--accent-color);
}

.mood-btn.active {
    background: white;
    transform: scale(1.1);
}

/* Reset Button */
#reset-btn {
    background: transparent;
    border: none;
    color: white;
    opacity: 0.5;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.8rem;
}

#reset-btn:hover { opacity: 1; }

/* Entrance Animation */
.fade-in {
    animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
