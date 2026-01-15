// --- Quotes (your 50 Vives quotes) ---
const quotes = [
"Discipline is doing what needs to be done, even when you don’t feel like doing it.",
"Motivation fades; discipline stays.",
"You don’t need more motivation — you need more self-control.",
"Discipline means training your mind to obey you, not your emotions.",
"When motivation dies, discipline takes over.",
"The difference between the successful and the average is consistency.",
"Don’t chase motivation; build habits.",
"Discipline is the bridge between goals and reality.",
"Do it tired. Do it bored. Do it anyway.",
"Your mood doesn’t matter; your actions do.",
"Motivation gets you started, discipline keeps you going.",
"The best version of you doesn’t depend on feelings — it depends on discipline.",
"Be stronger than your excuses.",
"One hour of discipline beats ten hours of inspiration.",
"Comfort kills dreams; discipline builds them.",
"You don’t rise to the level of motivation — you fall to the level of discipline.",
"Real strength is doing it when no one’s watching.",
"You can’t be motivated every day, but you can be disciplined every day.",
"Losers wait for inspiration; winners work through boredom.",
"Motivation is temporary; discipline is permanent.",
"Get addicted to progress, not motivation.",
"Small daily actions create massive results over time.",
"Be the person who shows up no matter what.",
"Emotion says stop; discipline says go.",
"Success doesn’t need motivation — it needs consistency.",
"Your future self is watching your discipline right now.",
"Discipline is self-respect in action.",
"Learn to love the grind; it’s where greatness grows.",
"Discipline doesn’t care about your feelings — only your results.",
"Motivation is for beginners; discipline is for finishers.",
"Nobody is coming to save you — train yourself.",
"Consistency will do what motivation never could.",
"You can rest when it’s done.",
"Control your mind, or it will control you.",
"Motivation is a spark; discipline is the fire that keeps burning.",
"Discipline is choosing what you want most over what you want now.",
"Comfort is a slow killer.",
"Every time you skip the hard work, you train your mind to quit.",
"The grind won’t love you back — but it will reward you.",
"Motivation makes noise; discipline makes results.",
"Build a routine so strong that it doesn’t need motivation.",
"Winners don’t wait to feel ready.",
"Discipline doesn’t shout — it quietly builds empires.",
"Your success depends on what you do when you don’t want to do it.",
"You’ll never always be motivated — but you can always be disciplined.",
"Pain teaches discipline; comfort teaches nothing.",
"Stay consistent — even slow progress beats quitting.",
"Discipline turns goals into habits and habits into results.",
"The grind is lonely, but the success is loud.",
"Don’t feel it. Just do it."
];

// Quote box logic
const quoteBox = document.getElementById('quote-display');
const quoteText = document.getElementById('quote-display');


function showRandomQuote(){
  const idx = Math.floor(Math.random()*quotes.length);
  quoteText.textContent = quotes[idx];
  quoteBox.classList.add('flash');
  setTimeout(()=>quoteBox.classList.remove('flash'),420);
}



// --- Sports data (kept same as original) ---
const sports = {
  mma:{img:'mma.jpeg',desc:'Mixed Martial Arts (MMA) is a full-contact combat sport combining striking and grappling.',fav:'Khabib, Charles Oliveira, Dustin Poirier, Conor, Khamzat, Islam'},
  cricket:{img:'cricket.jpeg',desc:'Cricket blends skill, patience, and team play — a balance of focus and creativity.',fav:'MSD Dhoni, Hardik, Rohit',team:'India'},
  formula1:{img:'formula1.jpeg',desc:'Formula 1 is high-speed precision racing with elite drivers and engineering brilliance.',fav:'Max Verstappen'},
  football:{img:'football.jpeg',desc:'Football unites passion, skill, and rhythm — played and loved worldwide.',fav:'Maradona, Ronaldo, Neymar'},
  muaythai:{img:'muaythai.jpeg',desc:'Muay Thai, the art of eight limbs, uses elbows, knees, fists, and shins in perfect balance.',fav:'Rodtang'},
  sambo:{img:'sambo.jpeg',desc:'Sambo combines judo and wrestling — efficient, powerful, and fast.',fav:'Fedor Emelianenko'},
  bjj:{img:'bjj.jpeg',desc:'Brazilian Jiu Jitsu rewards technique and control — a mind game on the mat.',fav:'Do Bronx'},
  motogp:{img:'motogp.jpeg',desc:'MotoGP — raw speed and daring control on two wheels.',fav:'Valentino Rossi'}
};

const list = document.getElementById('sports-list');
const container = document.getElementById('sports-details');

