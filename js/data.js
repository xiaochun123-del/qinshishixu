/* ===== 四季主题配置 ===== */
const SEASONS = {
  spring: { cn: "春", en: "SPRING", term: "立春 · 春分", color: "#7ba05b",
            dishes: "荠菜麦饭 · 香椿豆腐 · 菜豆腐 · 春笋腊肉",
            desc: "春食鲜，草木初生，尝一口山野清气。" },
  summer: { cn: "夏", en: "SUMMER", term: "立夏 · 夏至", color: "#2d8b9e",
            dishes: "凉皮 · 浆水鱼鱼 · 蜂蜜凉粽 · 酸梅汤",
            desc: "夏食凉，暑气蒸腾，一碗浆水解千愁。" },
  autumn: { cn: "秋", en: "AUTUMN", term: "立秋 · 秋分", color: "#c47a2b",
            dishes: "柿子饼 · 洛川苹果 · 城固蜜桔 · 耀州核桃",
            desc: "秋食丰，瓜果满枝，秦地最是丰饶时。" },
  winter: { cn: "冬", en: "WINTER", term: "立冬 · 冬至", color: "#4a5d7e",
            dishes: "羊肉泡馍 · 臊子面 · 甑糕 · 紫阳蒸盆子",
            desc: "冬食暖，炉火正旺，一碗热汤慰风尘。" }
};

/* ===== 美食点位数据 =====
   x, y 是地图百分比坐标（0-100），已按陕西轮廓调好
   想加美食，照着复制一条即可 */
const FOODS = [
  /* ---------- 春 ---------- */
  { id:"spring-hanzhong", season:"spring", name:"汉中菜豆腐", city:"汉中",
    x:36.3, y:70.3, img:"assets/img/caidoufu.jpg",
    product:"汉中黄豆 · 浆水菜", 
    culture:"汉中地处陕南，气候温润，浆水点豆腐是当地人春日待客的家常味。",
    desc:"清淡微酸，配一碗热米皮，是陕南春天的开场。" },

  { id:"spring-xian", season:"spring", name:"荠菜麦饭", city:"西安",
    x:53.8, y:54.7, img:"assets/img/maifan.jpg",
    product:"关中冬小麦 · 野生荠菜",
    culture:"关中人把野菜拌面蒸熟叫“麦饭”，是麦收前最朴素的春味。",
    desc:"蘸蒜汁吃，面香裹着野菜的清苦回甘。" },

  { id:"spring-baoji", season:"spring", name:"香椿拌豆腐", city:"宝鸡",
    x:32.5, y:51.6, img:"assets/img/xiangchun.jpg",
    product:"秦岭香椿 · 农家石磨豆腐",
    culture:"西府人春天必吃香椿，头茬椿芽价格赛肉，是时令的仪式感。",
    desc:"香椿焯水切碎，拌嫩豆腐，只加盐和香油。" },

  { id:"spring-ankang", season:"spring", name:"春笋炒腊肉", city:"安康",
    x:53.8, y:75, img:"assets/img/chunsun.jpg",
    product:"秦巴山春笋 · 陕南腊肉",
    culture:"秦巴山区春笋破土，配上年猪腊肉，是山里人的春天。",
    desc:"笋脆肉香，一口下去全是山野气。" },

  /* ---------- 夏 ---------- */
  { id:"summer-xian", season:"summer", name:"西安凉皮", city:"西安",
    x:53.8, y:54.7, img:"assets/img/liangpi.jpg",
    product:"关中小麦 · 秦椒辣子",
    culture:"凉皮是西安夏天的街头主角，秦镇米皮、麻酱凉皮各有拥趸。",
    desc:"筋道爽滑，辣子油一泼，暑气全消。" },

  { id:"summer-hanzhong", season:"summer", name:"浆水鱼鱼", city:"汉中",
    x:36.3, y:70.3, img:"assets/img/jiangshui.jpg",
    product:"浆水菜 · 玉米面",
    culture:"陕南人夏天离不开浆水，酸香解暑，是刻在基因里的味道。",
    desc:"漏成小鱼状，浇浆水，凉到心里。" },

  { id:"summer-xianyang", season:"summer", name:"蜂蜜凉粽子", city:"咸阳",
    x:43.8, y:53.1, img:"assets/img/liangzong.jpg",
    product:"关中糯米 · 秦岭土蜂蜜",
    culture:"老咸阳的夏日甜品，粽子的另一种打开方式。",
    desc:"糯米凉透，淋蜂蜜玫瑰酱，甜而不腻。" },

  { id:"summer-weinan", season:"summer", name:"酸梅汤", city:"渭南",
    x:66.3, y:53.9, img:"assets/img/suanmeitang.jpg",
    product:"乌梅 · 山楂 · 桂花",
    culture:"关中夏日街头，一碗冰镇酸梅汤最解渴。",
    desc:"乌梅山楂同煮，冰镇后酸甜生津。" },

  /* ---------- 秋 ---------- */
  { id:"autumn-xian", season:"autumn", name:"黄桂柿子饼", city:"西安",
    x:53.8, y:54.7, img:"assets/img/shizibing.jpg",
    product:"临潼火晶柿子 · 黄桂",
    culture:"临潼火晶柿子秋日上市，做成柿子饼是西安人的秋日甜。",
    desc:"外酥里糯，柿子香混着桂花香。" },

  { id:"autumn-yanan", season:"autumn", name:"洛川苹果", city:"延安",
    x:63.8, y:27.3, img:"assets/img/apple.jpg",
    product:"洛川红富士",
    culture:"黄土高原昼夜温差大，洛川苹果脆甜多汁，是陕北秋日的招牌。",
    desc:"咬一口，脆得响，甜得干净。" },

  { id:"autumn-hanzhong", season:"autumn", name:"城固蜜桔", city:"汉中",
    x:36.3, y:70.3, img:"assets/img/miju.jpg",
    product:"城固升仙蜜桔",
    culture:"城固蜜桔栽培上千年，秋日桔园金黄一片。",
    desc:"皮薄无核，酸甜适口。" },

  { id:"autumn-tongchuan", season:"autumn", name:"耀州核桃", city:"铜川",
    x:55, y:41.4, img:"assets/img/hetao.jpg",
    product:"宜君核桃",
    culture:"渭北旱塬适合核桃生长，秋收后晒干入仓。",
    desc:"仁饱油香，是秋天最扎实的零嘴。" },

  /* ---------- 冬 ---------- */
  { id:"winter-xian", season:"winter", name:"羊肉泡馍", city:"西安",
    x:53.8, y:54.7, img:"assets/img/paomo.jpg",
    product:"关中羊肉 · 饦饦馍",
    culture:"掰馍是西安人的冬日仪式，馍掰得越碎越入味。",
    desc:"汤浓肉烂，一碗下肚从头暖到脚。" },

  { id:"winter-baoji", season:"winter", name:"岐山臊子面", city:"宝鸡",
    x:32.5, y:51.6, img:"assets/img/saozimian.jpg",
    product:"岐山醋 · 扶风臊子",
    culture:"西府人红白喜事都吃臊子面，酸辣香是灵魂。",
    desc:"薄筋光、煎稀汪，一口面一口汤。" },

  { id:"winter-xianyang", season:"winter", name:"甑糕", city:"咸阳",
    x:43.8, y:53.1, img:"assets/img/zenggao.jpg",
    product:"关中糯米 · 陕北红枣",
    culture:"甑糕用古法甑蒸，是关中冬日的早餐记忆。",
    desc:"枣香米糯，热乎乎挖一勺。" },

  { id:"winter-ankang", season:"winter", name:"紫阳蒸盆子", city:"安康",
    x:53.8, y:75, img:"assets/img/zhengpenzi.jpg",
    product:"紫阳土鸡 · 汉江莲藕",
    culture:"陕南年夜饭的压轴，蒸盆子讲究层层码放、慢火久蒸。",
    desc:"汤清味浓，是陕南人的团圆味。" }
];

