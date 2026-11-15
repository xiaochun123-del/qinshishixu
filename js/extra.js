renderNav('extra');

// 🔥 扩充到 12 句诗词
const POEMS = [
  "长安一片月，万户捣衣声。",
  "秦中自古帝王州，烟火最抚凡人心。",
  "夜市千灯照碧云，高楼红袖客纷纷。",
  "春风得意马蹄疾，一日看尽长安花。",
  "人间有味是清欢。",
  "八百里秦川，三千万老陕。",
  "暗闻歌吹声，知是长安路。",
  "长安白日照春空，绿杨结烟垂袅风。",
  "秦地罗敷女，采桑绿水边。",
  "长安古道马迟迟，高柳乱蝉嘶。",
  "秋风吹渭水，落叶满长安。",
  "浮云游子意，落日故人情。"
];

const STAMP_IMGS = {
  '大雁塔': 'assets/img/dayanta.png',
  '古城墙': 'assets/img/guchengqiang.png',
  '钟楼': 'assets/img/zhonglou.png',
  '碑林': 'assets/img/beilin.png'
};

function switchTab(name) {
  $$('.tabs button').forEach((b, i) => b.classList.toggle('on', ['wish','mix','memo'][i] === name));
  $$('.tab-content').forEach(c => c.classList.toggle('on', c.id === 'tab-' + name));
  if (name === 'wish') renderWish();
  if (name === 'mix') renderMix();
  if (name === 'memo') renderMemo();
}

function renderWish() {
  const st = getExtraState();
  const list = FOODS.filter(f => st.wish.includes(f.id));
  const el = $('#wishList');
  if (!list.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ink-dim)">还没有收藏的美食，去地图上点点“收藏”吧</div>`;
    return;
  }
  el.innerHTML = list.map(f => {
    const bgStyle = `background-image: ${getImgBg(f.id)};`;
    return `
    <div class="dish-card">
      <div class="thumb" style="${bgStyle}"></div>
      <div class="card-body">
        <div class="dc-top"><h4>${f.name}</h4><span class="city">${f.city}</span></div>
        <div class="dc-desc">${f.desc}</div>
        <div class="dc-acts">
          <button class="btn jade" onclick="markEat('${f.id}')">吃过（移入集卡）</button>
          <button class="btn ghost" onclick="delWish('${f.id}')">移除</button>
        </div>
      </div>
    </div>
  `}).join('');
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
  
  $('#mixResult').innerHTML = list.map(f => {
    const bgStyle = `background-image: ${getImgBg(f.id)};`;
    return `
    <div class="dish-card">
      <div class="thumb" style="${bgStyle}"></div>
      <div class="card-body">
        <div class="dc-top"><h4>${f.name}</h4><span class="city">${f.city}</span></div>
        <div class="dc-desc">${f.desc}</div>
        <div class="dc-acts">
          <button class="btn ghost" onclick="toggleWish('${f.id}')">收藏</button>
        </div>
      </div>
    </div>
  `}).join('');
}
function setMix(k, v) { mix[k] = v; renderMix(); }

function toggleWish(id) {
  let st = getExtraState();
  if (st.wish.includes(id)) { st.wish = st.wish.filter(x=>x!==id); toast('取消收藏'); }
  else { st.wish.push(id); toast('已加入收藏'); playDing(); }
  saveExtraState(st); renderMix();
}