list.addEventListener('click', e=>{
  if(e.target.classList.contains('sport-btn')){
    const key = e.target.dataset.sport;
    document.querySelectorAll('.sport-btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    const s = sports[key];
    container.innerHTML = `
      <div class="sport-detail">
        <img src="${s.img}" alt="${key}">
        <div class="sport-text">
          <h4>${key.toUpperCase()}</h4>
          <div>${s.desc}</div>
          <div class="muted small">Favorite: ${s.fav}${s.team?` | Team: ${s.team}`:''}</div>
        </div>
      </div>
    `;
  }
});

// --- Bros toggle ---
document.getElementById('btn-offline').addEventListener('click', ()=> showBros('offline'));
document.getElementById('btn-online').addEventListener('click', ()=> showBros('online'));
function showBros(which){
  const off = document.getElementById('bros-offline');
  const onl = document.getElementById('bros-online');
  const btnOff = document.getElementById('btn-offline');
  const btnOn = document.getElementById('btn-online');
  if(which === 'offline'){
    off.classList.remove('hidden');
    onl.classList.add('hidden');
    btnOff.classList.add('active'); btnOn.classList.remove('active');
  } else {
    off.classList.add('hidden'); onl.classList.remove('hidden');
    btnOff.classList.remove('active'); btnOn.classList.add('active');
  }
}

// --- Music player setup ---
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const muteBtn = document.getElementById('mute-btn');
const trackName = document.getElementById('track-name');

// Playlist (filenames you provided)
const playlist = [
  {src:'bgsong1.mp3', title:'bgsong1.mp3'},
  {src:'bgsong.mp3', title:'bgsong.mp3'},
  {src:'bgsong2.mp3', title:'bgsong2.mp3'},
  {src:'bgsong3.mp3', title:'bgsong3.mp3'},
  {src:'bgsong4.mp4', title:'bgsong4.mp4'}
];

let current = 0;
let userInteracted = false; // to allow autoplay after user interaction

function loadTrack(idx){
  const item = playlist[idx];
  if(!item) return;
  // remove previous sources
  while(audio.firstChild) audio.removeChild(audio.firstChild);
  // append source element (let browser choose)
  const src = document.createElement('source');
  src.src = item.src;
  audio.appendChild(src);
  audio.load();
  trackName.textContent = item.title;
}

function playTrack(){
  audio.play().then(()=> {
    playBtn.textContent = '⏸';
  }).catch(()=> {
    // autoplay denied; wait for user interaction
    playBtn.textContent = '▶';
  });
}

function pauseTrack(){
  audio.pause();
  playBtn.textContent = '▶';
}

playBtn.addEventListener('click', ()=>{
  if(audio.paused){
    playTrack();
  } else {
    pauseTrack();
  }
  userInteracted = true;
});

prevBtn.addEventListener('click', ()=>{
  current = (current - 1 + playlist.length) % playlist.length;
  loadTrack(current);
  playTrack();
  userInteracted = true;
});

nextBtn.addEventListener('click', ()=>{
  current = (current + 1) % playlist.length;
  loadTrack(current);
  playTrack();
  userInteracted = true;
});

muteBtn.addEventListener('click', ()=>{
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

// auto-move to next track at end
audio.addEventListener('ended', ()=>{
  current = (current + 1) % playlist.length;
  loadTrack(current);
  playTrack();
});

// initial load
loadTrack(current);

// Play once on first user gesture (keeps original "tap to play phonk" behavior)
window.addEventListener('pointerdown', function onFirst(){
  if(!userInteracted){
    // try to play the loaded track — browsers allow play after a user gesture
    audio.play().then(()=> { playBtn.textContent = '⏸'; }).catch(()=>{});
    userInteracted = true;
  }
  window.removeEventListener('pointerdown', onFirst);
});

// small accessibility: space on focused play button toggles play
playBtn.addEventListener('keydown', e => { if(e.code === 'Space') { e.preventDefault(); playBtn.click(); } });

// --- small UI niceties (flash on quote) ---
const style = document.createElement('style');
style.innerHTML = `
  .flash{animation:flashit .45s ease}
  @keyframes flashit{0%{box-shadow:0 0 0 rgba(25,211,255,0)}50%{box-shadow:0 0 24px rgba(25,211,255,0.14)}100%{box-shadow:0 0 0 rgba(25,211,255,0)}}
`;
document.head.appendChild(style);
// ---------- SAFE CYBER FX PACK ----------

// Neon hover
document.querySelectorAll(".card-small,.id-card").forEach(card=>{
  card.addEventListener("mouseenter",()=>{
    card.style.boxShadow="0 0 25px rgba(25,211,255,0.7)";
  });
  card.addEventListener("mouseleave",()=>{
    card.style.boxShadow="";
  });
});

// Visitor counter
let v = localStorage.getItem("visits") || 1000;
v++;
localStorage.setItem("visits",v);
const vEl = document.getElementById("visits");
if(vEl) vEl.textContent = v;

// Typewriter
const tw = document.getElementById("typewriter");
if(tw){
  const msg="BUILDING. GRINDING. EVOLVING.";
  let i=0;
  setInterval(()=>{
    tw.textContent = msg.slice(0,i++);
    if(i>msg.length) i=0;
  },120);
}

// Canvas particles
const c = document.getElementById("fx");
if(c){
  const ctx = c.getContext("2d");
  c.width=window.innerWidth;
  c.height=window.innerHeight;
  window.addEventListener("resize",()=>{
    c.width=window.innerWidth;
    c.height=window.innerHeight;
  });

  const p=[];
  for(let i=0;i<80;i++){
    p.push({
      x:Math.random()*c.width,
      y:Math.random()*c.height,
      vx:(Math.random()-0.5),
      vy:(Math.random()-0.5)
    });
  }

  function anim(){
    ctx.clearRect(0,0,c.width,c.height);
    p.forEach(o=>{
      o.x+=o.vx;
      o.y+=o.vy;
      if(o.x<0||o.x>c.width) o.vx*=-1;
      if(o.y<0||o.y>c.height) o.vy*=-1;
      ctx.fillStyle="rgba(25,211,255,.6)";
      ctx.fillRect(o.x,o.y,2,2);
    });
    requestAnimationFrame(anim);
  }
  anim();
}

// Scanline
const scan = document.getElementById("scanline");
if(scan){
  scan.style.position="fixed";
  scan.style.left="0";
  scan.style.top="0";
  scan.style.width="100%";
  scan.style.height="3px";
  scan.style.background="linear-gradient(90deg,transparent,#19d3ff,transparent)";
  scan.style.zIndex="9999";
  let y=0;
  setInterval(()=>{
    y+=2;
    if(y>window.innerHeight) y=0;
    scan.style.transform=`translateY(${y}px)`;
  },16);
}


