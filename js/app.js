/* きらきら☆おしゃれスタジオ — ゲームほんたい */
(function () {
  'use strict';
  const A = window.Art, U = window.U, S = window.Sound;
  const $ = (s, r) => (r || document).querySelector(s);
  const SVGNS = 'http://www.w3.org/2000/svg';
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const rnd = (n) => Math.floor(Math.random() * n);
  const pick = (a) => a[rnd(a.length)];
  const PHOTO_VB = [-30, 0, 660, 880];
  const STORE = 'kirakira-oshare-studio-v1';
  const ALBUM_MAX = 30;

  const G = {
    st: clone(A.DEFAULT), hist: [], mode: 'free', theme: null, tab: 'make', sub: 'skin',
    album: [], rewards: [], best: {}, opt: { se: true, bgm: true }, photo: null, busy: false,
  };

  /* ================= カタログ ================= */
  const TABS = [
    { id: 'make', n: 'メイク', icon: '💄', subs: ['skin', 'eye', 'lash', 'brow', 'shadow', 'cheek', 'lip', 'mouth', 'seal'] },
    { id: 'hair', n: 'ヘア', icon: '🎀', subs: ['hairBack', 'hairFront'] },
    { id: 'wear', n: 'ふく', icon: '👗', subs: ['dress', 'top', 'bottom', 'socks', 'shoes'] },
    { id: 'acc', n: 'アクセ', icon: '👑', subs: ['head', 'glasses', 'ear', 'neck', 'hand', 'back', 'pet'] },
    { id: 'bg', n: 'はいけい', icon: '🌈', subs: ['bg'] },
  ];
  const HB_TB = { long: [90, 70, 420, 520], bob: [130, 70, 340, 350], short: [130, 70, 340, 340], twin: [70, 70, 460, 500], pony: [110, 50, 400, 400],
    buns: [130, 50, 340, 350], wavy: [90, 70, 420, 540], braid: [110, 70, 380, 530], osage: [110, 70, 380, 470], side: [110, 70, 430, 500], hime: [70, 70, 460, 690] };
  const SCH = { list: A.SCHEMES, n: 'いろ', scheme: true };
  const SUBS = {
    skin: { n: 'はだ', key: 'skin', items: A.SKINS, kind: 'swatch', zoom: 'face', tool: 'puff', fx: [300, 262, 90], say: 'はだの いろを えらんでね' },
    eye: { n: 'め', key: 'eye', items: A.EYES, kind: 'face', tb: [208, 224, 84, 84], pal: { key: 'eyeColor', list: A.EYE_COLORS, n: 'めのいろ' }, zoom: 'face', fx: [300, 266, 80], say: 'どんな おめめに する？' },
    lash: { n: 'まつげ', key: 'lash', items: A.LASHES, kind: 'face', tb: [208, 224, 84, 84], zoom: 'face', tool: 'mascara', fx: [300, 252, 80], say: 'まつげで ぱっちり！' },
    brow: { n: 'まゆげ', key: 'brow', items: A.BROWS, kind: 'face', tb: [212, 188, 76, 76], zoom: 'face', tool: 'pencil', fx: [300, 222, 80], say: 'まゆげも かえられるよ' },
    shadow: { n: 'アイシャドウ', key: 'shadow', items: A.SHADOWS, kind: 'face', tb: [206, 218, 88, 88], pal: { key: 'shadowColor', list: A.SHADOW_COLORS, n: 'いろ', auto: 1 }, zoom: 'face', tool: 'tip', fx: [300, 244, 90], say: 'まぶたを キラキラに しよう！' },
    cheek: { n: 'チーク', key: 'cheek', items: A.CHEEKS, kind: 'face', tb: [192, 264, 80, 80], pal: { key: 'cheekColor', list: A.CHEEK_COLORS, n: 'いろ', auto: 1 }, zoom: 'face', tool: 'brush', fx: [300, 304, 100], say: 'ほっぺを ぽっと かわいく' },
    lip: { n: 'リップ', key: 'lip', items: A.LIPS, kind: 'lip', zoom: 'face', tool: 'lip', fx: [300, 320, 50], say: 'すきな いろの リップを ぬろう' },
    mouth: { n: 'くち', key: 'mouth', items: A.MOUTHS, kind: 'face', tb: [264, 288, 72, 72], zoom: 'face', fx: [300, 320, 50], say: 'おくちの かたちは どれに する？' },
    seal: { n: 'シール', key: 'seal', items: A.SEALS, kind: 'face', tb: [190, 216, 220, 150], zoom: 'face', fx: [300, 296, 110], say: 'かおに シールを はっちゃおう！' },
    hairBack: { n: 'かみがた', key: 'hairBack', items: A.HAIR_BACK, kind: 'hair', tbOf: (it) => HB_TB[it.id], pal: { key: 'hairColor', list: A.HAIR_COLORS, n: 'かみのいろ' }, zoom: 'hair', fx: [300, 200, 150], say: 'どんな かみがたに する？' },
    hairFront: { n: 'まえがみ', key: 'hairFront', items: A.HAIR_FRONT, kind: 'hair', tb: [150, 70, 300, 300], pal: { key: 'hairColor', list: A.HAIR_COLORS, n: 'かみのいろ' }, zoom: 'head', fx: [300, 170, 120], say: 'まえがみを えらぼう' },
    dress: { n: 'ワンピース', key: 'dress', items: A.DRESSES, kind: 'wear', pal: Object.assign({ key: 'dressC' }, SCH), zoom: 'full', fx: [300, 500, 150], say: 'すてきな ドレスが いっぱい！' },
    top: { n: 'トップス', key: 'top', items: A.TOPS, kind: 'wear', pal: Object.assign({ key: 'topC' }, SCH), zoom: 'full', fx: [300, 430, 110], say: 'うえに きる ふくを えらぼう' },
    bottom: { n: 'ボトムス', key: 'bottom', items: A.BOTTOMS, kind: 'wear', pal: Object.assign({ key: 'bottomC' }, SCH), zoom: 'full', fx: [300, 540, 120], say: 'スカート？ それとも ズボン？' },
    socks: { n: 'くつした', key: 'socks', items: A.SOCKS, kind: 'wear', pal: Object.assign({ key: 'socksC' }, SCH), zoom: 'legs', fx: [300, 680, 90], say: 'くつしたも おしゃれに！' },
    shoes: { n: 'くつ', key: 'shoes', items: A.SHOES, kind: 'wear', pal: Object.assign({ key: 'shoesC' }, SCH), zoom: 'legs', fx: [300, 755, 90], say: 'どの くつを はこうかな？' },
    head: { n: 'あたま', key: 'head', items: A.HEADS, kind: 'acc', pal: Object.assign({ key: 'headC' }, SCH), zoom: 'head', fx: [300, 110, 130], say: 'あたまに なにを つける？' },
    glasses: { n: 'めがね', key: 'glasses', items: A.GLASSES, kind: 'acc', zoom: 'face', fx: [300, 266, 100], say: 'めがねで へんしん！' },
    ear: { n: 'みみ', key: 'ear', items: A.EARS, kind: 'acc', zoom: 'face', fx: [300, 296, 130], say: 'イヤリングが キラリ！' },
    neck: { n: 'くび', key: 'neck', items: A.NECKS, kind: 'acc', zoom: 'neck', fx: [300, 388, 70], say: 'くびかざりを つけよう' },
    hand: { n: 'て', key: 'hand', items: A.HANDS, kind: 'acc', zoom: 'full', fx: [300, 500, 200], say: 'てに なにを もつ？' },
    back: { n: 'せなか', key: 'back', items: A.BACKS, kind: 'acc', zoom: 'full', fx: [300, 430, 220], say: 'せなかに はねを つけちゃう？' },
    pet: { n: 'おとも', key: 'pet', items: A.PETS, kind: 'acc', zoom: 'full', fx: [500, 720, 70], say: 'おともだちを つれて いこう！' },
    bg: { n: 'ばしょ', key: 'bg', items: A.BGS, kind: 'bg', zoom: 'full', say: 'どこに おでかけ する？' },
  };
  const THEMES = [
    { id: 'princess', n: 'おひめさま', icon: '👑', msg: 'おしろの パーティーに いくの！ おひめさまみたいに してね', hint: 'ドレスや ティアラが にあうよ' },
    { id: 'idol', n: 'アイドル', icon: '🎤', msg: 'きょうは ライブの ひ！ キラキラの アイドルに なりたいな', hint: 'マイクや ステージを さがしてみよう' },
    { id: 'fairy', n: 'ようせい', icon: '🧚', msg: 'おはなばたけで あそぶ ようせいさんに なりたい！', hint: 'はねや おはなが にあうよ' },
    { id: 'magic', n: 'まほうつかい', icon: '🔮', msg: 'まほうの がっこうに いくよ！ まほうつかいに してね', hint: 'ぼうしや ステッキを さがしてみよう' },
    { id: 'matsuri', n: 'おまつり', icon: '🏮', msg: 'なつまつりに いくの！ ゆかたで おしゃれ したいな', hint: 'ゆかたや うちわが にあうよ' },
    { id: 'beach', n: 'うみ', icon: '🏖️', msg: 'うみに あそびに いくよ！ なつの おしゃれを おねがい', hint: 'サンダルや ぼうしを さがしてみよう' },
    { id: 'cool', n: 'かっこいい', icon: '😎', msg: 'きょうは かっこよく きめたい きぶん！', hint: 'サングラスや ブーツが にあうよ' },
    { id: 'neko', n: 'ねこちゃん', icon: '🐱', msg: 'ねこちゃんに へんしん したいにゃ！', hint: 'ねこみみや おひげを さがしてにゃ' },
    { id: 'yume', n: 'ゆめかわ', icon: '🦄', msg: 'ふわふわ ゆめかわいい コーデに して ほしいな', hint: 'ユニコーンや リボンが にあうよ' },
    { id: 'winter', n: 'ゆきのひ', icon: '⛄', msg: 'ゆきの ひの おでかけ。 あったかく してね', hint: 'マフラーや ブーツで ぽかぽかに' },
    { id: 'ballet', n: 'バレリーナ', icon: '🩰', msg: 'バレエの はっぴょうかい！ バレリーナに してね', hint: 'チュチュや トウシューズが にあうよ' },
    { id: 'school', n: 'がっこう', icon: '🎒', msg: 'きょうは がっこうの ひ！ げんきな コーデに してね', hint: 'セーラーや スカートを さがしてみよう' },
    { id: 'casual', n: 'おでかけ', icon: '🎈', msg: 'おともだちと あそびに いくよ！ うごきやすい ふくが いいな', hint: 'Tシャツや スニーカーが にあうよ' },
  ];
  const PRAISE = ['かわいい！', 'すてき！', 'にあってる！', 'おしゃれ！', 'キラキラだね！', 'いいね！', 'さいこう！', 'わあ、きれい！'];
  const GIGGLE = ['えへへ', 'うふふ', 'ありがとう！', 'たのしいね！', 'だいすき！'];
  const tabOf = (id) => TABS.find((t) => t.id === id);
  const NOACC = { head: 0, glasses: 0, ear: 0, neck: 0, hand: 0, back: 0, pet: 0 };

  /* ================= ほぞん ================= */
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify({ st: G.st, album: G.album, rewards: G.rewards, best: G.best, opt: G.opt })); } catch (e) { /* ほぞんできなくても あそべる */ }
  }
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (!d) return;
      if (d.st) G.st = Object.assign(clone(A.DEFAULT), d.st);
      if (Array.isArray(d.album)) G.album = d.album;
      if (Array.isArray(d.rewards)) G.rewards = d.rewards;
      if (d.best) G.best = d.best;
      if (d.opt) G.opt = Object.assign(G.opt, d.opt);
    } catch (e) { /* こわれていたら さいしょから */ }
  }

  /* ================= 画面きりかえ ================= */
  function show(name) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('on', s.id === 'scr-' + name));
    G.screen = name;
    if (name === 'title') renderTitle();
    if (name === 'themes') renderThemes();
    if (name === 'album') renderAlbum();
    if (name === 'photo') { renderPhoto(); renderPhotoTools(); }
  }
  let toastT;
  function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 2200); }
  function modal(html, handlers) {
    const m = $('#modal');
    m.innerHTML = `<div class="dlg">${html}</div>`; m.classList.add('on');
    m.onclick = (e) => { const b = e.target.closest('[data-act]'); if (!b) return; S.play('tap'); const fn = handlers && handlers[b.dataset.act]; if (fn) fn(b); };
  }
  function closeModal() { const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; m.onclick = null; }
  function confetti(n) {
    const box = $('#confetti'), cols = ['#ff7fb2', '#ffd95a', '#8ed4ff', '#b392f5', '#8de8cc', '#ffffff'];
    for (let i = 0; i < n; i++) {
      const e = document.createElement('i');
      e.style.left = Math.random() * 100 + '%'; e.style.background = pick(cols);
      e.style.animationDuration = 1.6 + Math.random() * 1.6 + 's'; e.style.animationDelay = Math.random() * 0.5 + 's';
      e.style.transform = `rotate(${rnd(360)}deg)`; if (i % 3 === 0) e.style.borderRadius = '50%';
      box.appendChild(e); setTimeout(() => e.remove(), 3800);
    }
  }
  function flash() { const f = $('#flash'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }

  /* ================= タイトル ================= */
  function renderTitle() {
    $('#titleChara').innerHTML = A.svg(G.st, { vb: [40, 20, 520, 790], bg: false });
    syncOpts();
  }
  function makeFloaties() {
    const box = $('#floaties'), ch = ['♥', '★', '✦', '♪', '✿', '♥', '★'], cols = ['#ff9ec6', '#ffd95a', '#ffffff', '#b392f5', '#8ed4ff', '#ffb3d1'];
    let h = '';
    for (let i = 0; i < 26; i++) h += `<i style="left:${rnd(100)}%;font-size:${14 + rnd(34)}px;color:${cols[i % cols.length]};animation-duration:${9 + rnd(12)}s;animation-delay:-${rnd(20)}s">${ch[i % ch.length]}</i>`;
    box.innerHTML = h;
  }
  function syncOpts() {
    ['#optBgm', '#stBgm'].forEach((s) => $(s).classList.toggle('off', !G.opt.bgm));
    ['#optSe', '#stSe'].forEach((s) => $(s).classList.toggle('off', !G.opt.se));
  }
  function toggleBgm() { G.opt.bgm = !G.opt.bgm; S.setBgm(G.opt.bgm); syncOpts(); save(); }
  function toggleSe() { G.opt.se = !G.opt.se; S.setSe(G.opt.se); if (G.opt.se) S.play('tap'); syncOpts(); save(); }

  /* ================= スタジオ：えがく ================= */
  const svgWrap = (vb, inner, par) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" preserveAspectRatio="${par || 'xMidYMid meet'}">${inner}</svg>`;
  function renderChara() { $('#chara').innerHTML = A.character(G.st); }
  function renderBg() { $('#bgL').innerHTML = A.bg(G.st.bg | 0); }
  /* カメラ：みせたい はんい（キャラ座標の箱）を、ボタンに かくれない ところへ じどうで おさめる */
  const ZOOMS = { full: [60, 46, 560, 792], face: [168, 96, 432, 372], head: [140, 30, 460, 420], hair: [84, 50, 516, 650], neck: [185, 250, 415, 500], legs: [165, 540, 435, 800] };
  let zoomName = 'full';
  function setZoom(name) {
    zoomName = ZOOMS[name] ? name : 'full';
    const box = ZOOMS[zoomName], st = $('#stage').getBoundingClientRect();
    if (!st.width || !st.height) return;
    const k = Math.min(st.width / 600, st.height / 800), visW = st.width / k, visH = st.height / k;
    const bar = $('.stage-btns').getBoundingClientRect();
    const resB = bar.height ? (st.bottom - bar.top + 6) / k : 0, resT = 6 / k;
    const ax0 = 300 - visW / 2 + 6, ax1 = 300 + visW / 2 - 6, ay0 = 420 - visH / 2 + resT, ay1 = 420 + visH / 2 - resB;
    const s = Math.min((ax1 - ax0) / (box[2] - box[0]), (ay1 - ay0) / (box[3] - box[1]), 2.4);
    const tx = (ax0 + ax1) / 2 - ((box[0] + box[2]) / 2) * s, ty = (ay0 + ay1) / 2 - ((box[1] + box[3]) / 2) * s;
    $('#cam').style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(3)})`;
  }
  window.addEventListener('resize', () => { if (G.screen === 'studio') setZoom(zoomName); });

  function thumb(subId, i) {
    const sub = SUBS[subId], it = sub.items[i];
    if (it.n === 'なし') return '<span class="none-ic"></span>';
    const st = Object.assign({}, G.st, { [sub.key]: i });
    switch (sub.kind) {
      case 'swatch': return `<span class="sw" style="background:${it.c}"></span>`;
      case 'lip': return svgWrap([-26, -14, 52, 90], A.tool('lip', it.c, 0) + (it.glitter ? U.sparkle(12, -4, 7, '#ffe680') + U.sparkle(-13, 8, 4.5, '#ffe680') : ''));
      case 'face': return svgWrap(sub.tb, A.head(st) + A.face(st) + (subId === 'brow' ? A.brows(st) : ''));
      case 'hair': {
        const hb = A.hairBack(st, '#ff6fa5');
        return svgWrap(sub.tbOf ? sub.tbOf(it) : sub.tb, hb.back + A.mannequin() + hb.mid + A.head(st) + A.face(st) + A.hairFront(st) + A.brows(st) + hb.top);
      }
      case 'wear': {
        const r = it.draw(A.scheme(G.st[sub.pal.key] | 0));
        return svgWrap(it.tb, (typeof r === 'string' ? '' : r.back || '') + A.mannequin() + (typeof r === 'string' ? r : (r.main || '') + (r.over || '')));
      }
      case 'acc': {
        const ac = A.accParts(Object.assign({}, NOACC, { skin: G.st.skin, headC: G.st.headC, [sub.key]: i }));
        const base = sub.key === 'glasses' || sub.key === 'ear' ? A.head(G.st) + A.face(G.st) : sub.key === 'pet' ? '' : A.mannequin();
        return svgWrap(it.tb, ac.back + ac.headBack + base + ac.neck + ac.hand + ac.glasses + ac.ear + ac.head + ac.pet);
      }
      case 'bg': return svgWrap([0, 20, 600, 800], A.bg(i), 'xMidYMid slice');
    }
    return '';
  }
  const isOn = (subId, i) => {
    const sub = SUBS[subId];
    if (subId === 'top' || subId === 'bottom') return (G.st.dress | 0) === 0 && (G.st[sub.key] | 0) === i;
    return (G.st[sub.key] | 0) === i;
  };
  const isRec = (it) => G.mode === 'challenge' && G.theme && it.tags && it.tags.indexOf(G.theme.id) >= 0;

  function renderTabs() {
    $('#tabs').innerHTML = TABS.map((t) => `<button class="tab${t.id === G.tab ? ' on' : ''}" data-tab="${t.id}"><span class="ti">${t.icon}</span><span class="tn">${t.n}</span></button>`).join('');
  }
  function renderSubs() {
    const t = tabOf(G.tab);
    $('#subs').innerHTML = t.subs.map((id) => {
      const rec = G.mode === 'challenge' && SUBS[id].items.some(isRec);
      return `<button class="sub${id === G.sub ? ' on' : ''}" data-sub="${id}">${SUBS[id].n}${rec ? ' ✨' : ''}</button>`;
    }).join('');
    const on = $('#subs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  function renderItems(anim) {
    const sub = SUBS[G.sub], box = $('#items');
    box.innerHTML = sub.items.map((it, i) =>
      `<button class="item${isOn(G.sub, i) ? ' on' : ''}" data-i="${i}" style="${anim ? `animation-delay:${Math.min(i, 14) * 22}ms` : 'animation:none'}"><span class="th">${thumb(G.sub, i)}</span><span class="nm">${it.n}</span>${isRec(it) ? '<span class="rec">✨</span>' : ''}</button>`).join('');
    if (anim) box.scrollTop = 0;
  }
  function markItems() { document.querySelectorAll('#items .item').forEach((b) => b.classList.toggle('on', isOn(G.sub, +b.dataset.i))); }
  const chipBg = (c, scheme) => {
    if (scheme) return c.g ? `linear-gradient(135deg, ${c.g.join(',')})` : `linear-gradient(135deg, ${c.m} 0 60%, ${c.a} 60%)`;
    return c.g ? `linear-gradient(135deg, ${c.g.join(',')})` : c.c;
  };
  function renderPal() {
    const sub = SUBS[G.sub], box = $('#pal');
    if (!sub.pal) { box.classList.remove('on'); box.innerHTML = ''; return; }
    const cur = G.st[sub.pal.key] | 0;
    box.classList.add('on');
    box.classList.toggle('dim', G.sub === 'dress' && (G.st.dress | 0) === 0);
    box.innerHTML = `<span class="pl">${sub.pal.n}</span><div class="pc">` + sub.pal.list.map((c, i) => `<button class="chip${i === cur ? ' on' : ''}" data-c="${i}" style="background:${chipBg(c, sub.pal.scheme)}" aria-label="${c.n}"></button>`).join('') + '</div>';
    const on = $('#pal .on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function renderPanel(anim) { renderTabs(); renderSubs(); renderItems(anim); renderPal(); }
  function renderStudio() { renderBg(); $('#shadowL').innerHTML = A.floorShadow(); renderChara(); renderPanel(true); setZoom(SUBS[G.sub].zoom); }

  /* ================= えんしゅつ ================= */
  let bubT;
  function say(text, ms) {
    const b = $('#bubble'); b.textContent = text; b.classList.add('on');
    clearTimeout(bubT); if (ms !== 0) bubT = setTimeout(() => b.classList.remove('on'), ms || 3400);
  }
  function burst(x, y, spread, n, hearts) {
    const fx = $('#fx'), cols = ['#ffffff', '#fff3a8', '#ffe27a', '#ffd0e4'];
    for (let i = 0; i < n; i++) {
      const p = document.createElementNS(SVGNS, 'path'), r = 5 + Math.random() * 9, hrt = hearts || Math.random() < 0.22;
      p.setAttribute('d', hrt ? U.heartPath(0, 0, r * 0.75) : U.sparklePath(0, 0, r));
      p.setAttribute('fill', hrt ? pick(['#ff7fb2', '#ff9ec6', '#ff5c93']) : pick(cols));
      p.setAttribute('stroke', hrt ? '#fff' : '#ffc93c'); p.setAttribute('stroke-width', hrt ? '1.5' : '0.8');
      const a = Math.random() * Math.PI * 2, d = spread * (0.45 + Math.random() * 0.75);
      const x0 = x + (Math.random() - 0.5) * spread * 0.7, y0 = y + (Math.random() - 0.5) * spread * 0.5;
      const dx = Math.cos(a) * d, dy = Math.sin(a) * d - spread * 0.25, rot = (Math.random() - 0.5) * 240;
      fx.appendChild(p);
      const an = p.animate([
        { transform: `translate(${x0}px,${y0}px) scale(0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x0 + dx * 0.65}px,${y0 + dy * 0.65}px) scale(1.25) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${x0 + dx}px,${y0 + dy}px) scale(0) rotate(${rot}deg)`, opacity: 0 },
      ], { duration: 650 + Math.random() * 500, easing: 'ease-out', fill: 'forwards' });
      an.onfinish = () => p.remove();
    }
  }
  const TOOLP = {
    lip: [[282, 317], [300, 324], [318, 317]], brush: [[222, 310], [242, 298], [226, 304], [364, 310], [378, 298], [366, 304]],
    tip: [[226, 246], [270, 238], [330, 238], [374, 246]], mascara: [[224, 248], [264, 240], [336, 240], [376, 248]],
    pencil: [[228, 222], [270, 216], [330, 216], [372, 222]], puff: [[236, 236], [300, 306], [364, 240], [300, 190], [246, 290]],
  };
  function toolColor(sub) {
    const st = G.st;
    if (sub.key === 'lip') return (A.LIPS[st.lip] || {}).c || '#ffb3c8';
    if (sub.key === 'cheek') return (A.CHEEK_COLORS[st.cheekColor] || A.CHEEK_COLORS[0]).c;
    if (sub.key === 'shadow') { const c = A.SHADOW_COLORS[st.shadowColor] || A.SHADOW_COLORS[0]; return c.c || c.g[0]; }
    if (sub.key === 'skin') return U.light((A.SKINS[st.skin] || A.SKINS[1]).c, 0.3);
    if (sub.key === 'brow') return '#b5784a';
    return '#ff7fab';
  }
  function toolAnim(kind, color) {
    const pts = TOOLP[kind]; if (!pts) return;
    const g = document.createElementNS(SVGNS, 'g');
    g.innerHTML = A.tool(kind, color);
    $('#fx').appendChild(g);
    const tr = (p) => `translate(${p[0]}px,${p[1]}px)`, first = pts[0], last = pts[pts.length - 1];
    const kf = [{ transform: tr([first[0] + 46, first[1] + 60]), opacity: 0 }].concat(pts.map((p) => ({ transform: tr(p), opacity: 1 })), [{ transform: tr([last[0] + 46, last[1] + 60]), opacity: 0 }]);
    const an = g.animate(kf, { duration: 300 + pts.length * 130, easing: 'ease-in-out', fill: 'forwards' });
    an.onfinish = () => g.remove();
    S.play('swish');
  }
  function bounce() {
    $('#chara').animate([{ transform: 'scale(1,1)' }, { transform: 'scale(1.045,.955)' }, { transform: 'scale(.975,1.035)' }, { transform: 'scale(1,1)' }], { duration: 360, easing: 'ease-out' });
  }
  let praiseN = 0;
  function react(sub, isColor) {
    bounce();
    if (sub.fx) burst(sub.fx[0], sub.fx[1], sub.fx[2] || 80, isColor ? 6 : 10);
    if (sub.tool) toolAnim(sub.tool, toolColor(sub));
    if (++praiseN % 4 === 0) say(pick(PRAISE), 1600);
  }
  function blinkLoop() {
    setTimeout(() => {
      const e = $('#chara .eyes');
      if (e && G.screen === 'studio') { e.classList.add('blink'); setTimeout(() => e.classList.remove('blink'), 130); }
      blinkLoop();
    }, 2200 + Math.random() * 3200);
  }

  /* ================= そうさ ================= */
  function pushHist() { G.hist.push(JSON.stringify(G.st)); if (G.hist.length > 40) G.hist.shift(); }
  function change(patch, sub, isColor) {
    pushHist();
    Object.assign(G.st, patch);
    renderChara();
    if (patch.bg != null) { renderBg(); flashBg(); }
    if (isColor) { renderItems(false); renderPal(); } else { markItems(); renderPal(); }
    save();
    S.play(isColor ? 'color' : 'pick');
    react(sub, isColor);
  }
  function flashBg() { $('#bgL').animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' }); burst(300, 420, 320, 14); }
  function chooseItem(i) {
    const sub = SUBS[G.sub], patch = { [sub.key]: i };
    if (G.sub === 'top' || G.sub === 'bottom') patch.dress = 0;
    change(patch, sub, false);
  }
  function chooseColor(i) {
    const sub = SUBS[G.sub], patch = { [sub.pal.key]: i };
    if (sub.pal.auto && !(G.st[sub.key] | 0)) patch[sub.key] = 1;
    change(patch, sub, true);
  }
  function setTab(id) {
    if (G.tab === id) return;
    G.tab = id; G.sub = tabOf(id).subs[0];
    S.play('tab'); renderPanel(true); setZoom(SUBS[G.sub].zoom); say(SUBS[G.sub].say);
  }
  function setSub(id) {
    if (G.sub === id) return;
    G.sub = id; S.play('tap'); renderSubs(); renderItems(true); renderPal(); setZoom(SUBS[id].zoom); say(SUBS[id].say);
  }
  function undo() {
    if (!G.hist.length) { say('もどせるのは ここまでだよ', 1800); S.play('tap'); return; }
    G.st = JSON.parse(G.hist.pop()); S.play('undo');
    renderBg(); renderChara(); renderItems(false); renderPal(); save();
  }
  function reset() {
    modal(`<div class="ic">🧹</div><h3>さいしょから やりなおす？</h3><p>いまの コーデが きえちゃうよ</p><div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="yes">やりなおす</button></div>`, {
      no: closeModal,
      yes: () => { closeModal(); pushHist(); G.st = Object.assign(clone(A.DEFAULT), { skin: G.st.skin }); renderBg(); renderChara(); renderItems(false); renderPal(); save(); burst(300, 420, 260, 16); },
    });
  }

  /* ---------- おまかせ ---------- */
  function randomState(themeId) {
    const st = clone(G.st);
    const rp = (list, from, pNone) => {
      if (pNone && Math.random() < pNone) return 0;
      const idx = []; for (let i = from; i < list.length; i++) idx.push(i);
      if (themeId && Math.random() < 0.75) { const m = idx.filter((i) => list[i].tags && list[i].tags.indexOf(themeId) >= 0); if (m.length) return pick(m); }
      return pick(idx);
    };
    const nS = A.SCHEMES.length;
    st.eye = Math.random() < 0.75 ? rnd(4) : 4 + rnd(2); st.eyeColor = rnd(A.EYE_COLORS.length); st.lash = 1 + rnd(3); st.brow = Math.random() < 0.6 ? 0 : rnd(4);
    st.shadow = Math.random() < 0.5 ? 0 : 1 + rnd(4); st.shadowColor = rnd(A.SHADOW_COLORS.length);
    st.cheek = Math.random() < 0.15 ? 0 : 1 + rnd(6); st.cheekColor = rnd(A.CHEEK_COLORS.length);
    st.lip = Math.random() < 0.25 ? 0 : 1 + rnd(A.LIPS.length - 1); st.mouth = Math.random() < 0.6 ? rnd(2) : rnd(5);
    st.seal = rp(A.SEALS, 1, 0.65);
    st.hairBack = rnd(A.HAIR_BACK.length); st.hairFront = rnd(A.HAIR_FRONT.length); st.hairColor = rnd(A.HAIR_COLORS.length);
    const wantDress = themeId ? (A.DRESSES.some((d) => d.tags && d.tags.indexOf(themeId) >= 0) ? Math.random() < 0.75 : false) : Math.random() < 0.62;
    st.dress = wantDress ? rp(A.DRESSES, 1) : 0; st.dressC = rnd(nS);
    st.top = rp(A.TOPS, 0); st.topC = rnd(nS); st.bottom = rp(A.BOTTOMS, 0); st.bottomC = rnd(nS);
    st.socks = rp(A.SOCKS, 1, 0.3); st.socksC = Math.random() < 0.5 ? 6 : rnd(nS);
    st.shoes = rp(A.SHOES, 1, 0.04); st.shoesC = rnd(nS);
    st.head = rp(A.HEADS, 1, 0.35); st.headC = Math.random() < 0.5 ? st.dressC : rnd(nS);
    st.glasses = rp(A.GLASSES, 1, 0.85); st.ear = rp(A.EARS, 1, 0.5); st.neck = rp(A.NECKS, 1, 0.5);
    st.hand = rp(A.HANDS, 1, 0.5); st.back = rp(A.BACKS, 1, 0.7); st.pet = rp(A.PETS, 1, 0.5);
    st.bg = rp(A.BGS, 0);
    return st;
  }
  function shuffle() {
    if (G.busy) return; G.busy = true;
    pushHist(); setZoom('full');
    let k = 0;
    const tm = setInterval(() => {
      G.st = randomState(G.mode === 'challenge' && G.theme ? G.theme.id : null);
      renderChara(); renderBg(); S.play('tick');
      if (++k >= 8) {
        clearInterval(tm); G.busy = false;
        renderItems(false); renderPal(); save(); S.play('fanfare'); bounce(); burst(300, 420, 300, 26); say('じゃーん！ ' + pick(PRAISE), 2200);
        setTimeout(() => setZoom(SUBS[G.sub].zoom), 1300);
      }
    }, 100);
  }

  /* ================= おだいチャレンジ ================= */
  function score(st, id) {
    const has = (it) => !!(it && it.tags && it.tags.indexOf(id) >= 0), any = (list) => list.some(has);
    let n = 0, max = 0;
    if (any(A.DRESSES) || any(A.TOPS) || any(A.BOTTOMS)) {
      max += 2;
      if ((st.dress | 0) > 0) { if (has(A.DRESSES[st.dress])) n += 2; } else n += (has(A.TOPS[st.top | 0]) ? 1 : 0) + (has(A.BOTTOMS[st.bottom | 0]) ? 1 : 0);
    }
    [['socks', A.SOCKS], ['shoes', A.SHOES], ['head', A.HEADS], ['glasses', A.GLASSES], ['ear', A.EARS], ['neck', A.NECKS], ['hand', A.HANDS], ['back', A.BACKS], ['pet', A.PETS], ['bg', A.BGS], ['seal', A.SEALS]]
      .forEach((p) => { if (any(p[1])) { max++; if (has(p[1][st[p[0]] | 0])) n++; } });
    return { n, max };
  }
  const starStr = (n) => '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i>';
  function renderThemes() {
    const cleared = THEMES.filter((t) => G.best[t.id]).length;
    $('#themeCount').textContent = `${cleared} / ${THEMES.length}`;
    $('#themeGrid').innerHTML = THEMES.map((t, i) => {
      const b = G.best[t.id] | 0;
      return `<button class="theme-card${b ? ' clear' : ''}" data-theme="${t.id}" style="animation-delay:${i * 35}ms"><span class="ic">${t.icon}</span><span class="nm">${t.n}</span>` +
        (b ? `<span class="st">${starStr(b)}</span>` : '<span class="st"><span class="new">あたらしい</span></span>') + '</button>';
    }).join('');
  }
  function introTheme(id) {
    const t = THEMES.find((x) => x.id === id); if (!t) return;
    S.play('open');
    modal(`<div class="ic">${t.icon}</div><h3>おだい：${t.n}</h3><div class="msc">${A.mascot('happy')}</div><p class="say">${t.msg}</p><p style="font-size:.85em;color:#a8799a">✨の マークが ヒントだよ</p>` +
      `<div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="go">スタート！</button></div>`, {
      no: closeModal, go: () => { closeModal(); enterStudio('challenge', t); },
    });
  }
  function finishChallenge() {
    const t = G.theme, sc = score(G.st, t.id), ratio = sc.max ? sc.n / sc.max : 0;
    const stars = ratio >= 0.6 ? 5 : ratio >= 0.3 ? 4 : 3;
    const first = G.rewards.indexOf(t.id) < 0;
    if (stars > (G.best[t.id] | 0)) G.best[t.id] = stars;
    if (first) G.rewards.push(t.id);
    save(); setZoom('full');
    const msg = stars === 5 ? 'パーフェクト！ さいこうに すてき！' : stars === 4 ? 'とっても すてき！ にあってるよ！' : 'かわいい！ いい かんじ！';
    const rw = A.STAMPS.find((s) => s.reward === t.id);
    let h = `<h3>${t.icon} できたね！</h3><div class="res-chara">${A.svg(G.st, { vb: [40, 20, 520, 790] })}</div>`;
    h += `<div class="stars">${'<span>★</span>'.repeat(5)}</div><p class="say">${msg}</p>`;
    if (stars < 5) h += `<p style="font-size:.85em;color:#a8799a">ヒント：${t.hint}</p>`;
    if (first && rw) h += `<div class="reward">${A.stampSvg(rw.id)}<span>あたらしい スタンプ<br>「${rw.n}」を ゲット！</span></div>`;
    h += `<div class="row"><button class="mid-btn gray" data-act="more">もうすこし なおす</button><button class="mid-btn pink" data-act="photo">📷 しゃしんを とる</button><button class="mid-btn purple" data-act="next">べつの おだい</button></div>`;
    modal(h, {
      more: closeModal,
      photo: () => { closeModal(); takePhoto(); },
      next: () => { closeModal(); show('themes'); },
    });
    const sp = document.querySelectorAll('#modal .stars span');
    for (let i = 0; i < stars; i++) setTimeout(() => { if (sp[i] && sp[i].isConnected) { sp[i].classList.add('on'); S.play('star', i); } }, 450 + i * 300);
    setTimeout(() => { if ($('#modal').classList.contains('on')) { S.play('fanfare'); confetti(stars * 14); } }, 450 + stars * 300 + 150);
  }

  function enterStudio(mode, theme) {
    G.mode = mode; G.theme = theme || null; G.hist = [];
    $('#scr-studio').classList.toggle('challenge', mode === 'challenge');
    const bn = $('#themeBanner');
    if (mode === 'challenge') { bn.innerHTML = `おだい <b>${theme.icon} ${theme.n}</b>`; bn.classList.add('on'); G.tab = 'wear'; G.sub = 'dress'; }
    else bn.classList.remove('on');
    show('studio'); renderStudio();
    $('#mascot').innerHTML = A.mascot();
    setTimeout(() => say(mode === 'challenge' ? theme.msg : 'すきな ものを えらんで、かわいく へんしん させてね！', mode === 'challenge' ? 6000 : 4200), 400);
  }

  /* ================= しゃしん ================= */
  function takePhoto() {
    if (G.busy) return; G.busy = true;
    setZoom('full'); say('はい、チーズ！', 1500); S.play('pop');
    setTimeout(() => {
      flash(); S.play('shutter'); bounce();
      setTimeout(() => {
        G.busy = false;
        G.photo = { id: Date.now(), state: clone(G.st), frame: 1, stamps: [], sel: 'heart' };
        show('photo');
      }, 420);
    }, 750);
  }
  function renderPhoto() {
    const p = G.photo; if (!p) return;
    $('#photoCard').innerHTML = A.svg(p.state, { vb: PHOTO_VB, frame: p.frame, stamps: p.stamps });
  }
  const stampLocked = (s) => s.reward && G.rewards.indexOf(s.reward) < 0;
  function renderPhotoTools() {
    const p = G.photo; if (!p) return;
    $('#frameRow').innerHTML = A.FRAMES.map((f, i) => `<button class="fr${i === p.frame ? ' on' : ''}" data-f="${i}" aria-label="${f.n}">` +
      svgWrap(PHOTO_VB, `<rect x="-30" y="0" width="660" height="880" fill="#fff3f8"/>` + (i ? A.frame(i, PHOTO_VB) : `<text x="300" y="470" text-anchor="middle" font-size="150" fill="#d9bfd0">なし</text>`)) + '</button>').join('');
    $('#stampGrid').innerHTML = A.STAMPS.map((s) => `<button class="stp${s.id === p.sel ? ' on' : ''}${stampLocked(s) ? ' lock' : ''}" data-s="${s.id}" aria-label="${s.n}">${A.stampSvg(s.id)}</button>`).join('');
  }
  function addStamp(e) {
    const p = G.photo, svg = $('#photoCard svg'); if (!p || !svg) return;
    const r = svg.getBoundingClientRect();
    const x = PHOTO_VB[0] + ((e.clientX - r.left) / r.width) * PHOTO_VB[2], y = PHOTO_VB[1] + ((e.clientY - r.top) / r.height) * PHOTO_VB[3];
    if (p.stamps.length >= 60) { toast('スタンプが いっぱいだよ'); return; }
    p.stamps.push({ id: p.sel, x: Math.round(x), y: Math.round(y), s: +(1.05 + Math.random() * 0.45).toFixed(2), r: Math.round((Math.random() - 0.5) * 36) });
    p.dirty = true; renderPhoto(); S.play('stamp');
  }
  function saveAlbum() {
    const p = G.photo, rec = { id: p.id, state: p.state, frame: p.frame, stamps: p.stamps };
    const i = G.album.findIndex((a) => a.id === p.id);
    if (i >= 0) G.album[i] = rec;
    else {
      if (G.album.length >= ALBUM_MAX) { toast('アルバムが いっぱい！ ふるい しゃしんを けしてね'); return; }
      G.album.unshift(rec);
    }
    save(); S.play('save'); confetti(36); toast('アルバムに いれたよ！');
  }
  function savePng(ph) {
    const svg = A.svg(ph.state, { vb: PHOTO_VB, frame: ph.frame, stamps: ph.stamps, w: 990 });
    const img = new Image();
    img.onload = () => {
      try {
        const cv = document.createElement('canvas'); cv.width = 990; cv.height = 1320;
        cv.getContext('2d').drawImage(img, 0, 0, 990, 1320);
        cv.toBlob((b) => {
          if (!b) { toast('ほぞん できなかったよ'); return; }
          const d = new Date(), z = (n) => String(n).padStart(2, '0');
          const a = document.createElement('a');
          a.href = URL.createObjectURL(b); a.download = `oshare_${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}_${z(d.getHours())}${z(d.getMinutes())}${z(d.getSeconds())}.png`;
          document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
          S.play('save'); toast('がぞうを ほぞんしたよ！');
        }, 'image/png');
      } catch (err) { toast('ほぞん できなかったよ'); }
    };
    img.onerror = () => toast('ほぞん できなかったよ');
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /* ================= アルバム ================= */
  function renderAlbum() {
    $('#albumCount').textContent = `${G.album.length} まい`;
    const box = $('#albumGrid');
    if (!G.album.length) { box.innerHTML = `<div class="empty"><span class="big">📷</span>まだ しゃしんが ないよ。<br>コーデが できたら しゃしんを とってね！</div>`; return; }
    box.innerHTML = G.album.map((p, i) => `<button class="album-card" data-p="${p.id}" style="animation-delay:${Math.min(i, 12) * 40}ms">${A.svg(p.state, { vb: PHOTO_VB, frame: p.frame, stamps: p.stamps })}</button>`).join('');
  }
  function viewPhoto(id) {
    const p = G.album.find((a) => String(a.id) === String(id)); if (!p) return;
    S.play('open');
    modal(`<div class="view-photo">${A.svg(p.state, { vb: PHOTO_VB, frame: p.frame, stamps: p.stamps })}</div>` +
      `<div class="row"><button class="mid-btn pink" data-act="wear">👗 この コーデで あそぶ</button><button class="mid-btn mint" data-act="png">💾 がぞうを ほぞん</button></div>` +
      `<div class="row"><button class="mid-btn gray" data-act="del">🗑️ けす</button><button class="mid-btn purple" data-act="close">とじる</button></div>`, {
      close: closeModal,
      wear: () => { closeModal(); G.st = Object.assign(clone(A.DEFAULT), clone(p.state)); save(); enterStudio('free'); },
      png: () => savePng(p),
      del: () => modal(`<div class="ic">🗑️</div><h3>この しゃしんを けす？</h3><p>けすと もとに もどせないよ</p><div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="yes">けす</button></div>`, {
        no: () => viewPhoto(id),
        yes: () => { G.album = G.album.filter((a) => a.id !== p.id); save(); closeModal(); renderAlbum(); S.play('undo'); },
      }),
    });
  }

  /* ================= イベント ================= */
  function bind() {
    document.addEventListener('pointerdown', () => S.unlock(), { once: true });
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    $('#btnFree').onclick = () => { S.play('open'); enterStudio('free'); };
    $('#btnChallenge').onclick = () => { S.play('open'); show('themes'); };
    $('#btnAlbum').onclick = () => { S.play('open'); show('album'); };
    $('#optBgm').onclick = $('#stBgm').onclick = toggleBgm;
    $('#optSe').onclick = $('#stSe').onclick = toggleSe;
    document.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => { S.play('tap'); show(b.dataset.go); }; });

    $('#btnHome').onclick = () => { S.play('tap'); save(); show('title'); };
    $('#tabs').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (b) setTab(b.dataset.tab); };
    $('#subs').onclick = (e) => { const b = e.target.closest('[data-sub]'); if (b) setSub(b.dataset.sub); };
    $('#items').onclick = (e) => { const b = e.target.closest('[data-i]'); if (b) chooseItem(+b.dataset.i); };
    $('#pal').onclick = (e) => { const b = e.target.closest('[data-c]'); if (b) chooseColor(+b.dataset.c); };
    $('#btnRandom').onclick = shuffle;
    $('#btnUndo').onclick = undo;
    $('#btnReset').onclick = () => { S.play('tap'); reset(); };
    $('#btnPhoto').onclick = takePhoto;
    $('#btnDone').onclick = () => { S.play('open'); finishChallenge(); };
    $('#themeBanner').onclick = () => { if (G.theme) say(G.theme.msg, 5000); };
    $('#mascot').onclick = () => {
      S.play('giggle');
      $('#mascot').innerHTML = A.mascot('happy'); setTimeout(() => { $('#mascot').innerHTML = A.mascot(); }, 1400);
      say(G.mode === 'challenge' && G.theme ? 'ヒント：' + G.theme.hint : pick(['いろんな いろを ためしてみてね！', '🎲 おまかせも おもしろいよ！', 'できたら 📷 しゃしんを とろう！', SUBS[G.sub].say]), 3600);
    };
    $('#chara').addEventListener('click', () => {
      S.play('giggle'); burst(300, 250, 150, 10, true); say(pick(GIGGLE), 1500);
      $('#chara').animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-26px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(0)' }], { duration: 520, easing: 'ease-out' });
    });

    $('#themeGrid').onclick = (e) => { const b = e.target.closest('[data-theme]'); if (b) introTheme(b.dataset.theme); };
    $('#albumGrid').onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) viewPhoto(b.dataset.p); };

    $('#photoCard').addEventListener('click', addStamp);
    $('#frameRow').onclick = (e) => { const b = e.target.closest('[data-f]'); if (!b) return; G.photo.frame = +b.dataset.f; S.play('color'); renderPhoto(); renderPhotoTools(); };
    $('#stampGrid').onclick = (e) => {
      const b = e.target.closest('[data-s]'); if (!b) return;
      const s = A.stampIndex[b.dataset.s];
      if (stampLocked(s)) { S.play('tap'); const t = THEMES.find((x) => x.id === s.reward); toast(`おだい「${t ? t.n : ''}」で もらえるよ！`); return; }
      G.photo.sel = s.id; S.play('tap');
      document.querySelectorAll('#stampGrid .stp').forEach((x) => x.classList.toggle('on', x.dataset.s === s.id));
    };
    $('#btnStampUndo').onclick = () => { if (G.photo.stamps.length) { G.photo.stamps.pop(); S.play('undo'); renderPhoto(); } else S.play('tap'); };
    $('#btnSaveAlbum').onclick = saveAlbum;
    $('#btnSavePng').onclick = () => savePng(G.photo);
    $('#btnPhotoBack').onclick = () => { S.play('tap'); show('studio'); setZoom(SUBS[G.sub].zoom); };
  }

  /* ================= はじまり ================= */
  load();
  S.on.bgm = G.opt.bgm; S.on.se = G.opt.se;
  makeFloaties();
  bind();
  blinkLoop();
  show('title');
})();
