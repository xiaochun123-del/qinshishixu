const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const STORAGE_KEY = "qin-unlocked-v2";
const EXTRA_KEY = "qin-extra-v2";
const PERSONA_KEY = "qin-personas-v2"; 

function getUnlocked() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function saveUnlocked(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

function getExtraState() {
  try { return JSON.parse(localStorage.getItem(EXTRA_KEY)) || { wish: [], memo: [], prefs: { avoid: [], note: '', hideAvoid: false } }; }
  catch { return { wish: [], memo: [], prefs: { avoid: [], note: '', hideAvoid: false } }; }
}
function saveExtraState(st) { localStorage.setItem(EXTRA_KEY, JSON.stringify(st)); }

function getPersonas() { try { return JSON.parse(localStorage.getItem(PERSONA_KEY)) || []; } catch { return []; } }
function savePersona(code) {
  let arr = getPersonas();
  if (!arr.includes(code)) { arr.push(code); localStorage.setItem(PERSONA_KEY, JSON.stringify(arr)); }
}

function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('on'), 2000);
}

function playDing() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine'; osc1.frequency.setValueAtTime(880, ctx.currentTime);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime); gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc1.connect(gain1); gain1.connect(ctx.destination); osc1.start(); osc1.stop(ctx.currentTime + 0.5);
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle'; osc2.frequency.setValueAtTime(1318.51, ctx.currentTime);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime); gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc2.connect(gain2); gain2.connect(ctx.destination); osc2.start(); osc2.stop(ctx.currentTime + 0.4);
  } catch(e) {}
}

function renderNav(active) {
  const nav = document.createElement('nav');
  nav.className = "nav";
  nav.innerHTML = `
    <a href="index.html" class="logo">秦时食序</a>
    <div class="links">
      <a href="seasons.html" class="${active==='seasons'?'active':''}">四时</a>
      <a href="collection.html" class="${active==='collection'?'active':''}">集卡册</a>
      <a href="mbti.html" class="${active==='mbti'?'active':''}">美食人格</a>
      <a href="extra.html" class="${active==='extra'?'active':''}">探索坊</a>
      <a href="about.html" class="${active==='about'?'active':''}">关于</a>
    </div>`;
  document.body.prepend(nav);
}

function getQuery(key, def = '') {
  return new URLSearchParams(location.search).get(key) || def;
}

// ===== 新增：全站通用的图片生成函数 =====
function getImgTag(id, extraClass = '') {
  const num = id.replace('f', '');
  return `<img class="${extraClass}" 
            src="assets/img/f (${num}).png" 
            onerror="if(this.src.includes('.png')){this.src='assets/img/f (${num}).jpg'}else{this.style.opacity='0'}" 
            alt="${id}">`;
}