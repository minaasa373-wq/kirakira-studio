/* きらきら☆おしゃれスタジオ — おへやづくり：へや・かぐ・かざり */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f;
  const RW = 1000, RH = 800, FLY = 560;
  const X0 = -700, X1 = 1700, Y0 = -500, Y1 = 1400, WW = X1 - X0;
  A.ROOM = { W: RW, H: RH, FLY: FLY };
  A.ROOM_PHOTO_VB = [0, 30, 1000, 750];

  const ex = (line, sw, more) => (line ? ` stroke="${line}" stroke-width="${sw || 2.5}"` : '') + (more ? ' ' + more : '');
  const R = (x, y, w, h, fill, more) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${more ? ' ' + more : ''}/>`;
  const RR = (x, y, w, h, r, fill, line, sw, more) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}"${ex(line, sw, more)}/>`;
  const Ci = (x, y, r, fill, line, sw, more) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}"${ex(line, sw, more)}/>`;
  const El = (x, y, rx, ry, fill, line, sw, more) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}"${ex(line, sw, more)}/>`;
  const mirX = (s) => `<g transform="scale(-1,1)">${s}</g>`;
  const bothX = (s) => s + mirX(s);
  const clipG = (shape, inner) => { const id = U.uid('hc'); return `<defs><clipPath id="${id}">${shape}</clipPath></defs><g clip-path="url(#${id})">${inner}</g>`; };
  const cloud = A._bk.cloud;
  const WD = '#dba869', WDL = '#9a6238', WDD = '#c08a4e', GOLD = '#ffd24a', GOLDL = '#c9860f', GL = '#d8f2ff', LEAF = '#6fcf7a', LEAFL = '#3a9a52';
  const glow = (cx, cy, r, c, op) => { const id = U.uid('hl'); return `<defs>${U.rad(id, [[c, 0, op], [c, 0.5, op * 0.45], [c, 1, 0]])}</defs><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="url(#${id})" pointer-events="none"/>`; };

  /* ================= いろ ================= */
  A.H_SCHEMES = A.SCHEMES.concat([
    { n: 'もくめ', m: '#dba869', s: '#fff3dc', a: '#9a6238' },
    { n: 'ミルクティー', m: '#ecdcc8', s: '#ffffff', a: '#c49a6c' },
    { n: 'グレー', m: '#c4cbe0', s: '#ffffff', a: '#6a7090' },
  ]);
  const WOOD = 12, MILK = 13;
  function HC(i) {
    const S = A.H_SCHEMES[i] || A.H_SCHEMES[0];
    const o = { m: S.m, s: S.s, a: S.a, ml: U.line(S.m), sl: U.line(S.s), al: U.line(S.a), defs: '', M: S.m };
    if (S.g) { const id = U.uid('hg'); o.defs = `<defs>${U.lin(id, S.g.map((x) => [x]), 0, 0, 1, 1)}</defs>`; o.M = `url(#${id})`; }
    return o;
  }
  A.hscheme = HC;

  /* ================= かべがみ ================= */
  const wallRect = (fill, more) => R(X0, Y0, WW, FLY - Y0, fill, more);
  const pattern = (w, h, inner, tf) => { const id = U.uid('hp'); return [id, `<defs><pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"${tf ? ` patternTransform="${tf}"` : ''}>${inner}</pattern></defs>`]; };
  const wallPat = (bg, w, h, inner, tf) => { const p = pattern(w, h, inner, tf); return wallRect(bg) + p[1] + wallRect(`url(#${p[0]})`); };
  const wallOver = (w, h, inner) => { const p = pattern(w, h, inner); return p[1] + wallRect(`url(#${p[0]})`); };
  const grad = (stops) => { const id = U.uid('hw'); return [id, `<defs>${U.lin(id, stops)}</defs>`]; };
  A.H_WALLS = [
    { id: 'stripe', n: 'ピンクしましま', draw: () => wallPat('#ffe3ee', 80, 80, '<rect width="40" height="80" fill="#fff" opacity=".5"/>') },
    { id: 'cream', n: 'クリーム', draw: () => wallPat('#fff6e0', 120, 120, U.sparkle(30, 30, 7, '#ffe3a8') + U.sparkle(90, 90, 5, '#ffe3a8')) },
    { id: 'dots', n: 'みずたま', draw: () => wallPat('#dcf1ff', 76, 76, Ci(19, 19, 10, '#fff', null, 0, 'opacity=".85"') + Ci(57, 57, 10, '#fff', null, 0, 'opacity=".85"')) },
    { id: 'heart', n: 'ハート', draw: () => wallPat('#fff0f5', 96, 96, U.heart(24, 26, 12, '#ffc2d8') + U.heart(72, 74, 12, '#ffd9e6')) },
    { id: 'flower', n: 'おはな', draw: () => wallPat('#f1ffe6', 110, 110, U.flower(28, 30, 14, '#ffb3d1', '#ffe27a') + U.flower(84, 86, 12, '#ffffff', '#ffd24a', 5, '#f0c0d0')) },
    { id: 'check', n: 'チェック', draw: () => wallPat('#fff6d8', 80, 80, '<rect width="40" height="40" fill="#ffd98a" opacity=".5"/><rect x="40" y="40" width="40" height="40" fill="#ffd98a" opacity=".5"/>') },
    { id: 'mint', n: 'ミントしましま', draw: () => wallPat('#d9f7ec', 64, 64, '<rect width="20" height="64" fill="#fff" opacity=".6"/>') },
    { id: 'sky', n: 'そら', draw: () => { const gd = grad([['#8fd0ff'], ['#e6f6ff']]); let s = gd[1] + wallRect(`url(#${gd[0]})`); [[-420, 60, 1.2], [-120, 300, 0.9], [120, 110, 1], [420, 330, 0.8], [640, 90, 1.1], [900, 250, 0.9], [1180, 100, 1.2], [1460, 320, 1], [300, 430, 0.7], [760, 470, 0.7]].forEach((c) => { s += cloud(c[0], c[1], c[2], '#fff', 0.95); }); return s; } },
    { id: 'yume', n: 'ゆめかわ', draw: () => { const gd = grad([['#ffd0e8'], ['#e2d0ff'], ['#cfe8ff']]); return gd[1] + wallRect(`url(#${gd[0]})`) + wallOver(150, 150, U.sparkle(36, 40, 10, '#fff') + U.sparkle(110, 104, 7, '#fff') + U.star(104, 34, 6, '#fff7c2', '#fff7c2', 1) + U.heart(40, 112, 6, '#fff')); } },
    { id: 'star', n: 'ほしぞら', draw: () => wallPat('#3b3a8c', 140, 140, U.star(34, 38, 9, '#ffe680', '#ffe680', 1) + U.sparkle(104, 100, 9, '#fff') + Ci(84, 30, 2.5, '#fff') + Ci(24, 104, 2, '#fff') + Ci(122, 58, 2, '#cfd8ff')) },
    { id: 'brick', n: 'レンガ', draw: () => wallPat('#f4b79c', 88, 44, '<path d="M0,0 H88 M0,22 H88 M22,0 V22 M66,22 V44" fill="none" stroke="#fff2e6" stroke-width="5"/>') },
    { id: 'wood', n: 'ログハウス', draw: () => wallPat('#ecc590', 220, 66, '<path d="M0,0 H220" fill="none" stroke="#c99a5c" stroke-width="5"/><path d="M40,24 q34,10 70,0 M140,46 q24,8 50,0" fill="none" stroke="#d9ac70" stroke-width="3"/>') },
    { id: 'sea', n: 'うみのなか', draw: () => { const gd = grad([['#7fe0e8'], ['#4fa8e8']]); return gd[1] + wallRect(`url(#${gd[0]})`) + wallOver(170, 170, Ci(40, 50, 12, 'none', '#fff', 3, 'opacity=".6"') + Ci(58, 26, 6, 'none', '#fff', 2.5, 'opacity=".6"') + Ci(126, 120, 9, 'none', '#fff', 3, 'opacity=".5"') + P('M96,60 q14,-10 26,0 q-12,10 -26,0Z M122,60 l10,-7 v14Z', '#ffd98a', null, 0, 'opacity=".9"')); } },
    { id: 'forest', n: 'もり', draw: () => wallPat('#e3f6d4', 150, 130, P('M38,100 L62,40 L86,100Z', '#a8e09a') + P('M52,68 L62,24 L72,68Z', '#a8e09a') + R(58, 100, 8, 16, '#d9b88a') + P('M112,128 L128,84 L144,128Z', '#c0eab0') + Ci(22, 30, 5, '#ffd0e0')) },
  ];
  A.hWall = (i) => (A.H_WALLS[i] || A.H_WALLS[0]).draw();

  /* ================= ゆか ================= */
  const floorRect = (fill, more) => R(X0, FLY, WW, Y1 - FLY, fill, more);
  const floorPat = (bg, w, h, inner, tf) => { const p = pattern(w, h, inner, tf); return floorRect(bg) + p[1] + floorRect(`url(#${p[0]})`); };
  const rays = (c, step, sw, op) => { let s = ''; for (let x = -1400; x <= 2400; x += step) s += P(`M${f(500 + (x - 500) * 0.52)},${FLY} L${x},${FLY + 440}`, 'none', c, sw || 2.5, `opacity="${op || 0.6}"`); return s; };
  const rows = (c, ys, sw, op) => ys.map((y) => P(`M${X0},${FLY + y} H${X1}`, 'none', c, sw || 2.5, `opacity="${op || 0.6}"`)).join('');
  A.H_FLOORS = [
    { id: 'wood', n: 'フローリング', draw: () => floorRect('#f6d4a8') + rays('#e0b382', 110) },
    { id: 'tile', n: 'ピンクタイル', draw: () => floorRect('#ffe1ec') + rays('#ffffff', 120, 5, 0.9) + rows('#ffffff', [26, 64, 116, 184, 270], 5, 0.9) },
    { id: 'carpet', n: 'じゅうたん', draw: () => floorPat('#ffd3e2', 26, 20, Ci(6, 6, 2, '#fff', null, 0, 'opacity=".55"') + Ci(19, 16, 2, '#ffb3cc', null, 0, 'opacity=".6"')) },
    { id: 'bluecarpet', n: 'あおいじゅうたん', draw: () => floorPat('#cfe6ff', 26, 20, Ci(6, 6, 2, '#fff', null, 0, 'opacity=".6"') + Ci(19, 16, 2, '#a8cdf5', null, 0, 'opacity=".7"')) },
    { id: 'checker', n: 'チェッカー', draw: () => floorPat('#f3ecff', 120, 80, '<rect width="60" height="40" fill="#cdb8f5" opacity=".7"/><rect x="60" y="40" width="60" height="40" fill="#cdb8f5" opacity=".7"/>') },
    { id: 'tatami', n: 'たたみ', draw: () => floorPat('#dfe6a6', 300, 120, '<path d="M0,0 H300 M0,60 H300 M0,0 V60 M150,60 V120" fill="none" stroke="#7fa060" stroke-width="7"/><path d="M0,15 H300 M0,30 H300 M0,45 H300 M0,75 H300 M0,90 H300 M0,105 H300" fill="none" stroke="#c9d28c" stroke-width="1.5"/>') },
    { id: 'grass', n: 'しばふ', draw: () => floorPat('#a4e390', 90, 60, P('M12,30 l4,-12 l4,12 M52,50 l4,-12 l4,12', 'none', '#7fcf70', 3) + U.flower(72, 18, 5, '#fff', '#ffd24a') + Ci(34, 12, 2, '#fff7a8')) },
    { id: 'cloud', n: 'くも', draw: () => { let s = floorRect('#e8f5ff'); for (let i = 0; i < 26; i++) s += cloud(-640 + i * 96 + (i % 3) * 20, FLY + 30 + (i % 4) * 62, 0.9 + (i % 3) * 0.2, '#fff', 0.9); return s; } },
    { id: 'sand', n: 'すなはま', draw: () => floorPat('#f9e2ae', 120, 70, Ci(20, 20, 2.5, '#e6c888') + Ci(70, 50, 2, '#e6c888') + Ci(100, 14, 2, '#fff3d0') + P('M40,40 q8,-6 16,0', 'none', '#ecd096', 2)) },
    { id: 'space', n: 'うちゅう', draw: () => floorPat('#2e2c70', 130, 90, U.sparkle(30, 26, 6, '#fff') + Ci(90, 60, 2.2, '#ffe680') + Ci(60, 76, 1.6, '#fff') + Ci(110, 18, 1.6, '#cfd8ff')) },
  ];
  A.hFloor = (i) => (A.H_FLOORS[i] || A.H_FLOORS[0]).draw();
  A.H_TIMES = [{ id: 'day', n: 'ひる', icon: '☀️' }, { id: 'eve', n: 'ゆうがた', icon: '🌇' }, { id: 'night', n: 'よる', icon: '🌙' }];
  A.roomBg = (room) => A.hWall(room.wall | 0) + A.hFloor(room.floor | 0) + R(X0, FLY - 16, WW, 20, '#ffffff') + R(X0, FLY + 2, WW, 5, '#5a3070', 'opacity=".08"');

  /* まどの そとの けしき（じかんで かわる） */
  function skyIn(time, shape, x, y, w, h) {
    const id = U.uid('sk'), k = Math.min(w, h) / 160, cx = x + w / 2, cy = y + h / 2;
    const st = time === 2 ? [['#1c1850'], ['#4a3a8a']] : time === 1 ? [['#ff8f6a'], ['#ffdc8a']] : [['#7cc8ff'], ['#e3f5ff']];
    let s = `<defs>${U.lin(id, st)}</defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>`;
    if (time === 2) s += Ci(cx + 26 * k, cy - 30 * k, 22 * k, '#fff7c2') + Ci(cx + 20 * k, cy - 36 * k, 5 * k, '#f0e0a0', null, 0, 'opacity=".7"') + U.sparkle(cx - 40 * k, cy - 40 * k, 7 * k, '#fff') + U.sparkle(cx - 20 * k, cy + 10 * k, 5 * k, '#fff') + U.sparkle(cx + 44 * k, cy + 24 * k, 4 * k, '#fff');
    else if (time === 1) s += Ci(cx, y + h * 0.8, 30 * k, '#fff3a8') + cloud(cx - 34 * k, cy - 34 * k, 0.5 * k, '#ffe9d6', 0.95);
    else s += Ci(x + w - 34 * k, y + 34 * k, 17 * k, '#fff3a8') + cloud(cx - 26 * k, cy - 10 * k, 0.6 * k, '#fff', 0.97) + cloud(cx + 40 * k, cy + 34 * k, 0.42 * k, '#fff', 0.95);
    s += El(cx - w * 0.2, y + h + 14 * k, w * 0.6, 44 * k, time === 2 ? '#2f5a66' : time === 1 ? '#8fcf7a' : '#9fe08f') + El(cx + w * 0.34, y + h + 20 * k, w * 0.5, 40 * k, time === 2 ? '#274a58' : time === 1 ? '#7fc070' : '#8fd680');
    return clipG(shape, s);
  }

  /* ================= アイテムの とうろく ================= */
  A.H_ITEMS = []; A.hItem = {};
  const reg = (sub, base, list) => list.forEach((it) => { const o = Object.assign({ sub: sub, dc: 0 }, base, it); A.H_ITEMS.push(o); A.hItem[o.id] = o; });
  A._hk = { R, RR, Ci, El, mirX, bothX, clipG, cloud, glow, reg, WD, WDL, WDD, GOLD, GOLDL, GL, LEAF, LEAFL, WOOD, MILK, FLY };
  const BIG = { layer: 'floor' }, WALL = { layer: 'wall' }, RUG = { layer: 'rug' }, SMALL = { layer: 'floor', small: 1 };
  const bedding = (x0, x1, y, c, pil) => RR(x0, y - 38, x1 - x0, 44, 14, '#ffffff', '#e6d3de') + RR(x0 + 8, y - 66, 84, 38, 17, pil, U.line(pil)) +
    P(`M${x0 + 110},${y - 44} L${x1 - 8},${y - 44} Q${x1},${y - 44} ${x1},${y - 36} L${x1},${y + 6} L${x0 + 92},${y + 6} Q${x0 + 96},${y - 22} ${x0 + 110},${y - 44}Z`, c, U.line(c)) + P(`M${x0 + 104},${y - 30} L${x1},${y - 30}`, 'none', '#fff', 6, 'opacity=".7"');

  /* ---------- ベッド・ソファ ---------- */
  reg('bed', BIG, [
    { id: 'bed', n: 'ベッド', w: 360, h: 210, dc: 0,
      draw(c) {
        return R(-168, -30, 14, 30, WDD) + R(154, -30, 14, 30, WDD) + RR(-182, -204, 38, 180, 17, c.M, c.ml) + U.heart(-163, -160, 9, c.s, c.sl, 1.6) + RR(150, -124, 32, 100, 14, c.M, c.ml) +
          RR(-160, -74, 324, 50, 10, c.M, c.ml) + bedding(-152, 158, -76, U.light(c.m, 0.4), c.s);
      } },
    { id: 'canopy', n: 'てんがいベッド', w: 390, h: 430, dc: 1,
      draw(c) {
        const drape = P('M-186,-398 C-150,-300 -160,-200 -190,-104 L-168,-104 C-138,-200 -128,-300 -120,-398Z', U.light(c.m, 0.45), c.ml, 2, 'fill-opacity=".92"') + U.bow(-172, -214, 34, 20, c.a, c.al, { sw: 1.6 });
        return bothX(RR(-188, -404, 14, 404, 6, GOLD, GOLDL, 2)) + RR(-160, -74, 320, 50, 10, c.M, c.ml) + RR(-176, -190, 30, 160, 13, c.M, c.ml) + bedding(-150, 156, -76, U.light(c.m, 0.4), c.s) +
          bothX(drape) + P('M-196,-398' + U.frillLine(-196, -398, 196, -398, 9, 16) + 'Z', c.s, c.sl, 2) + RR(-200, -418, 400, 24, 11, c.M, c.ml) + U.star(0, -428, 15, GOLD, GOLDL, 2) + U.sparkle(-120, -360, 6, '#fff') + U.sparkle(126, -340, 5, '#fff');
      } },
    { id: 'bunk', n: 'にだんベッド', w: 330, h: 390, dc: WOOD,
      draw(c) {
        const bed = (y, bl, pil) => RR(-150, y - 26, 300, 34, 8, c.M, c.ml) + RR(-142, y - 52, 284, 30, 10, '#fff', '#e6d3de') + RR(-136, y - 74, 70, 32, 14, pil, U.line(pil)) + RR(-50, y - 58, 190, 38, 10, bl, U.line(bl)) + P(`M-50,${y - 46} h190`, 'none', '#fff', 5, 'opacity=".7"');
        return bothX(RR(-162, -390, 16, 390, 5, c.M, c.ml)) + bed(-56, '#ffb3d1', '#fff') + bed(-226, '#8ed4ff', '#fff') + RR(-150, -302, 196, 12, 6, c.M, c.ml) + P('M-100,-296 v44 M-40,-296 v44 M20,-296 v44', 'none', c.ml, 5) +
          P('M82,-250 L82,-4 M124,-250 L124,-4', 'none', c.ml, 9) + P('M82,-250 L82,-4 M124,-250 L124,-4', 'none', c.m, 5) + [-200, -150, -100, -50].map((y) => RR(80, y, 46, 9, 4, c.M, c.ml, 2)).join('') + U.star(-155, -398, 9, GOLD, GOLDL, 1.6) + U.star(155, -398, 9, GOLD, GOLDL, 1.6);
      } },
    { id: 'sofa', n: 'ソファ', w: 310, h: 170, dc: 0,
      draw(c) {
        return R(-128, -20, 14, 20, WDD) + R(114, -20, 14, 20, WDD) + RR(-138, -170, 276, 120, 36, c.M, c.ml) + P('M0,-162 v64 M-70,-150 q70,-14 140,0', 'none', c.ml, 2, 'opacity=".35"') +
          RR(-146, -90, 292, 66, 22, U.light(c.m, 0.16), c.ml) + P('M0,-88 v60', 'none', c.ml, 2, 'opacity=".4"') + bothX(RR(-158, -122, 48, 104, 22, c.M, c.ml)) +
          RR(-96, -128, 58, 48, 14, c.s, c.sl, 2) + U.heart(-67, -104, 10, c.a) + RR(42, -122, 52, 42, 14, c.a, c.al, 2);
      } },
    { id: 'armchair', n: 'ひとりがけソファ', w: 180, h: 170, dc: 4,
      draw(c) {
        return R(-62, -20, 12, 20, WDD) + R(50, -20, 12, 20, WDD) + RR(-72, -170, 144, 120, 40, c.M, c.ml) + RR(-78, -88, 156, 64, 22, U.light(c.m, 0.16), c.ml) + bothX(RR(-90, -120, 40, 102, 20, c.M, c.ml)) +
          RR(-26, -124, 52, 44, 14, c.s, c.sl, 2) + U.star(0, -102, 9, c.a, c.al, 1.4);
      } },
    { id: 'beads', n: 'ビーズクッション', w: 190, h: 124, dc: 3,
      draw(c) {
        return P('M-90,-12 C-100,-64 -62,-122 0,-122 C62,-122 100,-64 90,-12 C62,4 -62,4 -90,-12Z', c.M, c.ml) + P('M-50,-96 C-20,-72 20,-72 50,-96', 'none', c.ml, 2.5, 'opacity=".4"') + P('M0,-74 C-4,-50 -2,-26 0,-2', 'none', c.ml, 2, 'opacity=".3"') +
          P('M-66,-70 q8,-26 30,-38', 'none', '#fff', 7, 'opacity=".5"');
      } },
    { id: 'hammock', n: 'ハンモック', w: 390, h: 236, dc: 8,
      draw(c) {
        const post = P('M-176,-6 L-152,-216', 'none', WDL, 14) + P('M-176,-6 L-152,-216', 'none', WD, 9) + P('M-150,-10 L-178,-90', 'none', WDL, 9) + P('M-150,-10 L-178,-90', 'none', WD, 5);
        const D = 'M-152,-206 Q0,-50 152,-206 Q0,-118 -152,-206Z';
        return RR(-188, -14, 376, 14, 7, WD, WDL) + bothX(post) + P(D, c.M, c.ml) + clipG(`<path d="${D}"/>`, [-110, -60, -10, 40, 90].map((x) => R(x, -220, 22, 200, c.s, 'opacity=".75"')).join('')) + P(D, 'none', c.ml, 2.5) +
          P('M-152,-206 Q0,-50 152,-206', 'none', c.al, 5) + RR(-124, -180, 56, 32, 14, c.a, c.al, 2);
      } },
  ]);

  /* ---------- つくえ・いす ---------- */
  reg('table', BIG, [
    { id: 'rtable', n: 'まるテーブル', w: 220, h: 128, dc: WOOD,
      draw(c) {
        return El(0, -8, 56, 10, c.M, c.ml) + RR(-11, -108, 22, 102, 4, U.dark(c.m, 0.14), c.ml) + P('M-108,-116 v10 a108,20 0 0 0 216,0 v-10Z', U.dark(c.m, 0.14), c.ml) + El(0, -116, 108, 20, c.M, c.ml) + El(-30, -120, 40, 6, '#fff', null, 0, 'opacity=".35"');
      } },
    { id: 'ltable', n: 'ローテーブル', w: 260, h: 84, dc: WOOD,
      draw(c) {
        return bothX(RR(-116, -64, 18, 64, 5, U.dark(c.m, 0.14), c.ml)) + RR(-104, -34, 208, 10, 5, U.dark(c.m, 0.08), c.ml, 2) + RR(-130, -84, 260, 24, 11, c.M, c.ml) + P('M-104,-76 h80', 'none', '#fff', 5, 'opacity=".35"');
      } },
    { id: 'desk', n: 'べんきょうづくえ', w: 250, h: 230, dc: WOOD,
      draw(c) {
        const bk = [['#ff9ec6', 14, 52], ['#8ed4ff', 12, 60], ['#ffe37a', 16, 48], ['#c4a7ff', 12, 56], ['#8de8cc', 14, 50]];
        let x = -96, books = '';
        bk.forEach((b) => { books += RR(x, -202 + (62 - b[2]) - 2, b[1], b[2], 2, b[0], U.dark(b[0], 0.3), 1.6); x += b[1] + 2; });
        return RR(-116, -100, 16, 100, 4, c.M, c.ml) + RR(36, -100, 82, 100, 6, c.M, c.ml) + [0, 1, 2].map((i) => RR(44, -92 + i * 31, 66, 25, 5, U.light(c.m, 0.25), c.ml, 2) + Ci(77, -79.5 + i * 31, 4, GOLD, GOLDL, 1.4)).join('') +
          RR(-124, -116, 248, 18, 7, c.M, c.ml) + bothX(RR(-116, -222, 12, 108, 3, c.M, c.ml)) + RR(-116, -230, 232, 12, 5, c.M, c.ml) + RR(-110, -144, 220, 8, 3, U.dark(c.m, 0.1), c.ml, 2) + books +
          Ci(70, -170, 22, '#fff', c.al, 3) + P('M70,-170 v-12 M70,-170 h9', 'none', c.al, 3) + RR(-60, -124, 50, 8, 2, '#fff', '#c9cfe0', 1.6) + P('M-10,-120 l26,-10', 'none', '#ff7fb2', 5);
      } },
    { id: 'chair', n: 'いす', w: 104, h: 172, dc: 0,
      draw(c) {
        return bothX(RR(-42, -68, 11, 68, 3, WD, WDL, 2)) + R(-34, -100, 9, 26, WD, `stroke="${WDL}" stroke-width="2"`) + R(25, -100, 9, 26, WD, `stroke="${WDL}" stroke-width="2"`) +
          RR(-42, -172, 84, 78, 18, c.M, c.ml) + U.heart(0, -134, 12, c.s, c.sl, 1.6) + RR(-50, -88, 100, 24, 11, c.M, c.ml);
      } },
    { id: 'stool', n: 'スツール', w: 96, h: 92, dc: 3,
      draw(c) {
        return P('M-30,-70 L-38,0 M30,-70 L38,0 M0,-70 V-2', 'none', WDL, 11) + P('M-30,-70 L-38,0 M30,-70 L38,0 M0,-70 V-2', 'none', WD, 7) + P('M-44,-78 v10 a44,12 0 0 0 88,0 v-10Z', U.dark(c.m, 0.14), c.ml) + El(0, -78, 44, 12, c.M, c.ml);
      } },
    { id: 'dresser', n: 'ドレッサー', w: 210, h: 330, dc: 6,
      draw(c) {
        let bulbs = '';
        for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; bulbs += Ci(74 * Math.cos(a), -226 + 96 * Math.sin(a), 6, '#fff7c2', '#f0b730', 1.6); }
        return RR(-100, -132, 200, 126, 12, c.M, c.ml) + R(-92, -8, 14, 8, c.ml) + R(78, -8, 14, 8, c.ml) + RR(-86, -116, 172, 44, 8, c.s, c.sl, 2) + RR(-86, -64, 172, 44, 8, c.s, c.sl, 2) + Ci(0, -94, 6, GOLD, GOLDL, 1.6) + Ci(0, -42, 6, GOLD, GOLDL, 1.6) +
          El(0, -226, 74, 96, GOLD, GOLDL) + El(0, -226, 63, 85, GL) + P('M-36,-270 q14,-28 42,-34', 'none', '#fff', 8, 'opacity=".8"') + bulbs +
          RR(-78, -160, 18, 28, 5, '#ff9ec6', '#d9508a', 1.6) + R(-74, -170, 10, 12, GOLD) + RR(54, -156, 22, 24, 7, '#c4a7ff', '#8a5cf0', 1.6) + Ci(65, -160, 6, GOLD, GOLDL, 1.4) + U.heart(-36, -144, 8, '#ff7fb0');
      } },
    { id: 'kotatsu', n: 'こたつ', w: 280, h: 112, dc: 5,
      draw(c) {
        const D = 'M-138,0 C-144,-52 -122,-80 -100,-82 L100,-82 C122,-80 144,-52 138,0Z';
        return P(D, c.M, c.ml) + clipG(`<path d="${D}"/>`, [-110, -66, -22, 22, 66, 110].map((x, i) => U.flower(x, -40 + (i % 2) * 18, 11, c.s, c.a)).join('')) + P('M-138,0 Q0,12 138,0', 'none', c.ml, 2.5) +
          RR(-118, -100, 236, 22, 9, WD, WDL) + El(0, -106, 34, 8, '#8a5a36') + Ci(-14, -112, 11, '#ff9a3c', '#d9702a', 1.6) + Ci(10, -112, 11, '#ff9a3c', '#d9702a', 1.6) + Ci(-2, -124, 11, '#ffa84a', '#d9702a', 1.6) + P('M-2,-135 l3,-5', 'none', LEAFL, 3);
      } },
  ]);

  /* ---------- たな・でんか ---------- */
  reg('shelf', BIG, [
    { id: 'bookshelf', n: 'ほんだな', w: 190, h: 314, dc: WOOD,
      draw(c) {
        const r = U.rng(31), cols = ['#ff9ec6', '#8ed4ff', '#ffe37a', '#c4a7ff', '#8de8cc', '#ff8a70', '#ffffff'];
        let s = RR(-94, -314, 188, 314, 9, c.M, c.ml) + RR(-80, -300, 160, 288, 4, U.dark(c.m, 0.2));
        [-204, -108, -12].forEach((y, row) => {
          let x = -76;
          while (x < 56) { const w = 11 + r() * 8, h = 52 + r() * 26, col = cols[Math.floor(r() * cols.length)]; s += RR(x, y - h, w, h, 2, col, U.dark(col, 0.3), 1.5); x += w + 1.5; if (row === 1 && x > 10) break; }
          if (row === 1) s += Ci(48, y - 22, 20, '#d09a68', '#8a5a36', 2) + Ci(34, y - 40, 8, '#d09a68', '#8a5a36', 2) + Ci(62, y - 40, 8, '#d09a68', '#8a5a36', 2) + Ci(42, y - 25, 2.4, '#3b2430') + Ci(54, y - 25, 2.4, '#3b2430') + El(48, y - 16, 6, 4, '#f5dcbc');
          s += RR(-80, y, 160, 10, 3, c.M, c.ml, 2);
        });
        return s + RR(-100, -322, 200, 16, 8, c.M, c.ml);
      } },
    { id: 'closet', n: 'クローゼット', w: 200, h: 350, dc: 6,
      draw(c) {
        return R(-86, -10, 16, 10, c.ml) + R(70, -10, 16, 10, c.ml) + RR(-96, -338, 192, 330, 12, c.M, c.ml) + P('M0,-330 v314', 'none', c.ml, 2.5) + bothX(RR(-84, -322, 72, 298, 9, 'none', c.ml, 2) + U.heart(-48, -256, 11, c.a, c.al, 1.4) + Ci(-12, -176, 6.5, GOLD, GOLDL, 1.6)) +
          RR(-104, -350, 208, 20, 10, c.M, c.ml) + P('M-70,-150 q22,10 44,0 M26,-150 q22,10 44,0', 'none', c.ml, 2, 'opacity=".4"');
      } },
    { id: 'chest', n: 'チェスト', w: 190, h: 172, dc: WOOD,
      draw(c) {
        return R(-82, -10, 16, 10, c.ml) + R(66, -10, 16, 10, c.ml) + RR(-92, -168, 184, 160, 10, c.M, c.ml) + [0, 1, 2].map((i) => RR(-80, -158 + i * 50, 160, 42, 8, U.light(c.m, 0.28), c.ml, 2) + Ci(-36, -137 + i * 50, 5.5, GOLD, GOLDL, 1.5) + Ci(36, -137 + i * 50, 5.5, GOLD, GOLDL, 1.5)).join('') + RR(-98, -176, 196, 14, 7, c.M, c.ml);
      } },
    { id: 'tv', n: 'テレビ', w: 250, h: 214, dc: 9, tap: 'tv', glow: [0, -140, 150, '#bfe9ff'],
      draw(c, it) {
        const on = it.on !== 0, S = '<rect x="-92" y="-196" width="184" height="108" rx="6"/>';
        const pic = on ? clipG(S, R(-92, -196, 184, 108, '#9fdcff') + Ci(56, -166, 16, '#fff3a8') + El(-40, -84, 90, 34, '#8fe08a') + El(60, -80, 80, 30, '#7fd07a') + cloud(-46, -160, 0.4, '#fff', 0.95) +
          P(U.starPath(-6, -116, 24, 14), '#ffe14a', '#f0b020', 2) + Ci(-13, -118, 2.4, '#5a3a2a') + Ci(1, -118, 2.4, '#5a3a2a') + P('M-11,-110 q5,5 10,0', 'none', '#5a3a2a', 2)) : RR(-92, -196, 184, 108, 6, '#5a5278') + P('M-70,-180 l40,-0 M-70,-166 l20,0', 'none', '#fff', 4, 'opacity=".2"');
        return R(-102, -8, 14, 8, WDL) + R(88, -8, 14, 8, WDL) + RR(-114, -72, 228, 66, 9, c.M, c.ml) + bothX(RR(-104, -62, 98, 46, 6, U.light(c.m, 0.2), c.ml, 2) + Ci(-22, -39, 4.5, GOLD, GOLDL, 1.4)) +
          R(-16, -82, 32, 12, '#262040') + RR(-104, -208, 208, 132, 12, '#40395a', '#262040') + pic + Ci(84, -82, 3, on ? '#8de8cc' : '#f2485c');
      } },
    { id: 'toybox', n: 'おもちゃばこ', w: 200, h: 150, dc: 4,
      draw(c) {
        return Ci(-52, -102, 24, '#ff9ec6', '#d9508a') + P('M-76,-102 a24,24 0 0 1 48,0', 'none', '#fff', 5, 'opacity=".6"') + Ci(8, -112, 24, '#d09a68', '#8a5a36') + Ci(-10, -132, 9, '#d09a68', '#8a5a36') + Ci(26, -132, 9, '#d09a68', '#8a5a36') + Ci(0, -114, 2.6, '#3b2430') + Ci(16, -114, 2.6, '#3b2430') + El(8, -104, 7, 5, '#f5dcbc') +
          RR(46, -124, 34, 34, 5, '#8ed4ff', '#3a8fe8') + U.star(63, -107, 9, '#fff', '#fff', 1) + RR(-94, -92, 188, 88, 12, c.M, c.ml) + RR(-94, -92, 188, 20, 10, U.light(c.m, 0.3), c.ml) + U.star(0, -44, 20, c.s, c.sl, 2) + bothX(Ci(-72, -44, 6, c.a, c.al, 1.6));
      } },
    { id: 'fridge', n: 'れいぞうこ', w: 140, h: 286, dc: 2,
      draw(c) {
        return R(-56, -8, 14, 8, c.ml) + R(42, -8, 14, 8, c.ml) + RR(-66, -284, 132, 278, 18, c.M, c.ml) + P('M-66,-184 h132', 'none', c.ml, 2.5) + RR(38, -258, 10, 56, 5, c.s, c.sl, 2) + RR(38, -168, 10, 76, 5, c.s, c.sl, 2) +
          P('M-50,-266 q-4,30 0,66', 'none', '#fff', 6, 'opacity=".5"') + U.heart(-28, -232, 8, '#ff7fb2', '#d9508a', 1.2) + U.star(-2, -214, 7, GOLD, GOLDL, 1.2) + RR(-44, -150, 30, 36, 3, '#fff', '#c9cfe0', 1.6) + P('M-38,-140 h18 M-38,-132 h18 M-38,-124 h12', 'none', '#ff9ec6', 2);
      } },
    { id: 'kitchen', n: 'キッチン', w: 260, h: 270, dc: 0,
      draw(c) {
        return RR(-126, -262, 252, 150, 12, U.light(c.m, 0.45), c.ml) + RR(-110, -246, 220, 40, 8, c.M, c.ml) + bothX(Ci(-20, -226, 5, GOLD, GOLDL, 1.4)) + P('M0,-246 v40', 'none', c.ml, 2) +
          P('M-90,-196 v22 M-66,-196 v18 M-42,-196 v24', 'none', '#b9c0d6', 4) + El(-90, -168, 8, 11, '#fff', '#b9c0d6', 2) + R(-72, -180, 12, 16, '#ff9ec6', 'rx="3"') + Ci(-42, -166, 9, '#ffe37a', '#e0a020', 2) +
          RR(40, -196, 34, 36, 6, '#fff', '#c9cfe0', 2) + RR(80, -190, 26, 30, 6, '#8de8cc', '#27b592', 2) +
          RR(-124, -112, 248, 108, 10, c.M, c.ml) + RR(-112, -96, 104, 84, 8, c.s, c.sl, 2) + RR(-100, -84, 80, 44, 6, '#5a5278', '#2e2a44', 2) + P('M-96,-30 h72', 'none', c.sl, 5) + RR(8, -96, 104, 84, 8, c.s, c.sl, 2) + Ci(22, -54, 5, GOLD, GOLDL, 1.4) +
          RR(-132, -128, 264, 20, 8, '#ffffff', '#d8c8e0') + El(-60, -128, 30, 6, '#5a5278') + RR(-86, -162, 52, 32, 8, '#f2485c', '#b8182e') + P('M-92,-150 h-10 M-28,-150 h10', 'none', '#b8182e', 5) + RR(-90, -168, 60, 9, 4, '#ff6f80', '#b8182e', 2) + Ci(-60, -172, 5, GOLD, GOLDL, 1.4) +
          P('M70,-128 v-30 q0,-16 -20,-16 v8', 'none', '#8a90a8', 9) + P('M70,-128 v-30 q0,-16 -20,-16 v8', 'none', '#d8dce8', 5) + El(50, -128, 34, 5, '#bfe9ff', '#8a90a8', 2);
      } },
    { id: 'piano', n: 'ピアノ', w: 260, h: 214, dc: 7, tap: 'music',
      draw(c) {
        let keys = RR(-118, -96, 236, 26, 3, '#ffffff', '#c9cfe0', 1.6);
        for (let i = 1; i < 14; i++) keys += P(`M${-118 + i * 16.86},-96 v26`, 'none', '#c9cfe0', 1.4);
        [0, 1, 3, 4, 5, 7, 8, 10, 11, 12].forEach((i) => { keys += R(-118 + (i + 1) * 16.86 - 5, -96, 10, 16, '#3a3446'); });
        return bothX(RR(-122, -70, 20, 70, 5, c.M, c.ml)) + RR(-126, -212, 252, 128, 12, c.M, c.ml) + RR(-110, -196, 220, 60, 6, U.light(c.m, 0.14), c.ml, 2) + RR(-134, -104, 268, 40, 8, c.M, c.ml) + keys +
          RR(-44, -190, 88, 50, 3, '#fff8ea', '#d8c8a8', 1.6) + P('M-32,-176 h64 M-32,-164 h64 M-32,-152 h64', 'none', '#c9bfa8', 1.4) + Ci(-18, -160, 4, '#3a3446') + P('M-14,-160 v-16', 'none', '#3a3446', 2) + Ci(6, -168, 4, '#3a3446') + P('M10,-168 v-14', 'none', '#3a3446', 2) + Ci(26, -156, 4, '#3a3446') + P('M30,-156 v-16', 'none', '#3a3446', 2) +
          RR(-18, -20, 12, 16, 4, GOLD, GOLDL, 1.4) + RR(6, -20, 12, 16, 4, GOLD, GOLDL, 1.4) + U.sparkle(100, -190, 7, '#fff', 0.8);
      } },
  ]);

  /* ---------- かべかざり ---------- */
  reg('wallitem', WALL, [
    { id: 'window', n: 'まど', w: 240, h: 262, dc: 0,
      draw(c, it, env) {
        const cur = P('M-104,-250 C-72,-184 -78,-92 -108,-16 L-70,-16 C-54,-92 -58,-184 -60,-250Z', c.M, c.ml) + P('M-88,-240 C-70,-180 -74,-100 -92,-30', 'none', c.ml, 2, 'opacity=".35"') + U.bow(-84, -120, 30, 18, c.a, c.al, { sw: 1.5 });
        return RR(-92, -244, 184, 226, 12, '#ffffff', '#e6cfd8', 4) + skyIn(env.time | 0, '<rect x="-80" y="-232" width="160" height="202" rx="6"/>', -80, -232, 160, 202) + R(-4, -232, 8, 202, '#fff') + R(-80, -136, 160, 8, '#fff') +
          P('M-66,-222 l34,0 M-66,-208 l16,0', 'none', '#fff', 5, 'opacity=".6"') + bothX(cur) + RR(-116, -262, 232, 16, 8, c.s, c.sl) + bothX(Ci(-118, -254, 10, GOLD, GOLDL, 2)) + RR(-102, -24, 204, 16, 7, '#ffffff', '#e6cfd8');
      } },
    { id: 'roundwin', n: 'まるいまど', w: 180, h: 180, dc: 6,
      draw(c, it, env) {
        return Ci(0, -90, 86, c.M, c.ml, 4) + skyIn(env.time | 0, '<circle cx="0" cy="-90" r="72"/>', -72, -162, 144, 144) + R(-4, -162, 8, 144, c.m) + R(-72, -94, 144, 8, c.m) + Ci(0, -90, 72, 'none', c.ml, 2.5) + P('M-50,-130 q14,-24 40,-30', 'none', '#fff', 6, 'opacity=".6"');
      } },
    { id: 'door', n: 'ドア', w: 180, h: 336, dc: WOOD,
      draw(c) {
        return RR(-88, -336, 176, 336, 10, U.dark(c.m, 0.16), c.ml) + RR(-74, -322, 148, 322, 6, c.M, c.ml) + P('M-50,-190 V-268 a50,50 0 0 1 100,0 V-190Z', GL, c.ml, 2.5) + P('M0,-318 V-190 M-50,-250 h100', 'none', c.m, 6) +
          RR(-56, -164, 112, 134, 8, U.light(c.m, 0.22), c.ml, 2) + Ci(50, -150, 9, GOLD, GOLDL, 2) + U.heart(0, -100, 14, c.a, c.al, 1.6);
      } },
    { id: 'clock', n: 'とけい', w: 116, h: 122, dc: 4,
      draw(c) {
        const d = new Date(), ha = ((d.getHours() % 12) + d.getMinutes() / 60) * 30 - 90, ma = d.getMinutes() * 6 - 90, rad = Math.PI / 180;
        let t = '';
        for (let i = 0; i < 12; i++) { const a = i * 30 * rad; t += Ci(42 * Math.cos(a), -56 + 42 * Math.sin(a), i % 3 ? 2 : 3.6, c.a); }
        return U.bow(0, -112, 34, 18, c.a, c.al, { sw: 1.6 }) + Ci(0, -56, 54, c.M, c.ml, 3) + Ci(0, -56, 46, '#ffffff') + t +
          P(`M0,-56 L${f(22 * Math.cos(ha * rad))},${f(-56 + 22 * Math.sin(ha * rad))}`, 'none', '#6b3a5c', 6) + P(`M0,-56 L${f(34 * Math.cos(ma * rad))},${f(-56 + 34 * Math.sin(ma * rad))}`, 'none', '#6b3a5c', 4) + Ci(0, -56, 5, c.a, c.al, 1.4);
      } },
    { id: 'pic_flower', n: 'おはなの え', w: 136, h: 158, dc: WOOD,
      draw(c) {
        return RR(-64, -156, 128, 150, 9, c.M, c.ml) + RR(-52, -144, 104, 126, 4, '#eaf8ff') + P('M0,-36 C-2,-60 2,-80 0,-98', 'none', LEAFL, 5) + P('M0,-56 q-22,-4 -26,-22 q22,0 26,22Z M0,-48 q20,-6 26,-22 q-20,0 -26,22Z', LEAF, LEAFL, 1.6) + U.flower(0, -104, 26, '#ff9ec6', '#ffe27a', 6, '#e87aa8') + R(-52, -34, 104, 16, '#bfe6a8');
      } },
    { id: 'pic_cat', n: 'ねこの え', w: 156, h: 136, dc: 0,
      draw(c) {
        return RR(-74, -134, 148, 128, 9, c.M, c.ml) + RR(-62, -122, 124, 104, 4, '#fff6dc') + P('M-30,-80 L-34,-108 L-12,-96Z M30,-80 L34,-108 L12,-96Z', '#fff6ea', '#d2ab90', 2.5) + El(0, -68, 36, 30, '#fff6ea', '#d2ab90') + El(-13, -72, 4.5, 6, '#3b2430') + El(13, -72, 4.5, 6, '#3b2430') +
          P('M-4,-63 h8 l-4,4.5Z', '#ff8fb0') + P('M-8,-55 q4,5 8,0 q4,5 8,0', 'none', '#3b2430', 2) + El(-23, -60, 6, 4, '#ff9cb8', null, 0, 'opacity=".7"') + El(23, -60, 6, 4, '#ff9cb8', null, 0, 'opacity=".7"') + U.heart(44, -104, 7, c.a);
      } },
    { id: 'poster', n: 'ポスター', w: 126, h: 166, dc: 9,
      draw(c) {
        return RR(-58, -162, 116, 152, 4, c.M, c.ml) + Ci(-22, -112, 22, '#ffb347', '#d9782a', 2) + P('M-52,-106 q30,-14 60,-2', 'none', '#fff3a8', 4) + `<g transform="rotate(30 20 -70)">` + P('M20,-104 C32,-92 33,-70 30,-52 L10,-52 C7,-70 8,-92 20,-104Z', '#ffffff', '#8a90c8', 2) + Ci(20, -78, 6, '#8ed4ff', '#3a8fe8', 1.6) + P('M10,-58 l-8,10 l8,0Z M30,-58 l8,10 l-8,0Z', '#f2485c') + P('M14,-52 q6,16 12,0Z', '#ffd24a') + '</g>' +
          U.star(30, -134, 8, '#ffe680', '#ffe680', 1) + U.sparkle(-36, -50, 7, '#fff') + U.sparkle(40, -30, 5, '#fff') + Ci(-50, -154, 4, '#f2485c') + Ci(50, -154, 4, '#f2485c');
      } },
    { id: 'board', n: 'こくばん', w: 240, h: 158, dc: WOOD,
      draw(c) {
        return RR(-116, -156, 232, 136, 8, c.M, c.ml) + RR(-104, -144, 208, 112, 4, '#3f8a66') + P('M-84,-92 l12,-30 l12,30 M-80,-102 h16', 'none', '#fff', 4) + P('M-44,-122 v30 M-44,-122 q22,4 0,15 q26,4 0,15', 'none', '#ffe680', 4) + P('M22,-116 q-22,-6 -22,10 q0,16 22,10', 'none', '#ffc2d8', 4) +
          U.flower(66, -100, 18, '#fff', '#ffe680', 5) + P('M66,-82 v34', 'none', '#bfe6a8', 4) + P('M-80,-56 h60', 'none', '#fff', 3, 'opacity=".7" stroke-dasharray="6 6"') + RR(-110, -24, 220, 12, 5, c.M, c.ml) + RR(-60, -30, 22, 7, 2, '#fff') + RR(-30, -30, 18, 7, 2, '#ffc2d8') + RR(40, -34, 34, 12, 3, '#8a5a36', '#5a3a20', 1.6);
      } },
    { id: 'mirror', n: 'かがみ', w: 128, h: 208, dc: 4,
      draw(c) {
        return El(0, -100, 58, 96, c.M, c.ml, 3) + El(0, -100, 47, 85, GL) + P('M-26,-150 q8,-24 30,-30', 'none', '#fff', 8, 'opacity=".85"') + P('M-32,-110 q2,-14 8,-22', 'none', '#fff', 5, 'opacity=".7"') + U.bow(0, -196, 40, 22, c.a, c.al, { sw: 1.8 });
      } },
    { id: 'wshelf', n: 'かべのたな', w: 230, h: 118, dc: WOOD,
      draw(c) {
        return bothX(P('M-84,-12 v22 l22,-22Z', U.dark(c.m, 0.16), c.ml, 2)) + RR(-114, -26, 228, 16, 7, c.M, c.ml) +
          P('M-92,-26 L-88,-54 L-56,-54 L-52,-26Z', '#ffb25e', '#d9702a', 2) + El(-72, -66, 13, 20, LEAF, LEAFL, 2) + El(-86, -62, 7, 11, LEAF, LEAFL, 2) + U.flower(-72, -88, 6, '#ff9ec6', '#ffe27a') +
          RR(-30, -40, 60, 14, 2, '#8ed4ff', '#3a8fe8', 1.6) + RR(-26, -53, 52, 13, 2, '#ff9ec6', '#d9508a', 1.6) + RR(-22, -65, 46, 12, 2, '#ffe37a', '#e0a020', 1.6) +
          RR(48, -84, 46, 58, 5, '#ffffff', c.ml, 2.5) + U.heart(71, -55, 11, '#ff7fb0');
      } },
    { id: 'garland', n: 'ガーランド', w: 420, h: 104, rc: false,
      draw() {
        const fc = ['#ff9ec6', '#ffe37a', '#8ed4ff', '#c4a7ff', '#8de8cc'];
        let s = P('M-204,-96 Q0,-20 204,-96', 'none', '#e8a8c4', 3);
        for (let i = 0; i < 9; i++) { const t = (i + 0.5) / 9, x = -204 + 408 * t, y = -96 + 152 * t * (1 - t); s += P(`M${f(x - 17)},${f(y)} L${f(x + 17)},${f(y)} L${f(x)},${f(y + 34)}Z`, fc[i % 5], '#fff', 2.5); }
        return s;
      } },
    { id: 'lights', n: 'ほしのライト', w: 440, h: 96, rc: false, glow: [0, -50, 240, '#fff3b0'],
      draw() {
        let s = P('M-214,-90 Q-107,-30 0,-70 Q107,-30 214,-90', 'none', '#b9a8c8', 2.5);
        for (let i = 0; i < 10; i++) { const t = (i + 0.5) / 10, u = t < 0.5 ? t * 2 : (t - 0.5) * 2, x = -214 + 428 * t, y = (t < 0.5 ? -90 + 20 * u : -70 - 20 * u) + 80 * u * (1 - u); s += Ci(x, y + 14, 15, '#fff3a8', null, 0, 'opacity=".5"') + U.star(x, y + 14, 11, '#ffe680', '#f0b020', 1.6); }
        return s;
      } },
    { id: 'chandelier', n: 'シャンデリア', w: 210, h: 210, dc: 4, glow: [0, -90, 220, '#fff3b0'],
      draw(c) {
        const arm = P('M0,-110 C-30,-60 -70,-70 -84,-104', 'none', c.ml, 8) + P('M0,-110 C-30,-60 -70,-70 -84,-104', 'none', c.m, 4.5) + RR(-91, -132, 14, 30, 4, '#fff8ea', '#e0d0b0', 1.6) + P('M-84,-150 q-7,10 0,18 q7,-8 0,-18Z', '#ffb347') + El(-84, -100, 12, 5, c.M, c.ml, 2) + P('M-84,-94 v16', 'none', c.ml, 1.6) + P('M-84,-78 l-6,10 l6,10 l6,-10Z', GL, '#8fc8e8', 1.4);
        return P('M0,-210 v70', 'none', c.ml, 5) + P('M0,-210 v70', 'none', c.m, 2.5) + bothX(arm) + P('M0,-110 C-14,-80 -40,-84 -44,-106', 'none', c.ml, 7) + P('M0,-110 C14,-80 40,-84 44,-106', 'none', c.ml, 7) + bothX(P('M-44,-106 v-4', 'none', c.ml, 7) + RR(-50, -134, 12, 26, 4, '#fff8ea', '#e0d0b0', 1.6) + P('M-44,-150 q-6,9 0,16 q6,-7 0,-16Z', '#ffb347')) +
          El(0, -128, 22, 22, c.M, c.ml) + El(-6, -134, 6, 6, '#fff', null, 0, 'opacity=".6"') + P('M0,-106 v22', 'none', c.ml, 1.6) + P('M0,-84 l-9,14 l9,14 l9,-14Z', GL, '#8fc8e8', 1.6) + U.sparkle(26, -60, 5, '#fff');
      } },
    { id: 'moon', n: 'つきのライト', w: 124, h: 124, rc: false, glow: [0, -62, 150, '#fff7c2'],
      draw() {
        return P('M14,-118 A56,56 0 1 0 50,-30 A44,44 0 1 1 14,-118Z', '#ffe680', '#e0a820', 3) + El(-6, -60, 3.4, 4.6, '#7a4a20') + P('M-16,-44 q8,7 16,2', 'none', '#7a4a20', 2.6) + El(-20, -50, 5, 3, '#ff9c7a', null, 0, 'opacity=".7"') + U.star(36, -78, 12, '#fff', '#f0b020', 1.8) + U.sparkle(54, -112, 6, '#fff7c2');
      } },
  ]);

  /* ---------- ラグ ---------- */
  reg('rug', RUG, [
    { id: 'rug_round', n: 'まるいラグ', w: 440, h: 132, dc: 0,
      draw(c) { return El(0, -66, 218, 64, c.M, c.ml, 3) + El(0, -66, 194, 53, 'none', c.s, 5, 'stroke-dasharray="14 12"') + El(0, -66, 120, 30, U.light(c.m, 0.35)); } },
    { id: 'rug_heart', n: 'ハートのラグ', w: 380, h: 150, dc: 0,
      draw(c) { return `<g transform="translate(0,-82) scale(1,.48)">${U.heart(0, -10, 124, c.M, c.ml, 6)}${U.heart(0, -6, 84, U.light(c.m, 0.35))}${U.heart(0, -2, 40, c.s)}</g>`; } },
    { id: 'rug_star', n: 'ほしのラグ', w: 380, h: 160, dc: 4,
      draw(c) { return `<g transform="translate(0,-74) scale(1,.46)">${P(U.starPath(0, 0, 182, 100, 5, -90), c.M, c.ml, 6)}${P(U.starPath(0, 4, 110, 60, 5, -90), U.light(c.m, 0.4))}</g>`; } },
    { id: 'rug_rect', n: 'しかくいラグ', w: 470, h: 140, dc: 2,
      draw(c) {
        const D = 'M-196,-138 L196,-138 L232,-2 L-232,-2Z';
        return P(D, c.M, c.ml, 3) + clipG(`<path d="${D}"/>`, [-110, -76, -42].map((y, i) => R(-240, y, 480, 16 + i * 3, c.s, 'opacity=".8"')).join('')) + P(D, 'none', c.ml, 3);
      } },
    { id: 'rug_bear', n: 'くまのラグ', w: 330, h: 170, dc: WOOD,
      draw(c) {
        return bothX(El(-112, -34, 30, 18, c.M, c.ml, 3) + El(-104, -96, 26, 15, c.M, c.ml, 3)) + El(0, -62, 124, 54, c.M, c.ml, 3) + bothX(Ci(-40, -150, 15, c.M, c.ml, 3) + Ci(-40, -150, 7, c.s)) + El(0, -128, 52, 32, c.M, c.ml, 3) +
          El(0, -118, 20, 12, c.s) + El(-18, -134, 4, 5, '#3b2430') + El(18, -134, 4, 5, '#3b2430') + P('M-5,-122 h10 l-5,5Z', '#5a3a2a') + El(0, -56, 60, 26, U.light(c.m, 0.3));
      } },
  ]);

  /* ---------- あかり ---------- */
  reg('light', BIG, [
    { id: 'flamp', n: 'フロアランプ', w: 116, h: 304, dc: 4, tap: 'lamp', glow: [0, -256, 210, '#fff3b0'],
      draw(c, it) {
        const D = 'M-46,-222 L46,-222 L30,-300 L-30,-300Z';
        return El(0, -7, 40, 9, c.a, c.al) + P('M0,-12 V-224', 'none', c.al, 9) + P('M0,-12 V-224', 'none', c.a, 5) + P(D, it.on === 0 ? U.dark(c.m, 0.12) : c.M, c.ml) + P('M-44,-234 h88', 'none', c.s, 5) + P('M26,-222 v26', 'none', c.al, 2) + Ci(26, -192, 4, GOLD, GOLDL, 1.2);
      } },
  ]);
  reg('light', SMALL, [
    { id: 'tlamp', n: 'テーブルランプ', w: 76, h: 104, dc: 0, tap: 'lamp', glow: [0, -74, 120, '#fff3b0'],
      draw(c, it) { return El(0, -6, 22, 7, c.a, c.al, 2) + RR(-6, -50, 12, 46, 5, c.a, c.al, 2) + P('M-34,-48 L34,-48 L22,-102 L-22,-102Z', it.on === 0 ? U.dark(c.m, 0.12) : c.M, c.ml) + P('M-32,-58 h64', 'none', c.s, 4); } },
    { id: 'candle', n: 'キャンドル', w: 54, h: 92, rc: false, tap: 'lamp', glow: [0, -74, 90, '#ffd27a'],
      draw(c, it) { return El(0, -5, 24, 6, GOLD, GOLDL, 2) + RR(-11, -54, 22, 50, 5, '#fff8ea', '#e0d0b0', 2) + P('M0,-54 v-8', 'none', '#5a3a2a', 2) + (it.on === 0 ? '' : P('M0,-90 q-11,14 0,28 q11,-12 0,-28Z', '#ffb347', '#ff7a2c', 1.6) + P('M0,-80 q-5,8 0,16 q5,-7 0,-16Z', '#fff3a8')); } },
    { id: 'lantern', n: 'ランタン', w: 76, h: 118, dc: 5, tap: 'lamp', glow: [0, -52, 120, '#ffd27a'],
      draw(c, it) {
        return P('M-16,-100 Q0,-124 16,-100', 'none', c.al, 4) + RR(-22, -104, 44, 12, 5, c.M, c.ml, 2) + RR(-26, -92, 52, 76, 10, it.on === 0 ? '#e8ecf4' : '#fff3b0', c.ml, 2.5) + P('M-9,-92 v76 M9,-92 v76', 'none', c.ml, 2) + (it.on === 0 ? '' : P('M0,-66 q-8,10 0,22 q8,-10 0,-22Z', '#ffb347')) + RR(-30, -18, 60, 14, 6, c.M, c.ml, 2);
      } },
  ]);

  /* ---------- しょくぶつ ---------- */
  const pot = (w, h, c) => P(`M${-w / 2},${-h} L${w / 2},${-h} L${w * 0.36},0 L${-w * 0.36},0Z`, c.M, c.ml) + RR(-w / 2 - 5, -h - 9, w + 10, 16, 7, c.M, c.ml);
  const leaf = (x, y, rot, l, w) => `<g transform="translate(${x},${y}) rotate(${rot})">${P(`M0,0 C${-w},${-l * 0.3} ${-w},${-l * 0.8} 0,${-l} C${w},${-l * 0.8} ${w},${-l * 0.3} 0,0Z`, LEAF, LEAFL, 2.2)}${P(`M0,-4 V${-l + 6}`, 'none', LEAFL, 1.6, 'opacity=".6"')}</g>`;
  reg('plant', BIG, [
    { id: 'monstera', n: 'かんようしょくぶつ', w: 150, h: 236, dc: 6,
      draw(c) {
        return P('M0,-70 C-10,-110 -30,-130 -44,-150 M0,-70 C6,-120 2,-150 0,-176 M0,-70 C14,-104 34,-124 48,-140', 'none', LEAFL, 5) + leaf(-44, -144, -34, 70, 32) + leaf(48, -134, 36, 66, 30) + leaf(0, -168, 0, 68, 34) + leaf(-18, -96, -68, 52, 24) + leaf(20, -92, 70, 50, 22) + pot(74, 64, c) + P('M-26,-50 q26,8 52,0', 'none', c.s, 4, 'opacity=".8"');
      } },
    { id: 'tree', n: 'ちいさな き', w: 170, h: 306, dc: WOOD,
      draw(c) {
        return P('M0,-60 C-4,-110 4,-150 0,-190', 'none', '#8a5a36', 16) + P('M0,-60 C-4,-110 4,-150 0,-190', 'none', '#b07a4a', 10) + P(A.fluffy(0, -220, 64, 10), LEAF, LEAFL, 3) + P(A.fluffy(-34, -190, 34, 8), '#8fdc9a') + P(A.fluffy(30, -244, 30, 8), '#8fdc9a') +
          Ci(-30, -230, 9, '#f2485c', '#b8182e', 1.6) + Ci(24, -196, 9, '#f2485c', '#b8182e', 1.6) + Ci(8, -262, 8, '#f2485c', '#b8182e', 1.6) + pot(80, 60, c);
      } },
    { id: 'xtree', n: 'クリスマスツリー', w: 200, h: 318, rc: false, glow: [0, -170, 200, '#fff3b0'],
      draw() {
        const g1 = '#3fae6a', gl = '#2a8050', orn = ['#f2485c', '#ffd24a', '#8ed4ff', '#ff9ec6', '#ffffff'];
        let s = R(-12, -50, 24, 34, '#8a5a36', 'stroke="#5a3a20" stroke-width="2"') + P('M-34,-20 L34,-20 L28,0 L-28,0Z', '#f2485c', '#b8182e') + P('M-92,-48 L0,-150 L92,-48Z', g1, gl) + P('M-76,-118 L0,-212 L76,-118Z', g1, gl) + P('M-56,-186 L0,-270 L56,-186Z', g1, gl);
        [[-50, -66], [-10, -80], [34, -62], [62, -58], [-40, -134], [8, -146], [40, -130], [-22, -200], [18, -206], [0, -104]].forEach((p, i) => { s += Ci(p[0], p[1], 7, orn[i % 5], U.dark(orn[i % 5], 0.3), 1.4); });
        return s + P('M-70,-70 Q0,-40 70,-70 M-54,-138 Q0,-112 54,-138', 'none', '#ffe680', 3, 'stroke-dasharray="3 7" stroke-linecap="round"') + U.star(0, -284, 20, '#ffe680', '#e0a020', 2.5);
      } },
  ]);
  reg('plant', SMALL, [
    { id: 'cactus', n: 'サボテン', w: 84, h: 126, dc: 8,
      draw(c) {
        return P('M-22,-70 C-36,-70 -36,-92 -24,-92 M22,-78 C36,-78 36,-100 24,-100', 'none', LEAFL, 17) + P('M-22,-70 C-36,-70 -36,-92 -24,-92 M22,-78 C36,-78 36,-100 24,-100', 'none', LEAF, 12) + RR(-17, -112, 34, 78, 17, LEAF, LEAFL) +
          P('M-6,-100 v52 M6,-100 v52', 'none', LEAFL, 1.6, 'opacity=".5"') + U.flower(0, -116, 9, '#ff9ec6', '#ffe27a') + pot(50, 40, c);
      } },
    { id: 'vase', n: 'かびんの おはな', w: 96, h: 156, dc: 2,
      draw(c) {
        return P('M0,-70 C-8,-96 -18,-108 -24,-124 M0,-70 C0,-100 2,-116 2,-136 M0,-70 C8,-92 18,-102 26,-114', 'none', LEAFL, 4) + U.flower(-24, -128, 15, '#ff9ec6', '#ffe27a') + U.flower(2, -142, 16, '#fff3a8', '#ffb347') + U.flower(28, -118, 14, '#c7a4ff', '#ffe27a') +
          P('M-14,-70 C-30,-50 -30,-14 -16,0 L16,0 C30,-14 30,-50 14,-70Z', c.M, c.ml) + RR(-17, -78, 34, 12, 5, c.M, c.ml) + P('M-16,-48 q-6,20 0,36', 'none', '#fff', 5, 'opacity=".5"');
      } },
    { id: 'tulip', n: 'チューリップ', w: 124, h: 118, dc: 0,
      draw(c) {
        const tu = (x, col) => P(`M${x},-34 V-70`, 'none', LEAFL, 4) + P(`M${x},-44 q-14,-4 -14,-20 q12,4 14,20Z M${x},-40 q14,-4 14,-20 q-12,4 -14,20Z`, LEAF, LEAFL, 1.4) + P(`M${x - 13},-100 l6,10 l7,-12 l7,12 l6,-10 q4,30 -13,32 q-17,-2 -13,-32Z`, col, U.dark(col, 0.3), 1.8);
        return tu(-34, '#ff7fa8') + tu(0, '#ffd24a') + tu(34, '#c79cff') + RR(-58, -38, 116, 36, 8, c.M, c.ml) + P('M-48,-22 h96', 'none', c.s, 4, 'opacity=".8"');
      } },
  ]);

  A._hBIG = BIG; A._hSMALL = SMALL;
})(window);