let pendingImg = '';
function renderMemo() {
  const st = getExtraState();
  const el = $('#memoGrid');
  if (!st.memo.length) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ink-dim)">还没有留念，写下第一条吧</div>`;
    return;
  }
  
  el.innerHTML = st.memo.map(m => `
    <div class="memo-card" onclick="openPostcard('${m.id}')" style="cursor:pointer;">
      <div class="del-btn" onclick="event.stopPropagation(); delMemo('${m.id}')">×</div>
      <div class="memo-inner">
        <div class="memo-header">秦时食绘 · 专属留念</div>
        ${m.img ? `<img src="${m.img}">` : `<div style="height:160px; background:#1a1410; margin-bottom:15px; border:1px dashed var(--line); display:flex; justify-content:center; align-items:center; color:var(--faint); font-size:12px;">未上传照片</div>`}
        <h4 style="color:var(--gold-l); margin-bottom:8px; font-size:18px;">${m.title||'无名留念'}</h4>
        <p style="font-size:13px; color:var(--ink-dim); line-height:1.6; flex:1;">${m.note}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px; border-top:1px solid rgba(201,161,90,0.2); padding-top:10px; font-size:11px; color:var(--faint);">
          <span>${m.date}</span>
          <span style="font-family:'STKaiti', serif; color:#C14E31; border:1px solid #C14E31; padding:2px 4px; border-radius:2px;">${m.stampName || '大雁塔'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openPostcard(id) {
  const st = getExtraState();
  const m = st.memo.find(x => x.id === id);
  if (!m) return;

  let rawPoem = m.poem || "人间有味是清欢。";
  rawPoem = rawPoem.replace(/。/g, ''); 
  const finalPoem = `“${rawPoem}”`;

  const stampName = m.stampName || '大雁塔';
  const coverImg = STAMP_IMGS[stampName] || '';

  $('#postcardModal').innerHTML = `
    <button class="close-btn" onclick="event.stopPropagation(); closePostcard()">×</button>
    
    <div class="pc-3d-scene">
      <div class="pc-3d-card" onclick="this.classList.toggle('flipped')">
        
        <div class="pc-face pc-front">
          <div class="pc-front-frame">
            ${coverImg ? `<img src="${coverImg}">` : `<div class="cover-fallback">${stampName}</div>`}
          </div>
          <div class="pc-front-info">
            <h2 class="pc-front-title">${stampName}</h2>
            <p class="pc-front-sub">秦地拾遗 · 专属留念</p>
          </div>
        </div>

        <div class="pc-face pc-back">
          
          <div class="pc-back-left">
            <div class="photo-frame">
               ${m.img ? `<img src="${m.img}" class="user-photo">` : `<div class="user-photo empty">美食照片</div>`}
            </div>
            <div class="photo-caption">${m.title||'无名留念'}</div>
            
            <div class="calligraphy-signature">
              <span class="big-qin">秦</span>
              <span class="small-shishihui">时<br>食<br>绘</span>
            </div>
          </div>

          <div class="pc-back-right">
            
            <div class="pc-back-top">
              <div class="pc-zip-codes">
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              
              <div class="stamp-frame">
                ${coverImg ? `<img src="${coverImg}" class="stamp-img">` : `<div style="width:100%;height:100%;background:#ccc;"></div>`}
              </div>
            </div>

            <div class="pc-poem-area">
              <p class="pc-calligraphy">${finalPoem}</p>
            </div>

            <div class="pc-write-area">
              <div class="pc-salutation">致：</div>
              <div class="pc-text-content">${m.note}</div>
              <div class="pc-date">${m.date}</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  `;
  $('#postcardMask').classList.add('on');
}

function closePostcard() {
  $('#postcardMask').classList.remove('on');
  $('#postcardModal').innerHTML = '';
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
  const stampVal = $('#memoStamp').value; 
  
  if (!title && !note && !pendingImg) return toast('至少写一句或选一张图');
  const d = new Date();
  const date = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  
  // 强制随机抽取
  const randomIndex = Math.floor(Math.random() * POEMS.length);
  const randomPoem = POEMS[randomIndex];

  let st = getExtraState();
  st.memo.unshift({ id: 'm'+Date.now(), title, note, img: pendingImg, stampName: stampVal, date, poem: randomPoem });
  saveExtraState(st);
  
  $('#memoTitle').value = ''; $('#memoNote').value = ''; $('#memoThumb').innerHTML = ''; pendingImg = '';
  renderMemo(); 
  toast('明信片已生成！点击卡片可翻面');
  playDing();
}

function delMemo(id) {
  let st = getExtraState(); st.memo = st.memo.filter(x => x.id !== id); saveExtraState(st); renderMemo();
  toast('已删除留念');
}

renderWish();