renderNav('mbti');
let step = -1; 
let answers = new Array(P_QUESTIONS.length).fill(null);

function renderQuiz() {
  const box = $('#quizBox');
  
  if (step === -1) {
    const gotPersonas = getPersonas();
    const P_ORDER = ['浓快群', '浓快独', '浓慢群', '浓慢独', '清快群', '清快独', '清慢群', '清慢独'];
    
    const previews = P_ORDER.map(code => {
      const p = P_PERSONAS[code];
      const isGot = gotPersonas.includes(code);
      return `<div style="border:1px solid ${isGot ? '#8A6C3C' : 'var(--line)'}; padding:10px; border-radius:3px; background:${isGot ? 'linear-gradient(165deg,#2C2216,#241B10)' : '#1F1811'}; opacity:${isGot ? '1' : '0.6'}; box-shadow:${isGot ? '0 0 18px -10px rgba(201,161,90,.4)' : 'none'};">
        <b style="color:var(--gold-l); font-size:15px; display:block; margin-bottom:5px;">${isGot ? p.name : '？？？'}</b>
        <span style="font-size:12px; color:var(--ink-dim);">${isGot ? p.tag : '待测出'}</span>
      </div>`;
    }).join('');

    box.innerHTML = `
      <div class="pq pq-intro">
        <div style="font-size:12px; letter-spacing:.4em; color:var(--gold);">SHAANXI FLAVOR PERSONA</div>
        <div class="pq-title">八问 · 见己一味</div>
        <p class="pq-sub">浓还是清，快还是慢，热闹还是独处——<br>三道轴交叉，照出你是哪一味陕西。</p>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:30px 0;">
          ${previews}
        </div>
        <button class="pq-start" onclick="startQuiz()">开 始 测 试</button>
        <p style="font-size:12px; color:var(--faint); margin-top:15px;">已点亮 ${gotPersonas.length} / 8 · 结果保存在本机</p>
      </div>`;
    return;
  }

  if (step >= P_QUESTIONS.length) return renderResult();

  const q = P_QUESTIONS[step];
  const ax = P_AXES[q.axis];
  const segs = P_QUESTIONS.map((_, i) => `<i class="${i<step?'done':(i===step?'now':'')}"></i>`).join('');

  box.innerHTML = `
    <div class="pq pq-quiz">
      <div class="pq-qn"><span>第 ${step+1} / ${P_QUESTIONS.length} 题</span><span>${ax.name} · ${ax.left}／${ax.right}</span></div>
      <div class="pq-segs">${segs}</div>
      <h3 class="pq-q">${q.q}</h3>
      <div class="pq-opts">
        <button class="pq-opt ${answers[step]==='a'?'sel':''}" onclick="answer('a')"><b>A</b><span>${q.a.t}</span></button>
        <button class="pq-opt ${answers[step]==='b'?'sel':''}" onclick="answer('b')"><b>B</b><span>${q.b.t}</span></button>
      </div>
      <div class="pq-foot">
        <button onclick="prevStep()" ${step===0?'style="opacity:.3;pointer-events:none"':''}>← 上一题</button>
        <span>凭直觉选择即可</span>
      </div>
    </div>`;
}

function startQuiz() { step = 0; answers.fill(null); renderQuiz(); }
function answer(side) { answers[step] = side; step++; renderQuiz(); }
function prevStep() { if (step > 0) { step--; renderQuiz(); } }
function backToCover() { step = -1; renderQuiz(); }

function renderResult() {
  const s = { taste:{l:0,r:0}, pace:{l:0,r:0}, scene:{l:0,r:0} };
  P_QUESTIONS.forEach((q, i) => {
    const a = answers[i]; if(!a) return;
    s[q.axis][a==='a'?'l':'r'] += 3;
  });
  const letter = {};
  Object.keys(P_AXES).forEach(k => {
    letter[k] = s[k].l >= s[k].r ? P_AXES[k].left : P_AXES[k].right;
  });
  const code = letter.taste + letter.pace + letter.scene;
  const p = P_PERSONAS[code];
  const food = FOODS.find(f => f.name === p.dish);

  savePersona(code);

  // 恢复到之前干净清爽的卡片样式
  $('#quizBox').innerHTML = `
    <div class="pq pq-res">
      <div style="font-size:12px; letter-spacing:.4em; color:var(--gold);">你 的 秦 味 人 格</div>
      <div class="pq-code">${code.split('').join(' · ')}</div>
      <div class="pq-name"><span class="pq-seal">${p.seal}</span>${p.name}</div>
      <div class="pq-tagline">${p.tag}</div>
      <p class="pq-desc">${p.desc}</p>
      <div class="pq-meta">
        <div><span>代 表</span><b>${p.dish}</b></div>
        <div><span>属 地</span><b>${p.city}</b></div>
        <div><span>关 键 词</span><b>${p.keys}</b></div>
      </div>
      <div class="pq-actions" style="margin-top: 40px;">
        <button class="btn ghost" onclick="backToCover()">← 返回封面</button>
        <a href="map.html?season=${food?food.season:'spring'}" class="btn pri">去地图找这道菜 →</a>
        <a href="seasons.html" class="btn ghost">返回四时</a>
      </div>
    </div>`;
}

renderQuiz();