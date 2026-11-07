let quizStep = 0;
let scores = { roujiamo:0, liangpi:0, paomo:0, biangbiang:0, zenggao:0, yushui:0 };

function initMbtiPage() {
  renderNav("mbti");
  renderQuestion();
}

function renderQuestion() {
  const box = document.querySelector("#quizBox");
  if (!box) return;

  if (quizStep >= QUIZ.length) return renderResult();

  const q = QUIZ[quizStep];
  box.innerHTML = `
    <div class="quiz-progress"><i style="width:${(quizStep/QUIZ.length)*100}%"></i></div>
    <div class="step">第 ${quizStep+1} / ${QUIZ.length} 题</div>
    <div class="q">${q.q}</div>
    <div class="opts">
      <button class="opt" data-side="a">A. ${q.a.t}</button>
      <button class="opt" data-side="b">B. ${q.b.t}</button>
    </div>`;

  box.querySelectorAll(".opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const side = btn.dataset.side;
      const add = side === "a" ? q.a.s : q.b.s;
      Object.keys(add).forEach(k => scores[k] += add[k]);
      quizStep++;
      renderQuestion();
    });
  });
}

function renderResult() {
  let best = "roujiamo", max = -1;
  Object.keys(scores).forEach(k => {
    if (scores[k] > max) { max = scores[k]; best = k; }
  });
  const p = PERSONAS[best];

  document.querySelector("#quizWrap").innerHTML = `
    <div class="result">
      <div class="r-tag">你的陕西美食人格</div>
      <div style="font-size:64px;margin-bottom:10px">${p.emoji}</div>
      <h2>${p.name}</h2>
      <p class="r-desc">${p.desc}</p>
      <p class="r-desc" style="color:var(--gold)">代表美食：${p.food} · ${p.city}</p>
      <div class="r-actions">
        <a href="map.html?season=spring" class="btn-line">去地图寻找它</a>
        <button class="btn-line" onclick="location.reload()">重新测试</button>
      </div>
    </div>`;
}