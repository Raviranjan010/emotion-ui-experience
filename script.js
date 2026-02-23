const moods = {
  happy:   { accent:'#ffd166', accent2:'#ff9f1c', glow:'rgba(255,200,80,0.22)', ring1:'rgba(255,200,80,0.28)', ring2:'rgba(255,150,28,0.14)', bg:'radial-gradient(ellipse 60% 55% at var(--mx,50%) var(--my,40%), rgba(255,200,80,0.2) 0%, transparent 70%)', title:'Radiant', quote:'"Sunshine is not just weather — it\'s a decision."', emoji:'☀️', intensity:82 },
  sad:     { accent:'#74b3e8', accent2:'#3a7bd5', glow:'rgba(100,170,240,0.2)', ring1:'rgba(100,170,240,0.25)', ring2:'rgba(58,123,213,0.12)', bg:'radial-gradient(ellipse 60% 55% at var(--mx,50%) var(--my,40%), rgba(80,140,220,0.18) 0%, transparent 70%)', title:'Deep Blue', quote:'"Rain doesn\'t fall to punish — it falls to cleanse."', emoji:'🌧️', intensity:38 },
  focused: { accent:'#64f5c0', accent2:'#00b4d8', glow:'rgba(80,230,180,0.2)', ring1:'rgba(80,230,180,0.28)', ring2:'rgba(0,180,216,0.14)', bg:'radial-gradient(ellipse 60% 55% at var(--mx,50%) var(--my,40%), rgba(60,220,170,0.18) 0%, transparent 70%)', title:'Flow State', quote:'"Distraction is the tax the unfocused pay to the undisciplined."', emoji:'💎', intensity:93 },
  angry:   { accent:'#ff6b4a', accent2:'#ff3d00', glow:'rgba(255,90,50,0.22)', ring1:'rgba(255,90,50,0.28)', ring2:'rgba(255,60,0,0.14)', bg:'radial-gradient(ellipse 60% 55% at var(--mx,50%) var(--my,40%), rgba(255,80,40,0.2) 0%, transparent 70%)', title:'Ignite', quote:'"Power is not force — it is fire under discipline."', emoji:'🌋', intensity:97 },
  chill:   { accent:'#c8b4ff', accent2:'#7fc8f8', glow:'rgba(200,180,255,0.18)', ring1:'rgba(200,180,255,0.22)', ring2:'rgba(127,200,248,0.14)', bg:'radial-gradient(ellipse 60% 55% at var(--mx,50%) var(--my,40%), rgba(180,160,240,0.16) 0%, transparent 70%)', title:'Zenith', quote:'"Stillness is where everything you\'ve been chasing finally arrives."', emoji:'🌿', intensity:55 }
};

const moodColors = { happy:'#ffd166', sad:'#74b3e8', focused:'#64f5c0', angry:'#ff6b4a', chill:'#c8b4ff' };

let current = null;
let sessionCounts = { happy:0, sad:0, focused:0, angry:0, chill:0 };

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('trail');
let mx=0, my=0, tx=0, ty=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cursor.style.left = mx+'px';
  cursor.style.top  = my+'px';
  // mesh follow
  const xp = (mx/window.innerWidth*100).toFixed(1)+'%';
  const yp = (my/window.innerHeight*100).toFixed(1)+'%';
  document.getElementById('mesh').style.setProperty('--mx', xp);
  document.getElementById('mesh').style.setProperty('--my', yp);
});
function animTrail() {
  tx += (mx-tx)*0.08; ty += (my-ty)*0.08;
  trail.style.left = tx+'px'; trail.style.top = ty+'px';
  requestAnimationFrame(animTrail);
}
animTrail();

// ── CLOCK ──
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function tick() {
  const n=new Date();
  document.getElementById('clock').textContent =
    n.toLocaleTimeString('en-US',{hour12:false});
  document.getElementById('dateChip').textContent =
    `${days[n.getDay()].slice(0,3)} ${n.getDate()} ${months[n.getMonth()]}`;
  // greeting
  const h=n.getHours();
  const g = h<5?'Late night 🌙':h<12?'Good morning ☀️':h<17?'Good afternoon 🌤':h<21?'Good evening 🌆':'Good night 🌙';
  document.getElementById('greeting').textContent=g;
}
tick(); setInterval(tick,1000);

// ── APPLY MOOD ──
function applyMood(key) {
  if(!moods[key]) return;
  const m = moods[key];
  current = key;

  // CSS vars
  const root = document.documentElement;
  root.style.setProperty('--accent', m.accent);
  root.style.setProperty('--accent2', m.accent2);
  root.style.setProperty('--glow', m.glow);
  root.style.setProperty('--ring1', m.ring1);
  root.style.setProperty('--ring2', m.ring2);

  // mesh bg color (update transition)
  document.getElementById('mesh').style.background = [
    m.bg,
    'radial-gradient(ellipse 40% 35% at 80% 80%, var(--ring2) 0%, transparent 60%)',
    'radial-gradient(ellipse 35% 30% at 15% 15%, rgba(120,90,200,0.1) 0%, transparent 60%)'
  ].join(',').replace('var(--ring2)', m.ring2);

  // text
  const title = document.getElementById('mood-title');
  const quote = document.getElementById('mood-quote');
  title.style.opacity='0'; quote.style.opacity='0';
  setTimeout(()=>{
    title.textContent=m.title;
    quote.textContent=m.quote;
    title.style.opacity='1'; quote.style.opacity='1';
    title.style.transition='opacity .5s ease';
    quote.style.transition='opacity .5s ease';
  },250);

  // orb
  document.getElementById('orb').textContent = m.emoji;
  document.getElementById('orb').style.background =
    `radial-gradient(circle at 38% 35%, ${m.accent2} 0%, ${m.accent} 45%, #200040 100%)`;
  document.getElementById('orb').style.boxShadow =
    `0 0 40px ${m.glow}, 0 0 80px ${m.glow}`;

  // intensity
  document.getElementById('intensityFill').style.width = m.intensity+'%';
  document.getElementById('intensityVal').textContent = m.intensity+'%';

  // key hints
  const keyMap = {happy:'1',sad:'2',focused:'3',angry:'4',chill:'5'};
  document.querySelectorAll('.key').forEach(k=>{
    k.classList.toggle('active', k.dataset.k===keyMap[key]);
  });

  // dock active
  document.querySelectorAll('.dock-btn[data-mood]').forEach(b=>{
    b.classList.toggle('active', b.dataset.mood===key);
  });

  // count & history
  sessionCounts[key]++;
  addHistory(key, m);
  updateStats();
  showToast(`${m.emoji} ${m.title} activated`);
}

