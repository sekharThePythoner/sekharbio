/* ===========================
   DISCIPLINE QUOTES
=========================== */
const quotes = [
  "Discipline is doing what needs to be done, even when you don’t feel like doing it.",
  "Motivation fades; discipline stays.",
  "You don’t need more motivation — you need more self-control.",
  "Do it tired. Do it bored. Do it anyway.",
  "Be stronger than your excuses.",
  "Comfort kills dreams; discipline builds them.",
  "Consistency beats talent.",
  "Real strength is doing it when no one’s watching.",
  "Emotion says stop; discipline says go.",
  "Don’t feel it. Just do it."
];

const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote-text");

if (quoteBox && quoteText) {
  quoteBox.addEventListener("click", () => {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = q;
  });
}

/* ===========================
   TYPEWRITER
=========================== */
const tw = document.getElementById("typewriter");
if (tw) {
  const msg = "BUILDING. GRINDING. EVOLVING.";
  let i = 0;
  setInterval(() => {
    tw.textContent = msg.slice(0, i++);
    if (i > msg.length) i = 0;
  }, 120);
}

/* ===========================
   SPORTS PANEL
=========================== */
const sports = {
  mma: { img: "mma.jpeg", desc: "Mixed Martial Arts", fav: "Khabib, Islam" },
  cricket: { img: "cricket.jpeg", desc: "Team sport", fav: "MS Dhoni" },
  formula1: { img: "formula1.jpeg", desc: "High speed racing", fav: "Max Verstappen" },
  football: { img: "football.jpeg", desc: "World’s game", fav: "CR7" },
  bjj: { img: "bjj.jpeg", desc: "Ground fighting", fav: "Do Bronx" }
};

const sportList = document.getElementById("sports-list");
const sportDetails = document.getElementById("sports-details");

if (sportList && sportDetails) {
  sportList.addEventListener("click", e => {
    if (!e.target.dataset.sport) return;
    document.querySelectorAll(".sport-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    const s = sports[e.target.dataset.sport];
    sportDetails.innerHTML = `
      <div class="sport-detail">
        <img src="${s.img}">
        <div class="sport-text">
          <h4>${e.target.dataset.sport.toUpperCase()}</h4>
          <p>${s.desc}</p>
          <p class="muted small">Fav: ${s.fav}</p>
        </div>
      </div>
    `;
  });
}

/* ===========================
   BROS TOGGLE
=========================== */
const btnOff = document.getElementById("btn-offline");
const btnOn = document.getElementById("btn-online");
const brosOff = document.getElementById("bros-offline");
const brosOn = document.getElementById("bros-online");

if (btnOff && btnOn && brosOff && brosOn) {
  btnOff.onclick = () => {
    brosOff.classList.remove("hidden");
    brosOn.classList.add("hidden");
    btnOff.classList.add("active");
    btnOn.classList.remove("active");
  };
  btnOn.onclick = () => {
    brosOff.classList.add("hidden");
    brosOn.classList.remove("hidden");
    btnOff.classList.remove("active");
    btnOn.classList.add("active");
  };
}

/* ===========================
   MUSIC PLAYER
=========================== */
const audio = document.getElementById("bg-audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const muteBtn = document.getElementById("mute-btn");
const trackName = document.getElementById("track-name");

const playlist = [
  { src: "bgsong.mp3", title: "bgsong.mp3" },
  { src: "bgsong1.mp3", title: "bgsong1.mp3" },
  { src: "bgsong2.mp3", title: "bgsong2.mp3" }
];

let track = 0;

function loadTrack() {
  audio.src = playlist[track].src;
  trackName.textContent = playlist[track].title;
}
loadTrack();

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
};

prevBtn.onclick = () => {
  track = (track - 1 + playlist.length) % playlist.length;
  loadTrack();
  audio.play();
};

nextBtn.onclick = () => {
  track = (track + 1) % playlist.length;
  loadTrack();
  audio.play();
};

muteBtn.onclick = () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "🔇" : "🔊";
};

/* ===========================
   VISITOR COUNTER
=========================== */
let visits = localStorage.getItem("visits") || 0;
visits++;
localStorage.setItem("visits", visits);
const vEl = document.getElementById("visits");
if (vEl) vEl.textContent = visits;

/* ===========================
   CANVAS PARTICLES
=========================== */
const canvas = document.getElementById("fx");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const dots = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5),
    vy: (Math.random() - 0.5)
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.fillStyle = "rgba(25,211,255,.6)";
      ctx.fillRect(p.x, p.y, 2, 2);
    });
    requestAnimationFrame(draw);
  }
  draw();
}
