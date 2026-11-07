/* 通用：读取当前季节并设置主题 */
function getSeason() {
  return new URLSearchParams(location.search).get("season") || "spring";
}
function applySeasonTheme(season) {
  document.documentElement.setAttribute("data-season", season);
}

/* 渲染导航（每个页面都调用） */
function renderNav(active) {
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <a href="index.html" class="logo">秦时时序</a>
    <div class="links">
      <a href="seasons.html" class="${active==='seasons'?'active':''}">四时</a>
      <a href="collection.html" class="${active==='collection'?'active':''}">集卡册</a>
      <a href="mbti.html" class="${active==='mbti'?'active':''}">美食人格</a>
    </div>`;
  document.body.prepend(nav);
}

/* 四季页：渲染卡片 + hover 切换背景 */
function initSeasonsPage() {
  renderNav("seasons");
  const root = document.querySelector(".seasons");
  const grid = document.querySelector(".season-grid");
  if (!grid) return;

  Object.entries(SEASONS).forEach(([key, s]) => {
    const card = document.createElement("a");
    card.className = "season-card";
    card.href = `map.html?season=${key}`;
    card.style.setProperty("--sc", s.color);
    card.innerHTML = `
      <div class="cn">${s.cn}</div>
      <div class="en">${s.en}</div>
      <div class="term">${s.term}</div>
      <div class="dishes">${s.dishes}</div>
      <div class="go">进入地图 →</div>`;
    card.addEventListener("mouseenter", () => root.setAttribute("data-active", key));
    grid.appendChild(card);
  });

  root.setAttribute("data-active", "spring");
}

/* ===== 点亮状态存储（通用） ===== */
const STORAGE_KEY = "qin-unlocked";

function getUnlocked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveUnlocked(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}