// ── HISTORY ──
function addHistory(key, m) {
  const list = document.getElementById('history-list');
  const n = new Date();
  const t = n.toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'});
  const el = document.createElement('div');
  el.className='h-entry';
  el.innerHTML=`
    <div class="h-dot" style="background:${m.accent}"></div>
    <div class="h-text">
      <div class="h-mood">${key}</div>
      <div class="h-time">${t}</div>
    </div>
    <span style="font-size:.9rem">${m.emoji}</span>`;
  list.insertBefore(el, list.firstChild);
  // cap at 8
  while(list.children.length>8) list.removeChild(list.lastChild);
}

// ── STATS ──
function updateStats() {
  const total = Object.values(sessionCounts).reduce((a,b)=>a+b,0)||1;
  const rows = document.getElementById('stat-rows');
  rows.innerHTML='';
  Object.entries(sessionCounts).forEach(([k,v])=>{
    if(!v) return;
    const pct = Math.round(v/total*100);
    const div=document.createElement('div');
    div.className='stat-row';
    div.innerHTML=`
      <span class="stat-name">${k}</span>
      <div class="stat-bar-wrap"><div class="stat-bar-fill" style="width:${pct}%;background:${moodColors[k]}"></div></div>
      <span class="stat-count">${v}</span>`;
    rows.appendChild(div);
  });
}

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

// ── BREATH GUIDE ──
const breathPhrases = [
  ['Inhale slowly…', 4000],
  ['Hold…', 2000],
  ['Exhale gently…', 6000],
  ['Rest…', 2000]
];
let breathTimer, breathIdx=0, breathActive=false;
function startBreath() {
  breathActive=true;
  document.getElementById('breathOverlay').classList.add('active');
  document.getElementById('breathCircle').classList.add('breathing');
  runBreathPhase();
}
function runBreathPhase() {
  if(!breathActive) return;
  const [text, dur] = breathPhrases[breathIdx%breathPhrases.length];
  document.getElementById('breathPhase').textContent=text;
  breathTimer=setTimeout(()=>{ breathIdx++; runBreathPhase(); }, dur);
}
function stopBreath() {
  breathActive=false;
  clearTimeout(breathTimer);
  document.getElementById('breathOverlay').classList.remove('active');
  document.getElementById('breathCircle').classList.remove('breathing');
  breathIdx=0;
}
document.getElementById('breathBtn').addEventListener('click',startBreath);
document.getElementById('breathClose').addEventListener('click',stopBreath);

// ── KEYBOARD ──
document.addEventListener('keydown', e=>{
  const map={'1':'happy','2':'sad','3':'focused','4':'angry','5':'chill'};
  if(map[e.key]) applyMood(map[e.key]);
  if(e.key.toLowerCase()==='b') {
    breathActive ? stopBreath() : startBreath();
  }
  if(e.key==='Escape') stopBreath();
  if(e.key.toLowerCase()==='r') resetMood();
});

// ── DOCK CLICKS ──
document.querySelectorAll('.dock-btn[data-mood]').forEach(b=>{
  b.addEventListener('click',()=>applyMood(b.dataset.mood));
});

// ── RESET ──
function resetMood() {
  const root=document.documentElement;
  root.style.setProperty('--accent','#c8b4ff');
  root.style.setProperty('--accent2','#7fc8f8');
  root.style.setProperty('--glow','rgba(200,180,255,0.18)');
  root.style.setProperty('--ring1','rgba(200,180,255,0.22)');
  root.style.setProperty('--ring2','rgba(127,200,248,0.14)');
  document.getElementById('mood-title').textContent='Choose your state';
  document.getElementById('mood-quote').textContent='"The energy you invite is the energy you become."';
  document.getElementById('orb').textContent='✨';
  document.getElementById('intensityFill').style.width='60%';
  document.getElementById('intensityVal').textContent='60%';
  document.querySelectorAll('.dock-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.key').forEach(k=>k.classList.remove('active'));
  current=null;
  showToast('✨ State cleared');
}
document.getElementById('resetBtn').addEventListener('click', resetMood);

// ── CURSOR ENLARGE ON HOVER ──
document.querySelectorAll('button').forEach(b=>{
  b.addEventListener('mouseenter',()=>cursor.style.transform='translate(-50%,-50%) scale(2.2)');
  b.addEventListener('mouseleave',()=>cursor.style.transform='translate(-50%,-50%) scale(1)');
});
