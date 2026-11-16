/* きらきら☆おしゃれスタジオ — おへやづくり（ハウジング） */
(function (g) {
  'use strict';
  const A = g.Art, U = g.U, SVGNS = 'http://www.w3.org/2000/svg';
  const FLY = A.ROOM.FLY, RW = A.ROOM.W, RH = A.ROOM.H, MAXI = 70, ROOMS = 3;

  const TABS = [
    { id: 'room', n: 'おへや', icon: '🏠', subs: ['wall', 'floor', 'time'] },
    { id: 'kagu', n: 'かぐ', icon: '🛏️', subs: ['bed', 'table', 'shelf'] },
    { id: 'deco', n: 'かざり', icon: '🖼️', subs: ['wallitem', 'rug', 'light', 'plant'] },
    { id: 'toy', n: 'おもちゃ', icon: '🧸', subs: ['toy', 'goods', 'food'] },
    { id: 'nakama', n: 'なかま', icon: '👫', subs: ['chara', 'pet'] },
  ];
  const SUBS = {
    wall: { n: 'かべがみ', say: 'かべの もようを えらんでね' }, floor: { n: 'ゆか', say: 'ゆかは どれに する？' }, time: { n: 'じかん', say: 'よるに すると あかりが ひかるよ！' },
    bed: { n: 'ベッド・ソファ', say: 'ふかふかの ベッドを おこう' }, table: { n: 'つくえ・いす', say: 'テーブルの うえに ものを のせられるよ' }, shelf: { n: 'たな・でんか', say: 'テレビは タッチで つくよ！' },
    wallitem: { n: 'かべかざり', say: 'かべに かざりを つけよう' }, rug: { n: 'ラグ', say: 'ゆかに ラグを しこう' }, light: { n: 'あかり', say: 'あかりは タッチで つけたり けしたり' }, plant: { n: 'しょくぶつ', say: 'みどりを おくと すてきだよ' },
    toy: { n: 'おもちゃ', say: 'おもちゃで あそぼう！' }, goods: { n: 'ざっか', say: 'こものを かざろう' }, food: { n: 'たべもの', say: 'おやつの じかんだよ！' },
    chara: { n: 'キャラ', say: 'おへやに よんで あげよう' }, pet: { n: 'おとも', say: 'おともだちも いっしょに くらそう' },
  };
  const tabOf = (id) => TABS.find((t) => t.id === id);
  const clampI = (v, n) => Math.max(0, Math.min(n - 1, v | 0));
  const shuffleArr = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  g.House = { init: function (api) {
    const G = api.G, S = api.S, $ = api.$, clone = api.clone, rnd = api.rnd, pick = api.pick;
    const HS = { tab: 'kagu', sub: 'bed', sel: -1, hist: [], drag: null };

    /* ---------- データ ---------- */
    function ensure() {
      let h = G.house;
      if (!h || !Array.isArray(h.rooms)) h = G.house = A.houseDefault();
      const def = A.houseDefault();
      for (let i = 0; i < ROOMS; i++) {
        const r = h.rooms[i] && typeof h.rooms[i] === 'object' ? h.rooms[i] : (h.rooms[i] = def.rooms[i]);
        r.wall = clampI(r.wall, A.H_WALLS.length); r.floor = clampI(r.floor, A.H_FLOORS.length); r.time = clampI(r.time, 3);
        r.items = (Array.isArray(r.items) ? r.items : []).filter((it) => it && A.hItem[it.k] && isFinite(it.x) && isFinite(it.y)).slice(0, MAXI);
      }
      h.rooms.length = ROOMS; h.cur = clampI(h.cur, ROOMS);
    }
    const room = () => G.house.rooms[G.house.cur];
    const env = () => ({ sts: [api.stOf(0), api.stOf(1)], live: !api.CALM, time: room().time | 0 });
    const cur = () => (HS.sel >= 0 ? room().items[HS.sel] : null);
    const pushHist = (snap) => { HS.hist.push(snap || JSON.stringify(room())); if (HS.hist.length > 30) HS.hist.shift(); };
    function clampPos(it) {
      const d = A.hItem[it.k], s = it.s || 1;
      let y0 = 60, y1 = RH + 10;
      if (d.layer === 'wall') { y0 = 50; y1 = FLY + 30; } else if (d.layer === 'rug') { y0 = FLY + d.h * s * 0.75; y1 = RH + 40; } else if (d.layer === 'floor' && !d.small) { y0 = FLY - 6; }
      it.x = Math.round(Math.max(10, Math.min(RW - 10, it.x))); it.y = Math.round(Math.max(y0, Math.min(y1, it.y)));
    }

    /* ---------- えがく ---------- */
    const svg = $('#houseSvg'), root = $('#scr-house');
    const itemEl = (i) => svg.querySelector(`#hItems > [data-i="${i}"]`);
    function renderItems() {
      const r = room(), e = env();
      $('#hItems').innerHTML = A.hOrder(r.items).map((i) => A.hItemG(r.items[i], e, `class="hi" data-i="${i}"`)).join('');
      renderLight(); renderSel();
    }
    function renderLight() { $('#hLight').innerHTML = A.roomLight(room()); }
    function renderRoom() { $('#hBg').innerHTML = A.roomBg(room()); renderItems(); }
    function selBox() {
      const it = cur(); if (!it) return '';
      const d = A.hItem[it.k], s = it.s || 1, w = d.w * s + 18, h = d.h * s + 18, a = `x="${it.x - w / 2}" y="${it.y - h + 9}" width="${w}" height="${h}" rx="20" fill="none"`;
      return `<rect ${a} stroke="#fff" stroke-width="8" opacity=".9"/><rect ${a} stroke="#ff5c9c" stroke-width="3.5" stroke-dasharray="12 9" stroke-linecap="round" class="march"/>`;
    }
    function renderSel() {
      const it = cur();
      $('#hSel').innerHTML = selBox();
      root.classList.toggle('has-sel', !!it);
      root.classList.toggle('sel-chara', !!(it && A.hItem[it.k].chara != null));
      renderPal(); markList();
    }
    function renderRoomTabs() { $('#roomTabs').innerHTML = [0, 1, 2].map((i) => `<button class="room-tab${i === G.house.cur ? ' on' : ''}" data-r="${i}" aria-label="おへや ${i + 1}">${i + 1}</button>`).join(''); }

    /* ---------- パネル ---------- */
    const svgWrap = (vb, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
    function listOf(sub) {
      const r = room();
      if (sub === 'wall') return A.H_WALLS.map((w, i) => ({ key: 'w' + i, n: w.n, on: r.wall === i, th: svgWrap('250 300 500 440', A.roomBg({ wall: i, floor: r.floor })) }));
      if (sub === 'floor') return A.H_FLOORS.map((w, i) => ({ key: 'f' + i, n: w.n, on: r.floor === i, th: svgWrap('250 430 500 330', A.roomBg({ wall: r.wall, floor: i })) }));
      if (sub === 'time') return A.H_TIMES.map((t, i) => ({ key: 't' + i, n: t.n, on: (r.time | 0) === i, th: `<span style="font-size:clamp(34px,6vmin,52px);line-height:1">${t.icon}</span>` }));
      const e = env();
      return A.H_ITEMS.filter((d) => d.sub === sub).map((d) => ({ key: 'i' + d.id, n: d.n, on: d.chara != null && r.items.some((it) => it.k === d.id), th: A.hThumb(d, e) }));
    }
    function renderTabs() { $('#hTabs').innerHTML = TABS.map((t) => `<button class="tab${t.id === HS.tab ? ' on' : ''}" data-tab="${t.id}"><span class="ti">${t.icon}</span><span class="tn">${t.n}</span></button>`).join(''); }
    function renderSubs() { $('#hSubs').innerHTML = tabOf(HS.tab).subs.map((id) => `<button class="sub${id === HS.sub ? ' on' : ''}" data-sub="${id}">${SUBS[id].n}</button>`).join(''); }
    function renderList(anim) {
      const box = $('#hList');
      box.innerHTML = listOf(HS.sub).map((it, i) => `<button class="item${it.on ? ' on' : ''}" data-k="${it.key}" style="${anim ? `animation-delay:${Math.min(i, 14) * 22}ms` : 'animation:none'}"><span class="th">${it.th}</span><span class="nm">${it.n}</span></button>`).join('');
      if (anim) box.scrollTop = 0;
    }
    function markList() {
      if (HS.sub !== 'chara') return;
      const r = room();
      document.querySelectorAll('#hList .item').forEach((b) => b.classList.toggle('on', r.items.some((it) => 'i' + it.k === b.dataset.k)));
    }
    function renderPal() {
      const box = $('#hPal'), it = cur(), d = it && A.hItem[it.k];
      if (!d || d.rc === false) { box.classList.remove('on'); box.innerHTML = ''; return; }
      const now = it.c == null ? d.dc | 0 : it.c;
      box.classList.add('on');
      box.innerHTML = '<span class="pl">いろ</span><div class="pc">' + A.H_SCHEMES.map((c, i) => `<button class="chip${i === now ? ' on' : ''}" data-c="${i}" style="background:${api.chipBg(c, true)}" aria-label="${c.n}"></button>`).join('') + '</div>';
    }
    function renderPanel(anim) { renderTabs(); renderSubs(); renderList(anim); renderPal(); }

    /* ---------- えんしゅつ ---------- */
    let bubT;
    function say(text, ms) { const b = $('#hBubble'); b.textContent = text; b.classList.add('on'); clearTimeout(bubT); if (ms !== 0) bubT = setTimeout(() => b.classList.remove('on'), ms || 3400); }
    function burst(x, y, spread, n, hearts) {
      const fx = $('#hFx');
      for (let i = 0; i < n; i++) {
        const p = document.createElementNS(SVGNS, 'path'), r = 7 + Math.random() * 12, hrt = hearts || Math.random() < 0.2;
        p.setAttribute('d', hrt ? U.heartPath(0, 0, r * 0.75) : U.sparklePath(0, 0, r));
        p.setAttribute('fill', hrt ? pick(['#ff7fb2', '#ff9ec6', '#ff5c93']) : pick(['#ffffff', '#fff3a8', '#ffe27a', '#ffd0e4']));
        p.setAttribute('stroke', hrt ? '#fff' : '#ffc93c'); p.setAttribute('stroke-width', hrt ? '1.6' : '0.9');
        const a = Math.random() * Math.PI * 2, d = spread * (0.4 + Math.random() * 0.8), dx = Math.cos(a) * d, dy = Math.sin(a) * d - spread * 0.3, rot = (Math.random() - 0.5) * 240;
        fx.appendChild(p);
        const an = p.animate([{ transform: `translate(${x}px,${y}px) scale(0)`, opacity: 1 }, { transform: `translate(${x + dx * 0.65}px,${y + dy * 0.65}px) scale(1.25) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.4 },
          { transform: `translate(${x + dx}px,${y + dy}px) scale(0) rotate(${rot}deg)`, opacity: 0 }], { duration: 650 + Math.random() * 500, easing: 'ease-out', fill: 'forwards' });
        an.onfinish = () => p.remove();
      }
    }
    function boing(i, kind) {
      const el = itemEl(i), b = el && el.querySelector('.hi-b'); if (!b) return;
      const kf = kind === 'in' ? [{ transform: 'scale(0)' }, { transform: 'scale(1.14)', offset: 0.6 }, { transform: 'scale(1)' }]
        : kind === 'jump' ? [{ transform: 'translateY(0)' }, { transform: 'translateY(-34px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-12px)' }, { transform: 'translateY(0)' }]
          : [{ transform: 'scale(1,1)' }, { transform: 'scale(1.08,.9)' }, { transform: 'translateY(-12px) scale(.95,1.07)' }, { transform: 'scale(1,1)' }];
      b.animate(kf, { duration: kind === 'jump' ? 520 : 380, easing: 'ease-out' });
    }
    const mid = (it) => { const d = A.hItem[it.k]; return [it.x, it.y - d.h * (it.s || 1) * 0.5]; };

    /* ---------- そうさ ---------- */
    function select(i) {
      const r = room(), it = r.items[i], d = it && A.hItem[it.k];
      if (!d) { HS.sel = -1; renderSel(); return -1; }
      if (d.layer !== 'floor' && i !== r.items.length - 1) { r.items.push(r.items.splice(i, 1)[0]); i = r.items.length - 1; HS.sel = i; renderItems(); return i; }
      HS.sel = i; renderSel(); return i;
    }
    function deselect() { if (HS.sel < 0) return; HS.sel = -1; renderSel(); }
    function add(id) {
      const r = room(), d = A.hItem[id]; if (!d) return;
      if (d.chara != null) {
        const at = r.items.findIndex((it) => it.k === id);
        if (at >= 0) { const i = select(at); boing(i, 'jump'); S.play('giggle'); say('もう おへやに いるよ！', 1600); return; }
      }
      if (r.items.length >= MAXI) { api.toast('おへやが いっぱいだよ！ なにか しまってね'); S.play('tap'); return; }
      const jx = (Math.random() - 0.5) * 260;
      const it = { k: id, x: 500 + jx, y: 660, s: 1 };
      if (d.layer === 'wall') it.y = id === 'door' ? FLY + 2 : id === 'garland' || id === 'lights' ? 130 : id === 'chandelier' ? 214 : 320;
      else if (d.layer === 'rug') { it.x = 500 + jx * 0.4; it.y = 770; } else if (d.layer === 'top') it.y = 520;
      else if (d.small) it.y = 700 + Math.random() * 60;
      clampPos(it); pushHist(); r.items.push(it);
      HS.sel = r.items.length - 1; renderItems(); markList();
      boing(HS.sel, 'in'); const m = mid(it); burst(m[0], m[1], 120, 10); S.play('pick'); api.save();
      if (r.items.length === 1) say('ゆびで うごかして すきな ところに おいてね', 4200);
    }
    function edit(fn, sound) {
      const it = cur(); if (!it) return;
      pushHist(); fn(it); clampPos(it); renderItems(); S.play(sound || 'tap'); api.save();
    }
    function removeSel() {
      const r = room(), it = cur(); if (!it) return;
      const m = mid(it);
      pushHist(); r.items.splice(HS.sel, 1); HS.sel = -1; renderItems(); markList(); burst(m[0], m[1], 90, 8); S.play('undo'); api.save();
    }
    function tapItem(i) {
      const it = room().items[i], d = A.hItem[it.k], m = mid(it);
      if (d.tap === 'lamp' || d.tap === 'tv') {
        it.on = it.on === 0 ? 1 : 0; api.save();
        const el = itemEl(i), tmp = document.createElementNS(SVGNS, 'g');
        tmp.innerHTML = A.hItemG(it, env(), `class="hi" data-i="${i}"`);
        if (el && tmp.firstChild) el.replaceWith(tmp.firstChild);
        renderLight(); S.play(it.on === 0 ? 'undo' : 'color'); if (it.on !== 0) burst(m[0], m[1], 80, 6);
      } else if (d.tap === 'music') { S.play('melody'); burst(m[0], m[1] - 30, 110, 9); boing(i);
      } else if (d.tap === 'drum') { S.play('don'); boing(i);
      } else if (d.tap === 'pet' || d.tap === 'chara') { S.play('giggle'); burst(m[0], m[1] - (d.tap === 'chara' ? 90 : 20), 90, 7, true); boing(i, 'jump');
      } else { S.play('pop'); boing(i); }
    }
    function setRoomProp(key, v) {
      const r = room(); if ((r[key] | 0) === v) { S.play('tap'); return; }
      pushHist(); r[key] = v; api.save();
      if (key === 'time') { renderItems(); S.play('color'); say(v === 2 ? 'よるに なったよ。あかりを つけてみよう！' : v === 1 ? 'ゆうやけ こやけ' : 'おはよう！ いい てんきだね', 2400); } else { $('#hBg').innerHTML = A.roomBg(r); S.play('pick'); burst(500, 400, 380, 14); }
      renderList(false);
    }
    function undo() {
      if (!HS.hist.length) { say('もどせるのは ここまでだよ', 1800); S.play('tap'); return; }
      G.house.rooms[G.house.cur] = JSON.parse(HS.hist.pop()); HS.sel = -1; S.play('undo'); renderRoom(); renderList(false); api.save();
    }
    function clearAll() {
      S.play('tap');
      api.modal(`<div class="ic">🧹</div><h3>ぜんぶ かたづける？</h3><p>おへやの ものが ぜんぶ なくなるよ<br>（かべと ゆかは そのまま）</p><div class="row"><button class="mid-btn gray" data-act="no">やめる</button><button class="mid-btn pink" data-act="yes">かたづける</button></div>`, {
        no: api.closeModal,
        yes: () => { api.closeModal(); pushHist(); room().items = []; HS.sel = -1; renderItems(); markList(); burst(500, 450, 360, 18); api.save(); },
      });
    }
    function randomRoom() {
      const by = (sub, fn) => A.H_ITEMS.filter((d) => d.sub === sub && (!fn || fn(d)));
      const r = { wall: rnd(A.H_WALLS.length), floor: rnd(A.H_FLOORS.length), time: Math.random() < 0.7 ? 0 : 1 + rnd(2), items: [] };
      const jit = (n) => (Math.random() - 0.5) * n;
      const put = (k, x, y, o) => { if (!A.hItem[k]) return null; const it = Object.assign({ k: k, x: x, y: y, s: 1 }, o || {}); clampPos(it); r.items.push(it); return it; };
      const wx = pick([300, 500, 700]);
      put(pick(['window', 'window', 'roundwin']), wx, 336, { c: rnd(12) });
      const slots = shuffleArr([140, 300, 500, 700, 870].filter((x) => Math.abs(x - wx) > 150));
      const wd = shuffleArr(['clock', 'pic_flower', 'pic_cat', 'poster', 'mirror', 'board', 'moon', 'wshelf']);
      put(wd[0], slots[0], 290 + jit(40)); if (Math.random() < 0.6) put(wd[1], slots[1], 280 + jit(40));
      if (Math.random() < 0.6) put(pick(['garland', 'lights']), 500, 124);
      put(pick(by('rug')).id, 500, 774, { c: rnd(12) });
      put(pick(['bookshelf', 'closet', 'chest', 'fridge', 'dresser', 'desk', 'piano', 'kitchen', 'tv']), 132, 598);
      put(pick(['bed', 'bed', 'canopy', 'bunk', 'sofa']), 806, 614, { c: rnd(12) });
      const mk = pick(['rtable', 'ltable', 'kotatsu', 'toybox', 'armchair', 'beads', 'tent', 'dollhouse']), mi = put(mk, 430 + jit(60), 646, { c: mk === 'rtable' || mk === 'ltable' ? 12 : rnd(12) });
      if (mk === 'rtable' || mk === 'ltable' || mk === 'kotatsu') put(pick(by('food')).id, mi.x + jit(30), mi.y - A.hItem[mk].h + 10);
      put(pick(['flamp', 'monstera', 'tree']), 610 + jit(30), 592);
      const smalls = by('toy', (d) => d.small).concat(by('goods', (d) => d.small));
      for (let i = 0, n = 2 + rnd(3); i < n; i++) put(pick(smalls).id, 110 + rnd(790), 706 + rnd(86));
      put('@girl', 390 + jit(70), 750); put('@boy', 600 + jit(70), 762, { f: 1 });
      if (Math.random() < 0.85) put(pick(by('pet')).id, pick([230, 740]) + jit(60), 790);
      return r;
    }
    function random() {
      pushHist(); G.house.rooms[G.house.cur] = randomRoom(); HS.sel = -1;
      renderRoom(); renderList(false); api.save(); S.play('fanfare'); burst(500, 420, 420, 26); say('じゃーん！ こんな おへやは どう？', 2400);
    }
    function photo() {
      deselect(); api.flash(); S.play('shutter');
      setTimeout(() => api.openPhoto({ kind: 'room', room: clone(room()), sts: [clone(api.stOf(0)), clone(api.stOf(1))] }), 400);
    }
    function setRoom(n) {
      if (n === G.house.cur) return;
      G.house.cur = n; HS.sel = -1; HS.hist = []; S.play('tab'); api.save();
      renderRoomTabs(); renderRoom(); renderList(false);
      svg.animate([{ opacity: 0.3, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
      say(`おへや ${n + 1} だよ`, 1500);
    }

    /* ---------- ゆびで うごかす ---------- */
    function pt(e) {
      const m = svg.getScreenCTM(); if (!m) return [0, 0];
      const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
      const q = p.matrixTransform(m.inverse());
      return [q.x, q.y];
    }
    function inSel(p) {
      const it = cur(); if (!it) return false;
      const d = A.hItem[it.k], s = it.s || 1;
      return Math.abs(p[0] - it.x) < (d.w * s) / 2 + 10 && p[1] < it.y + 10 && p[1] > it.y - d.h * s - 10;
    }
    svg.addEventListener('pointerdown', (e) => {
      if (e.button) return;
      const p = pt(e), hit = e.target.closest ? e.target.closest('#hItems > [data-i]') : null;
      let i = hit ? +hit.getAttribute('data-i') : (inSel(p) ? HS.sel : -1);
      if (i < 0) { deselect(); return; }
      const snap = JSON.stringify(room());
      i = select(i);
      const it = room().items[i]; if (!it) return;
      HS.drag = { i: i, ox: it.x - p[0], oy: it.y - p[1], sx: e.clientX, sy: e.clientY, moved: false, snap: snap, id: e.pointerId };
      try { svg.setPointerCapture(e.pointerId); } catch (err) { /* */ }
      e.preventDefault();
    });
    svg.addEventListener('pointermove', (e) => {
      const dg = HS.drag; if (!dg || e.pointerId !== dg.id) return;
      if (!dg.moved && Math.hypot(e.clientX - dg.sx, e.clientY - dg.sy) < 7) return;
      const it = room().items[dg.i]; if (!it) return;
      if (!dg.moved) { dg.moved = true; root.classList.add('dragging'); }
      const p = pt(e); it.x = p[0] + dg.ox; it.y = p[1] + dg.oy; clampPos(it);
      const el = itemEl(dg.i); if (el) el.setAttribute('transform', `translate(${it.x},${it.y})`);
      $('#hSel').innerHTML = selBox();
    });
    const endDrag = (e) => {
      const dg = HS.drag; if (!dg || (e && e.pointerId !== dg.id)) return;
      HS.drag = null; root.classList.remove('dragging');
      try { svg.releasePointerCapture(dg.id); } catch (err) { /* */ }
      if (dg.moved) { pushHist(dg.snap); renderItems(); S.play('pop'); api.save(); } else if (!e || e.type !== 'pointercancel') tapItem(dg.i);
    };
    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);

    /* ---------- ボタン ---------- */
    $('#hTabs').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (!b || b.dataset.tab === HS.tab) return; HS.tab = b.dataset.tab; HS.sub = tabOf(HS.tab).subs[0]; S.play('tab'); renderPanel(true); say(SUBS[HS.sub].say); };
    $('#hSubs').onclick = (e) => { const b = e.target.closest('[data-sub]'); if (!b || b.dataset.sub === HS.sub) return; HS.sub = b.dataset.sub; S.play('tap'); renderSubs(); renderList(true); say(SUBS[HS.sub].say); };
    $('#hList').onclick = (e) => {
      const b = e.target.closest('[data-k]'); if (!b) return;
      const k = b.dataset.k, v = k.slice(1);
      if (k[0] === 'w') setRoomProp('wall', +v); else if (k[0] === 'f') setRoomProp('floor', +v); else if (k[0] === 't') setRoomProp('time', +v); else add(v);
    };
    $('#hPal').onclick = (e) => { const b = e.target.closest('[data-c]'); if (b) edit((it) => { it.c = +b.dataset.c; }, 'color'); };
    $('#roomTabs').onclick = (e) => { const b = e.target.closest('[data-r]'); if (b) setRoom(+b.dataset.r); };
    $('#hBig').onclick = () => edit((it) => { it.s = Math.min(2, +((it.s || 1) * 1.15).toFixed(3)); }, 'pop');
    $('#hSmall').onclick = () => edit((it) => { it.s = Math.max(0.5, +((it.s || 1) / 1.15).toFixed(3)); }, 'tap');
    $('#hFlip').onclick = () => edit((it) => { it.f = it.f ? 0 : 1; }, 'swish');
    $('#hDel').onclick = removeSel;
    $('#hOk').onclick = () => { S.play('tap'); deselect(); };
    $('#hDress').onclick = () => { const it = cur(), d = it && A.hItem[it.k]; if (d && d.chara != null) { S.play('open'); api.dressUp(d.chara); } };
    $('#hRandom').onclick = random;
    $('#hUndo').onclick = undo;
    $('#hClear').onclick = clearAll;
    $('#hPhoto').onclick = photo;
    $('#hMascot').onclick = () => {
      S.play('giggle'); $('#hMascot').innerHTML = A.mascot('happy'); setTimeout(() => { $('#hMascot').innerHTML = A.mascot(); }, 1400);
      say(pick(['かぐを タッチすると いろや おおきさを かえられるよ', 'ちいさい ものは つくえや ベッドの うえに のせられるよ', '🎲 おまかせで おへやが へんしん！', 'うえの 1・2・3 で べつの おへやに いけるよ', SUBS[HS.sub].say]), 4000);
    };

    function enter() {
      ensure(); HS.sel = -1; HS.hist = []; HS.drag = null;
      $('#hMascot').innerHTML = A.mascot();
      renderRoomTabs(); renderRoom(); renderPanel(true);
      setTimeout(() => say('すきな かぐを えらんで、じぶんだけの おへやを つくろう！', 4600), 400);
    }
    return { enter: enter, ensure: ensure };
  } };
})(window);
