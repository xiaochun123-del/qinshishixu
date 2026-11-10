renderNav('extra');

function switchTab(name) {
  $$('.tabs button').forEach((b, i) => b.classList.toggle('on', ['wish','mix','memo'][i] === name));
  $$('.tab-content').forEach(c => c.classList.toggle('on', c.id === 'tab-' + name));
  if (name === 'wish') renderWish();
  if (name === 'mix') renderMix();
  if (name === 'memo') renderMemo();
}

// ======= 想吃清单 =======
function renderWish() {
  const st = getExtraState();
  const list = FOODS.filter(f => st.wish.includes(f.id));
  const el = $('#wishList');
  if (!list.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ink-dim)">还没有收藏的美食，去地图上点点“收藏”吧</div>`;
    return;
  }
  el.innerHTML = list.map(f => `
    <div class="dish-card">
      <div class="thumb">${getImgTag(f.id)}</div>
      <div class="card-body">
        <div class="dc-top"><h4>${f.name}</h4><span class="city">${f.city}</span></div>
        <div class="dc-desc">${f.desc}</div>
        <div class="dc-acts">
          <button class="btn jade" onclick="markEat('${f.id}')">吃过（移入集卡）</button>
          <button class="btn ghost" onclick="delWish('${f.id}')">移除</button>
        </div>
      </div>
    </div>
  `).join('');
}

function markEat(id) {
  let unlocked = getUnlocked();
  if (!unlocked.includes(id)) unlocked.push(id);
  saveUnlocked(unlocked);
  let st = getExtraState(); st.wish = st.wish.filter(x => x !== id); saveExtraState(st);
  toast('已加入集卡册'); playDing(); renderWish();
}
function delWish(id) {
  let st = getExtraState(); st.wish = st.wish.filter(x => x !== id); saveExtraState(st);
  renderWish();
}

// ======= 自选搭配 =======
let mix = { region: '', taste: '', type: '' };
const TASTES = ['香辣', '咸鲜醇厚', '清淡鲜爽', '香甜软糯'];
const TYPES = ['面食', '馍饼', '凉皮米皮', '汤羹炖菜', '腊味荤食', '甜品甜心'];

function renderMix() {
  const mk = (arr, key, cur) => arr.map(v => 
    `<div class="chip ${cur===v?'on':''}" onclick="setMix('${key}', '${v}')">${v}</div>`
  ).join('');
  
  $('#mixRegion').innerHTML = `<div class="chip ${mix.region===''?'on':''}" onclick="setMix('region','')">不限</div>` + mk(Object.keys(REGIONS), 'region', mix.region);
  $('#mixTaste').innerHTML = `<div class="chip ${mix.taste===''?'on':''}" onclick="setMix('taste','')">不限</div>` + mk(TASTES, 'taste', mix.taste);
  $('#mixType').innerHTML = `<div class="chip ${mix.type===''?'on':''}" onclick="setMix('type','')">不限</div>` + mk(TYPES, 'type', mix.type);

  let list = FOODS.filter(f => 
    (!mix.region || f.region === mix.region) && (!mix.taste || f.taste === mix.taste) && (!mix.type || f.type === mix.type)
  );
  
  $('#mixCount').textContent = `找到 ${list.length} 道符合条件的陕西美食`;
  $('#mixResult').innerHTML = list.map(f => `
    <div class="dish-card">
      <div class="thumb">${getImgTag(f.id)}</div>
      <div class="card-body">
        <div class="dc-top"><h4>${f.name}</h4><span class="city">${f.city}</span></div>
        <div class="dc-desc">${f.desc}</div>
        <div class="dc-acts">
          <button class="btn ghost" onclick="toggleWish('${f.id}')">收藏</button>
        </div>
      </div>
    </div>
  `).join('');
}
function setMix(k, v) { mix[k] = v; renderMix(); }

function toggleWish(id) {
  let st = getExtraState();
  if (st.wish.includes(id)) { st.wish = st.wish.filter(x=>x!==id); toast('取消收藏'); }
  else { st.wish.push(id); toast('已加入收藏'); playDing(); }
  saveExtraState(st); renderMix();
}

// ======= 留念区 =======
let pendingImg = '';
function renderMemo() {
  const st = getExtraState();
  const el = $('#memoGrid');
  if (!st.memo.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ink-dim)">还没有留念，写下第一条吧</div>`;
    return;
  }
  el.innerHTML = st.memo.map(m => `
    <div class="memo-card">
      ${m.img ? `<img src="${m.img}">` : `<div style="height:120px;background:#2a1e14;"></div>`}
      <div class="mb">
        <h4 style="color:var(--gold-l); margin-bottom:6px;">${m.title||'无名留念'}</h4>
        <p style="font-size:13px; color:var(--ink-dim); line-height:1.5;">${m.note}</p>
        <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:11px; color:#8F7C63;">
          <span>${m.date}</span>
          <button onclick="delMemo('${m.id}')" style="color:#8F7C63;">删除</button>
        </div>
      </div>
    </div>
  `).join('');
}

function handleImg(e) {
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      const max = 600; let w = img.width, h = img.height;
      const s = Math.min(1, max / Math.max(w, h));
      c.width = w*s; c.height = h*s;
      c.getContext('2d').drawImage(img, 0, 0, w*s, h*s);
      pendingImg = c.toDataURL('image/jpeg', 0.7);
      $('#memoThumb').innerHTML = `<img src="${pendingImg}" style="height:80px;border-radius:3px;">`;
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function saveMemo() {
  const title = $('#memoTitle').value.trim();
  const note = $('#memoNote').value.trim();
  if (!title && !note && !pendingImg) return toast('至少写一句或选一张图');
  const d = new Date();
  const date = `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`;
  let st = getExtraState();
  st.memo.unshift({ id: 'm'+Date.now(), title, note, img: pendingImg, date });
  saveExtraState(st);
  $('#memoTitle').value = ''; $('#memoNote').value = ''; $('#memoThumb').innerHTML = ''; pendingImg = '';
  renderMemo(); toast('留念已保存');
}
function delMemo(id) {
  let st = getExtraState(); st.memo = st.memo.filter(x => x.id !== id); saveExtraState(st); renderMemo();
}

renderWish();