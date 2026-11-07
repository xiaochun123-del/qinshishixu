function initMapPage() {
  renderNav("seasons");
  const season = getSeason();
  applySeasonTheme(season);
  const s = SEASONS[season];

  document.querySelector(".page-head h2").textContent = `${s.cn} · 时令地图`;
  document.querySelector(".page-head p").textContent = s.desc;

  const wrap = document.querySelector(".map-wrap");
  const foods = FOODS.filter(f => f.season === season);
  const unlocked = getUnlocked();

  foods.forEach(f => {
    const isDone = unlocked.includes(f.id);
    const dot = document.createElement("button");
    dot.className = "map-point" + (isDone ? " done" : "");
    dot.style.left = f.x + "%";
    dot.style.top = f.y + "%";
    dot.dataset.id = f.id;
    dot.innerHTML = `<span class="dot-label">${f.city}</span>`;
    dot.addEventListener("click", () => showDetail(f));
    wrap.appendChild(dot);
  });

  updateProgress(foods);

  document.querySelector(".detail-empty").textContent =
    "点击地图上的点位\n查看该地时令美食";

  if (foods.length) showDetail(foods[0]);
}

function showDetail(food) {
  const panel = document.querySelector(".detail-panel");
  const empty = panel.querySelector(".detail-empty");
  const body = panel.querySelector(".detail-body");
  empty.style.display = "none";
  body.classList.add("show");

  const unlocked = getUnlocked();
  const done = unlocked.includes(food.id);

  body.innerHTML = `
    <div class="detail-img" style="background-image:url('${food.img}'), linear-gradient(135deg,#3a2b1c,#14100c)"></div>
    <div class="detail-info">
      <span class="tag">${SEASONS[food.season].cn} · ${SEASONS[food.season].term}</span>
      <h3>${food.name}</h3>
      <div class="loc">${food.city}</div>
      <div class="row"><b>当地物产：</b>${food.product}</div>
      <div class="row"><b>地域文化：</b>${food.culture}</div>
      <div class="row"><b>推荐理由：</b>${food.desc}</div>
      <button class="btn-unlock ${done?'done':''}" data-id="${food.id}">
        ${done ? '已点亮 ✓' : '点亮打卡'}
      </button>
    </div>`;

  const btn = body.querySelector(".btn-unlock");
  if (!done) {
    btn.addEventListener("click", () => {
      const arr = getUnlocked();
      if (!arr.includes(food.id)) { arr.push(food.id); saveUnlocked(arr); }
      btn.textContent = "已点亮 ✓";
      btn.classList.add("done");
      const dot = document.querySelector(`.map-point[data-id="${food.id}"]`);
      if (dot) dot.classList.add("done");
      updateProgress(FOODS.filter(f => f.season === food.season));
    });
  }
}

function updateProgress(foods) {
  const unlocked = getUnlocked();
  const done = foods.filter(f => unlocked.includes(f.id)).length;
  const bar = document.querySelector(".progress-bar");
  if (!bar) return;
  bar.innerHTML = `本季进度 ${done} / ${foods.length}
    <div class="progress-track"><div class="progress-fill" style="width:${(done/foods.length)*100}%"></div></div>`;
}