/* ===== MBTI 测试 ===== */
const QUIZ = [
  { q:"周末聚餐，你更像？",
    a:{ t:"张罗大家、点菜招呼", s:{ roujiamo:2, biangbiang:1 } },
    b:{ t:"安静干饭、专注美食", s:{ zenggao:2, paomo:1 } } },
  { q:"点餐时你更愿意？",
    a:{ t:"去经典老店、吃招牌", s:{ paomo:2, roujiamo:1 } },
    b:{ t:"尝试新奇搭配、踩新店", s:{ liangpi:2, yushui:1 } } },
  { q:"朋友难过时，你通常？",
    a:{ t:"先给解决方案", s:{ biangbiang:2, roujiamo:1 } },
    b:{ t:"先陪着、先安慰", s:{ zenggao:2, liangpi:1 } } },
  { q:"出门旅行你更喜欢？",
    a:{ t:"攻略详尽、按计划走", s:{ paomo:2, biangbiang:1 } },
    b:{ t:"随走随停、走到哪算哪", s:{ yushui:2, liangpi:1 } } },
  { q:"面对网红店排队？",
    a:{ t:"值得就等，一定要吃到", s:{ paomo:2, zenggao:1 } },
    b:{ t:"换一家，不将就时间", s:{ liangpi:2, yushui:1 } } },
  { q:"你更偏爱哪种味道？",
    a:{ t:"浓郁扎实、有存在感", s:{ roujiamo:2, biangbiang:1 } },
    b:{ t:"清爽灵活、层次轻快", s:{ yushui:2, liangpi:1 } } }
];

const PERSONAS = {
  roujiamo: { name:"肉夹馍型", emoji:"🥙",
    desc:"你实在、可靠、外酥里暖。不花哨，但谁靠近都觉得踏实。你是朋友里那个“关键时刻一定在”的人。",
    food:"腊汁肉夹馍", city:"西安" },
  liangpi: { name:"凉皮型", emoji:"🍜",
    desc:"你清爽、灵活、社交轻盈。走到哪儿都能迅速适应，像一碗凉皮，酸辣自洽，谁都喜欢。",
    food:"西安凉皮", city:"西安" },
  paomo: { name:"羊肉泡馍型", emoji:"🍲",
    desc:"你慢热、温暖、重视仪式感。你愿意花时间把一件事掰碎、煮透，最后得到一碗踏实。",
    food:"羊肉泡馍", city:"西安" },
  biangbiang: { name:"biangbiang面型", emoji:"🌶️",
    desc:"你豪爽、有创意、气场全开。你不喜欢将就，做事像扯面一样，宽宽大大，一气呵成。",
    food:"biangbiang面", city:"西安" },
  zenggao: { name:"甑糕型", emoji:"🍯",
    desc:"你甜美、怀旧、心思细腻。你记得很多旧事，也愿意把温柔一层一层蒸进生活里。",
    food:"甑糕", city:"咸阳" },
  yushui: { name:"浆水鱼鱼型", emoji:"🐟",
    desc:"你清新、治愈、随性自在。你不争不抢，却总能在闷热的时候，给人一口凉快的舒服。",
    food:"浆水鱼鱼", city:"汉中" }
};