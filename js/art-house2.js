/* きらきら☆おしゃれスタジオ — おへやづくり：おもちゃ・ざっか・たべもの・なかま と へやの くみたて */
(function (g) {
  'use strict';
  const U = g.U, A = g.Art, P = U.P, f = U.f, K = A._hk;
  const R = K.R, RR = K.RR, Ci = K.Ci, El = K.El, bothX = K.bothX, clipG = K.clipG, cloud = K.cloud, glow = K.glow, reg = K.reg;
  const WD = K.WD, WDL = K.WDL, GOLD = K.GOLD, GOLDL = K.GOLDL, GL = K.GL, LEAF = K.LEAF, LEAFL = K.LEAFL, WOOD = K.WOOD, FLY = K.FLY;
  const BIG = A._hBIG, SMALL = A._hSMALL;
  const TX = (t, x, y, sz, fill) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${sz}" font-weight="bold" fill="${fill}" font-family="'Arial Black','Segoe UI',sans-serif">${t}</text>`;
  const EYE = '#3b2430';
  const wheel = (x, y, r) => Ci(x, y, r, '#5a5278', '#2e2a44') + Ci(x, y, r * 0.4, '#d8dce8');

  /* ---------- おもちゃ（ちいさい） ---------- */
  reg('toy', SMALL, [
    { id: 'teddy', n: 'くまの ぬいぐるみ', w: 120, h: 138, dc: 5, tap: 'pet',
      draw(c) {
        const b = '#d09a68', l = '#8a5a36', cr = '#f5dcbc';
        return bothX(El(-34, -14, 20, 13, b, l) + El(-36, -12, 9, 6, cr)) + El(0, -42, 34, 36, b, l) + El(0, -38, 18, 21, cr) + bothX(`<g transform="rotate(24 -37 -54)">${El(-37, -54, 12, 19, b, l)}</g>`) +
          bothX(Ci(-28, -118, 13, b, l) + Ci(-28, -118, 6, cr)) + El(0, -98, 36, 31, b, l) + El(0, -88, 14, 10, cr) + El(-13, -102, 3.6, 4.6, EYE) + El(13, -102, 3.6, 4.6, EYE) + P('M-4,-92 h8 l-4,4Z', '#5a3a2a') + P('M-6,-84 q3,3.6 6,0 q3,3.6 6,0', 'none', EYE, 1.7) +
          bothX(El(-22, -90, 5.5, 3.4, '#ff9c9c', null, 0, 'opacity=".7"')) + U.bow(0, -68, 30, 17, c.a, c.al, { sw: 1.6 });
      } },
    { id: 'bunnyplush', n: 'うさぎの ぬいぐるみ', w: 108, h: 164, dc: 1, tap: 'pet',
      draw(c) {
        const b = '#ffffff', l = '#dcc0d0';
        return bothX(El(-30, -13, 19, 12, b, l)) + El(0, -40, 31, 34, b, l) + bothX(`<g transform="rotate(22 -34 -52)">${El(-34, -52, 11, 18, b, l)}</g>`) + bothX(`<g transform="rotate(-10 -18 -110)">${El(-18, -134, 11, 30, b, l)}${El(-18, -132, 5, 21, '#ffc2d8')}</g>`) +
          El(0, -92, 33, 28, b, l) + El(-12, -95, 3.6, 4.6, EYE) + El(12, -95, 3.6, 4.6, EYE) + P('M-3.5,-87 h7 l-3.5,4Z', '#ff8fb0') + P('M-6,-80 q3,3.6 6,0 q3,3.6 6,0', 'none', EYE, 1.7) + bothX(El(-21, -84, 5.5, 3.4, '#ff9cb8', null, 0, 'opacity=".7"')) +
          U.bow(0, -64, 30, 17, c.a, c.al, { sw: 1.6 });
      } },
    { id: 'blocks', n: 'つみき', w: 140, h: 116, rc: false,
      draw() {
        return RR(-66, -48, 48, 48, 7, '#ff9ec6', '#d9508a') + TX('A', -42, -13, 30, '#fff') + RR(-14, -48, 48, 48, 7, '#8ed4ff', '#3a8fe8') + TX('B', 10, -13, 30, '#fff') + RR(-40, -96, 48, 48, 7, '#ffe37a', '#e0a020') + TX('C', -16, -61, 30, '#fff') +
          P('M38,-2 L62,-48 L86,-2Z', '#8de8cc', '#27b592') + U.star(62, -18, 7, '#fff', '#fff', 1);
      } },
    { id: 'ball', n: 'ボール', w: 78, h: 78, dc: 5,
      draw(c) {
        return Ci(0, -37, 35, c.M, c.ml) + clipG('<circle cx="0" cy="-37" r="35"/>', P('M-40,-50 Q0,-70 40,-50 L40,-26 Q0,-46 -40,-26Z', c.s) + P('M-40,-18 Q0,-38 40,-18', 'none', c.a, 5)) + Ci(0, -37, 35, 'none', c.ml) + U.star(0, -50, 8, c.a, c.al, 1.2) + P('M-22,-56 q6,-10 16,-13', 'none', '#fff', 5, 'opacity=".7"');
      } },
    { id: 'soccerball', n: 'サッカーボール', w: 76, h: 76, rc: false, draw: () => A.soccerBall(0, -36, 34) },
    { id: 'robot', n: 'ロボット', w: 104, h: 146, dc: 2,
      draw(c) {
        const l = c.ml;
        return P('M0,-116 v-16', 'none', l, 3) + Ci(0, -134, 6, '#f2485c', '#b8182e', 1.6) + bothX(RR(-44, -62, 13, 30, 6, c.M, l, 2) + RR(-24, -14, 18, 14, 5, c.M, l, 2)) + RR(-29, -70, 58, 54, 11, c.M, l) + RR(-17, -60, 34, 20, 4, '#8ee6ff', '#3a9cc8', 1.6) + P('M-11,-50 l5,-5 l6,8 l5,-6 l5,3', 'none', '#fff', 1.8) +
          Ci(-10, -29, 3.4, '#ffd24a') + Ci(0, -29, 3.4, '#ff7fb2') + Ci(10, -29, 3.4, '#8de8cc') + RR(-36, -120, 72, 54, 15, c.M, l) + bothX(RR(-44, -102, 9, 18, 3, c.a, c.al, 1.4) + Ci(-15, -96, 9, '#fff', l, 1.8) + Ci(-15, -96, 5, '#3ab8e8') + Ci(-16.5, -97.5, 1.6, '#fff')) + P('M-10,-79 q10,7 20,0', 'none', l, 2.4);
      } },
    { id: 'dinotoy', n: 'きょうりゅう', w: 164, h: 136, dc: 3,
      draw(c) {
        return P('M38,-56 C70,-62 84,-32 78,-6 C64,-30 52,-36 36,-36Z', c.M, c.ml) + RR(-28, -30, 20, 30, 8, c.M, c.ml) + RR(12, -30, 20, 30, 8, c.M, c.ml) + P('M-14,-80 l8,-17 l8,15 l8,-18 l8,18 l8,-14 l7,16Z', c.a, c.al, 1.8) + El(4, -54, 50, 34, c.M, c.ml) + El(4, -42, 30, 17, c.s) +
          P('M-30,-62 C-42,-100 -40,-126 -62,-126 C-82,-126 -86,-106 -72,-99 C-62,-94 -58,-80 -50,-46Z', c.M, c.ml) + Ci(-66, -112, 3.2, EYE) + Ci(-67, -113, 1.1, '#fff') + P('M-80,-104 q6,5 12,2', 'none', c.ml, 2) + El(-58, -104, 5, 3, '#ff9cb8', null, 0, 'opacity=".7"');
      } },
    { id: 'train', n: 'でんしゃ', w: 284, h: 104, dc: 5,
      draw(c) {
        return P('M-50,-26 h14 M40,-26 h14', 'none', '#5a5278', 5) + Ci(-114, -98, 9, '#fff', '#d8dce8', 1.6) + Ci(-100, -110, 6, '#fff', '#d8dce8', 1.4) + RR(-124, -88, 20, 28, 3, c.a, c.al, 2) + RR(-90, -94, 46, 44, 7, c.M, c.ml) + RR(-82, -86, 30, 22, 4, GL, '#5fa8d8', 1.6) +
          RR(-136, -64, 92, 50, 9, c.M, c.ml) + P('M-128,-40 h76', 'none', c.s, 4) + wheel(-116, -13, 13) + wheel(-66, -13, 13) + RR(-36, -56, 78, 42, 8, c.s, c.sl) + RR(-26, -74, 22, 22, 4, '#8ed4ff', '#3a8fe8', 1.6) + RR(0, -72, 20, 20, 4, '#ffe37a', '#e0a020', 1.6) + wheel(-18, -13, 11) + wheel(24, -13, 11) +
          RR(54, -56, 78, 42, 8, c.a, c.al) + U.star(93, -35, 11, '#fff', '#fff', 1) + wheel(72, -13, 11) + wheel(114, -13, 11);
      } },
    { id: 'car', n: 'ミニカー', w: 138, h: 78, dc: 5,
      draw(c) {
        return P('M-64,-18 C-64,-40 -52,-42 -42,-42 L-26,-68 L28,-68 L46,-42 C60,-42 66,-36 66,-18Z', c.M, c.ml) + P('M-20,-61 L-32,-42 L0,-42 L0,-61Z', GL, '#5fa8d8', 1.6) + P('M7,-61 L7,-42 L38,-42 L25,-61Z', GL, '#5fa8d8', 1.6) + P('M-58,-30 h118', 'none', c.s, 4) + Ci(61, -30, 4.5, '#fff3a8', GOLDL, 1.2) + wheel(-36, -14, 14) + wheel(38, -14, 14);
      } },
    { id: 'drum', n: 'たいこ', w: 112, h: 104, dc: 5, tap: 'drum',
      draw(c) {
        return P('M-30,-70 L-50,-100 M30,-70 L52,-98', 'none', WDL, 7) + P('M-30,-70 L-50,-100 M30,-70 L52,-98', 'none', WD, 4) + Ci(-52, -102, 6, '#fff3dc', WDL, 1.6) + Ci(54, -100, 6, '#fff3dc', WDL, 1.6) + P('M-44,-62 V-14 a44,12 0 0 0 88,0 V-62Z', c.M, c.ml) +
          P('M-44,-46 l14,28 l15,-28 l15,28 l15,-28 l15,28 l14,-28', 'none', c.s, 3) + P('M-44,-20 a44,12 0 0 0 88,0', 'none', GOLD, 5) + El(0, -62, 44, 12, '#fff8ea', GOLDL, 3);
      } },
  ]);
  /* ---------- おもちゃ（おおきい） ---------- */
  reg('toy', BIG, [
    { id: 'dollhouse', n: 'ドールハウス', w: 224, h: 250, dc: 0,
      draw(c) {
        const win = (x, y, w, h) => RR(x, y, w, h, 6, '#fff3b0', c.al, 2.2) + P(`M${x + w / 2},${y} v${h} M${x},${y + h / 2} h${w}`, 'none', c.al, 2);
        return RR(50, -232, 24, 50, 3, c.a, c.al) + RR(-96, -154, 192, 154, 6, c.M, c.ml) + P('M-96,-78 h192', 'none', c.ml, 2, 'opacity=".5"') + P('M-112,-150 L0,-244 L112,-150Z', c.a, c.al) + U.heart(0, -186, 14, c.s, c.sl, 1.6) + win(-76, -138, 44, 44) + win(32, -138, 44, 44) + win(-78, -60, 40, 36) + win(38, -60, 40, 36) +
          P('M-20,0 V-52 a20,20 0 0 1 40,0 V0Z', c.a, c.al) + Ci(11, -28, 3.6, GOLD, GOLDL, 1.2) + bothX(P('M-112,-150 l-8,0', 'none', c.al, 3));
      } },
    { id: 'horse', n: 'もくば', w: 212, h: 180, dc: WOOD,
      draw(c) {
        return P('M-98,-24 Q0,16 98,-24', 'none', WDL, 15) + P('M-98,-24 Q0,16 98,-24', 'none', WD, 9) + P('M-48,-70 L-62,-14 M44,-70 L60,-14', 'none', c.ml, 17) + P('M-48,-70 L-62,-14 M44,-70 L60,-14', 'none', c.m, 12) + P('M56,-92 C82,-92 86,-60 76,-42 C72,-62 62,-70 50,-74Z', c.a, c.al, 2) +
          El(0, -86, 60, 31, c.M, c.ml) + P('M-36,-100 C-48,-132 -54,-152 -74,-152 C-98,-152 -106,-130 -98,-118 C-90,-108 -70,-112 -64,-104 C-58,-94 -52,-78 -42,-72Z', c.M, c.ml) + P('M-42,-104 C-38,-132 -46,-152 -66,-162 C-56,-142 -60,-122 -52,-98Z', c.a, c.al, 2) + P('M-80,-150 l-2,-17 l13,10Z', c.M, c.ml, 2) +
          Ci(-84, -134, 3.4, EYE) + El(-76, -124, 5, 3, '#ff9cb8', null, 0, 'opacity=".7"') + P('M-22,-114 Q0,-124 22,-114 L18,-90 Q0,-84 -18,-90Z', c.s, c.sl, 2) + P('M-96,-124 L-60,-134', 'none', c.al, 3);
      } },
    { id: 'tent', n: 'テント', w: 252, h: 262, dc: 4,
      draw(c) {
        const D = 'M0,-240 L116,0 L-116,0Z';
        return P('M-12,-262 L10,-226 M12,-262 L-10,-226', 'none', WDL, 6) + P(D, c.M, c.ml) + clipG(`<path d="${D}"/>`, P('M-130,-60 h260', 'none', c.s, 10) + P('M-130,-110 h260', 'none', c.a, 5) + [-84, -56, 56, 84].map((x) => U.star(x, -30, 8, c.s, c.s, 1)).join('')) + P(D, 'none', c.ml) +
          P('M0,-156 L46,0 L-46,0Z', U.dark(c.m, 0.4)) + P('M0,-156 L-46,0 L-18,0 C-14,-60 -6,-110 0,-156Z', c.s, c.sl, 2) + P('M0,-156 L46,0 L18,0 C14,-60 6,-110 0,-156Z', c.s, c.sl, 2) + U.star(0, -190, 11, c.a, c.al, 1.6);
      } },
    { id: 'slide', n: 'すべりだい', w: 324, h: 244, dc: 5,
      draw(c) {
        const mt = '#8a90a8', ml = '#d8dce8';
        return P('M-134,0 L-118,-196 M-92,0 L-86,-196', 'none', mt, 10) + P('M-134,0 L-118,-196 M-92,0 L-86,-196', 'none', ml, 5) + [-40, -80, -120, -160].map((y) => P(`M${f(-131 + (-y) * 0.082)},${y} L${f(-91 + (-y) * 0.03)},${y}`, 'none', mt, 6)).join('') + P('M-68,-184 V0', 'none', mt, 10) + P('M-68,-184 V0', 'none', ml, 5) +
          P('M-124,-200 v-38 h56 v38', 'none', c.al, 7) + P('M-124,-200 v-38 h56 v38', 'none', c.a, 3.5) + P('M-72,-200 C0,-194 62,-44 156,-26 L156,-6 C52,-22 -8,-172 -72,-178Z', c.M, c.ml) + P('M-60,-190 C0,-180 60,-50 150,-22', 'none', '#fff', 5, 'opacity=".45"') + RR(-130, -204, 64, 16, 6, c.a, c.al);
      } },
    { id: 'easel', n: 'おえかきボード', w: 152, h: 220, dc: WOOD,
      draw(c) {
        const L = 'M-52,0 L-20,-206 M52,0 L20,-206 M0,-8 V-206';
        return P(L, 'none', c.ml, 10) + P(L, 'none', c.m, 6) + RR(-60, -194, 120, 126, 4, '#ffffff', '#c9cfe0') + ['#ff8fa8', '#ffc46b', '#fff07a', '#8fe6a8', '#8fc8ff'].map((col, i) => `<path d="M${-36 + i * 6},-100 a${36 - i * 6},${36 - i * 6} 0 0 1 ${72 - i * 12},0" fill="none" stroke="${col}" stroke-width="6"/>`).join('') +
          Ci(36, -166, 12, '#ffd24a', '#e0a020', 2) + U.heart(-30, -164, 9, '#ff7fb0') + cloud(-34, -98, 0.26, '#fff', 1) + cloud(34, -98, 0.26, '#fff', 1) + RR(-66, -70, 132, 12, 5, c.M, c.ml) + RR(-40, -78, 26, 8, 3, '#f2485c') + RR(-8, -78, 26, 8, 3, '#3a8fe8') + RR(24, -78, 22, 8, 3, '#ffd24a');
      } },
  ]);

  /* ---------- ざっか ---------- */
  reg('goods', SMALL, [
    { id: 'books', n: 'ほん', w: 110, h: 78, rc: false,
      draw() {
        const bk = (x, y, w, col) => RR(x, y, w, 22, 3, col, U.dark(col, 0.3)) + R(x + w - 12, y + 4, 8, 14, '#fff8ea') + P(`M${x + 10},${y + 2} v18`, 'none', '#fff', 2, 'opacity=".6"');
        return bk(-50, -24, 100, '#8ed4ff') + bk(-44, -47, 90, '#ff9ec6') + `<g transform="rotate(-6 0 -58)">${bk(-42, -70, 84, '#ffe37a')}</g>`;
      } },
    { id: 'randsel', n: 'ランドセル', w: 116, h: 130, dc: 5,
      draw(c) {
        return P('M-16,-114 q16,-20 32,0', 'none', c.ml, 7) + RR(-50, -116, 100, 114, 24, c.M, c.ml) + P('M-50,-62 Q0,-34 50,-62 V-92 Q50,-116 26,-116 H-26 Q-50,-116 -50,-92Z', U.light(c.m, 0.2), c.ml) + RR(-10, -60, 20, 24, 5, GOLD, GOLDL, 2) + P('M-34,-104 q10,-6 24,-6', 'none', '#fff', 5, 'opacity=".5"') + bothX(RR(-58, -70, 10, 40, 5, U.dark(c.m, 0.1), c.ml, 2));
      } },
    { id: 'globe', n: 'ちきゅうぎ', w: 100, h: 132, rc: false,
      draw() {
        return El(0, -7, 32, 8, '#a8744a', '#6a4424') + R(-4, -30, 8, 24, '#a8744a', 'stroke="#6a4424" stroke-width="2"') + P('M-34,-96 A42,42 0 0 0 26,-38', 'none', GOLDL, 6) + P('M-34,-96 A42,42 0 0 0 26,-38', 'none', GOLD, 3) + Ci(0, -76, 38, '#7fc8f5', '#3a8fc8') +
          clipG('<circle cx="0" cy="-76" r="38"/>', P('M-30,-98 q14,-12 28,-4 q6,12 -6,20 q-14,6 -22,-16Z M4,-70 q16,-8 26,4 q2,16 -12,22 q-14,-6 -14,-26Z M-34,-62 q10,2 12,14 q-6,8 -14,4Z', '#8fdc9a', '#4fae62', 1.6)) + P('M-22,-98 q8,-10 20,-12', 'none', '#fff', 5, 'opacity=".6"');
      } },
    { id: 'fishbowl', n: 'きんぎょばち', w: 118, h: 116, rc: false, tap: 'pet',
      draw() {
        const B = 'M-34,-98 C-62,-86 -62,-14 -30,-2 L30,-2 C62,-14 62,-86 34,-98Z';
        return P(B, '#eaf8ff', '#9fc4e8', 3, 'fill-opacity=".7"') + clipG(`<path d="${B}"/>`, R(-70, -76, 140, 80, '#9fdcff', 'opacity=".85"') + P('M-34,-4 C-40,-30 -28,-40 -34,-56 M-24,-4 C-20,-24 -30,-34 -24,-48', 'none', LEAF, 5) + El(0, -6, 44, 7, '#f9e2ae') +
          P('M24,-44 l16,-11 l-2,11 l2,11Z', '#ff8a70', '#d9503a', 1.4) + El(8, -44, 19, 13, '#ff6f5c', '#d9503a', 1.6) + Ci(-1, -47, 3.4, '#fff') + Ci(-1.6, -47, 1.6, EYE) + Ci(-22, -64, 3, 'none', '#fff', 1.6) + Ci(-14, -76, 2, 'none', '#fff', 1.4)) +
          P('M-70,-76 h140', 'none', '#fff', 0) + RR(-38, -106, 76, 12, 6, '#eaf8ff', '#9fc4e8', 3) + P('M-44,-74 q-6,26 4,50', 'none', '#fff', 5, 'opacity=".7"');
      } },
    { id: 'cushion', n: 'クッション', w: 118, h: 88, dc: 0,
      draw(c) { return RR(-54, -80, 108, 78, 26, c.M, c.ml) + U.heart(0, -42, 18, c.s, c.sl, 1.6) + bothX(Ci(-52, -76, 6, c.a, c.al, 1.4) + Ci(-52, -6, 6, c.a, c.al, 1.4)); } },
    { id: 'musicbox', n: 'オルゴール', w: 116, h: 122, dc: 1, tap: 'music',
      draw(c) {
        return P('M-46,-46 L-38,-108 L38,-108 L46,-46Z', U.light(c.m, 0.3), c.ml) + P('M-36,-52 L-30,-100 L30,-100 L36,-52Z', GL) + P('M0,-50 v-22', 'none', GOLDL, 3) + U.star(0, -80, 13, GOLD, GOLDL, 1.8) + RR(-50, -48, 100, 46, 9, c.M, c.ml) + P('M-50,-30 h100', 'none', c.s, 4) + U.heart(0, -16, 8, c.a, c.al, 1.2) +
          P('M50,-26 h12 v-12', 'none', GOLDL, 4) + Ci(62, -40, 5, GOLD, GOLDL, 1.4) + Ci(-36, -116, 4, '#c4a7ff') + P('M-32,-116 v-12 l8,3', 'none', '#c4a7ff', 2.4) + Ci(40, -112, 3.6, '#ff9ec6') + P('M43.6,-112 v-11', 'none', '#ff9ec6', 2.2);
      } },
    { id: 'gifts', n: 'プレゼント', w: 164, h: 130, rc: false,
      draw() {
        const gift = (x, y, w, h, col, rb) => RR(x, y, w, h, 5, col, U.dark(col, 0.3)) + R(x + w / 2 - 6, y, 12, h, rb) + R(x, y + h / 2 - 5, w, 10, rb) + U.bow(x + w / 2, y - 5, 34, 18, rb, U.dark(rb, 0.3), { sw: 1.6 });
        return gift(-76, -68, 70, 66, '#c4a7ff', '#ffe37a') + gift(8, -54, 66, 52, '#8ed4ff', '#ff9ec6') + gift(-34, -112, 54, 44, '#ff9ec6', '#ffffff') + U.sparkle(60, -92, 8, '#fff7c2');
      } },
    { id: 'photo', n: 'しゃしんたて', w: 82, h: 96, dc: 0,
      draw(c) {
        return P('M20,-10 l14,10', 'none', c.ml, 6) + RR(-34, -90, 68, 84, 9, c.M, c.ml) + RR(-24, -80, 48, 56, 4, '#fff6dc') + Ci(-9, -52, 9, '#fdd9c0', '#c08a80', 1.4) + Ci(10, -50, 9, '#fdd9c0', '#c08a80', 1.4) + P('M-19,-56 q10,-14 20,-2', 'none', '#8e5c38', 6) + P('M1,-56 q9,-10 18,0', 'none', '#5e3d2c', 6) + U.heart(0, -14, 5, c.s);
      } },
    { id: 'piggy', n: 'ぶたの ちょきんばこ', w: 104, h: 92, rc: false,
      draw() {
        const c = '#ffc2d4', l = '#e08aa8';
        return RR(-28, -16, 13, 16, 5, c, l, 2) + RR(16, -16, 13, 16, 5, c, l, 2) + P('M42,-48 q14,-4 12,-16 q-10,-2 -8,8', 'none', l, 3) + El(0, -44, 44, 33, c, l) + P('M-30,-68 l-4,-18 l18,10Z', c, l, 2) + P('M2,-74 l2,-17 l14,12Z', c, l, 2) + El(-34, -42, 11, 9, '#ff9cb8', l, 2) + Ci(-38, -42, 1.8, l) + Ci(-31, -42, 1.8, l) +
          Ci(-16, -56, 3.2, EYE) + El(-10, -40, 6, 3.6, '#ff8fae', null, 0, 'opacity=".7"') + RR(2, -80, 22, 5, 2.5, l) + Ci(22, -92, 9, GOLD, GOLDL, 1.8);
      } },
  ]);
  reg('goods', BIG, [
    { id: 'birdcage', n: 'とりかご', w: 124, h: 226, dc: 4, tap: 'pet',
      draw(c) {
        const D = 'M-12,-116 C-12,-178 52,-178 52,-116 L52,-62 L-12,-62Z';
        return El(-36, -7, 28, 8, c.M, c.ml) + P('M-36,-8 V-204 Q-36,-218 -22,-218 H20 V-196', 'none', c.ml, 8) + P('M-36,-8 V-204 Q-36,-218 -22,-218 H20 V-196', 'none', c.m, 4.5) + Ci(20, -188, 7, 'none', c.ml, 3) + P(D, '#ffffff', c.ml, 2.5, 'fill-opacity=".45"') +
          P('M4,-166 V-62 M20,-178 V-62 M36,-166 V-62 M-12,-116 h64', 'none', c.ml, 2) + P('M4,-84 h32', 'none', WDL, 4) + El(20, -96, 14, 12, '#ffe680', '#dba82c', 2) + Ci(16, -100, 2, EYE) + P('M8,-96 l-7,3 l7,3Z', '#ff9a3c') + P('M30,-94 q8,2 10,10 q-8,0 -10,-10Z', '#ffd24a', '#dba82c', 1.4) + RR(-16, -64, 72, 13, 5, c.M, c.ml);
      } },
  ]);
  reg('goods', { layer: 'top' }, [
    { id: 'balloons', n: 'ふうせん', w: 144, h: 276, rc: false,
      draw() {
        const bl = (x, y, col) => P(`M${x - 5},${y + 44} L${x + 5},${y + 44} L${x},${y + 37}Z`, col, U.dark(col, 0.3), 1.4) + El(x, y, 35, 43, col, U.dark(col, 0.3)) + P(`M${x - 20},${y - 14} q4,-14 16,-18`, 'none', '#fff', 5, 'opacity=".7"');
        return P('M0,-8 C-10,-60 -30,-104 -38,-144 M0,-8 C0,-76 6,-130 8,-176 M0,-8 C12,-56 36,-96 44,-134', 'none', '#b8a8c0', 2.2) + bl(-38, -188, '#ff7fa8') + bl(44, -178, '#ffe37a') + bl(8, -222, '#8ed4ff') + RR(-11, -14, 22, 14, 5, '#c4a7ff', '#8a5cf0', 2);
      } },
  ]);

  /* ---------- たべもの ---------- */
  const plate = (w) => El(0, -6, w, 9, '#ffffff', '#d8c8e0', 2.2) + El(0, -7, w * 0.7, 5, '#f3ecf6');
  reg('food', SMALL, [
    { id: 'cake', n: 'ケーキ', w: 128, h: 122, rc: false,
      draw() {
        const sb = (x, y) => P(`M${x - 9},${y - 4} C${x - 9},${y - 14} ${x + 9},${y - 14} ${x + 9},${y - 4} C${x + 9},${y + 6} ${x + 3},${y + 10} ${x},${y + 12} C${x - 3},${y + 10} ${x - 9},${y + 6} ${x - 9},${y - 4}Z`, '#f2485c', '#b8182e', 1.6) + P(`M${x - 5},${y - 10} l5,-5 l5,5Z`, '#5fbf6a');
        return plate(60) + RR(-48, -62, 96, 54, 9, '#fff3dc', '#e0b88a') + R(-47, -40, 94, 9, '#ff9ec6') + P('M-48,-56 q8,16 16,0 q8,18 16,0 q8,16 16,0 q8,18 16,0 q8,16 16,0 q8,18 16,0 V-64 H-48Z', '#ffffff', '#e8d0dc', 1.6) +
          [-34, -11, 12, 34].map((x) => Ci(x, -70, 8, '#fff', '#e8d0dc', 1.4)).join('') + sb(-24, -84) + sb(0, -88) + sb(24, -84) + R(-2, -116, 4, 20, '#8ed4ff') + P('M0,-126 q-5,6 0,11 q5,-5 0,-11Z', '#ffb347');
      } },
    { id: 'teaset', n: 'ティーセット', w: 170, h: 92, dc: 0,
      draw(c) {
        return P('M-6,-44 C16,-44 14,-66 30,-70', 'none', c.ml, 9) + P('M-6,-44 C16,-44 14,-66 30,-70', 'none', c.m, 5) + P('M-64,-52 C-90,-52 -90,-22 -62,-22', 'none', c.ml, 7) + P('M-64,-52 C-90,-52 -90,-22 -62,-22', 'none', c.m, 3.5) + El(-36, -36, 36, 32, c.M, c.ml) + El(-36, -66, 20, 6, c.s, c.sl, 2) + Ci(-36, -74, 5, c.a, c.al, 1.4) + U.heart(-36, -36, 9, c.s) +
          El(48, -6, 30, 6, c.s, c.sl, 2) + P('M24,-38 h48 q0,30 -24,32 q-24,-2 -24,-32Z', c.M, c.ml) + P('M72,-32 q14,0 12,12 q-4,8 -16,6', 'none', c.ml, 3.5) + El(48, -38, 24, 5, '#c98b4d') + P('M40,-52 q-6,-8 0,-14 M54,-54 q-6,-8 0,-14', 'none', '#fff', 3, 'opacity=".8"');
      } },
    { id: 'donuts', n: 'ドーナツ', w: 130, h: 70, rc: false,
      draw() {
        const dn = (x, y, col) => El(x, y, 25, 14, '#f2c078', '#c98f45', 2) + P(`M${x - 23},${y - 2} q6,-14 23,-14 q17,0 23,14 q-6,6 -12,1 q-5,6 -11,0 q-6,7 -12,0 q-5,5 -11,-1Z`, col, U.dark(col, 0.25), 1.6) + El(x, y - 4, 7, 3.4, '#fff8e8', '#c98f45', 1.4);
        return plate(62) + dn(-28, -20, '#ff9ec6') + dn(28, -20, '#8a5a36') + dn(0, -40, '#fff3a8') + Ci(-6, -50, 1.6, '#ff7fb2') + Ci(6, -52, 1.6, '#8ed4ff') + Ci(12, -46, 1.6, '#8de8cc');
      } },
    { id: 'juice', n: 'ジュース', w: 70, h: 104, dc: 8,
      draw(c) {
        const D = 'M-23,-78 L23,-78 L17,-2 L-17,-2Z';
        return P('M6,-60 L22,-102', 'none', '#f2485c', 5) + P(D, '#ffffff', '#b9c8e0', 2.5, 'fill-opacity=".55"') + clipG(`<path d="${D}"/>`, R(-30, -62, 60, 64, c.m) + Ci(-8, -40, 4, '#fff', null, 0, 'opacity=".6"') + Ci(6, -22, 3, '#fff', null, 0, 'opacity=".6"')) + P(D, 'none', '#b9c8e0', 2.5) +
          Ci(-22, -80, 12, '#ffb347', '#d9782a', 2) + Ci(-22, -80, 7, '#ffe37a') + P('M-16,-70 q-2,24 2,50', 'none', '#fff', 4, 'opacity=".7"');
      } },
    { id: 'parfait', n: 'パフェ', w: 80, h: 132, rc: false,
      draw() {
        const D = 'M-28,-86 L28,-86 L8,-22 L-8,-22Z';
        return El(0, -5, 20, 6, '#eaf8ff', '#9fc4e8', 2) + R(-3, -24, 6, 20, '#eaf8ff', 'stroke="#9fc4e8" stroke-width="2"') + P(D, '#ffffff', '#9fc4e8', 2.5, 'fill-opacity=".6"') + clipG(`<path d="${D}"/>`, R(-30, -44, 60, 24, '#ffb3d1') + R(-30, -62, 60, 18, '#fff8ea') + R(-30, -78, 60, 16, '#f2485c', 'opacity=".8"') + R(-30, -90, 60, 12, '#fff')) + P(D, 'none', '#9fc4e8', 2.5) +
          P('M14,-86 L26,-122 L34,-118 L24,-86Z', '#f7c46c', '#c98a35', 1.6) + Ci(-10, -94, 13, '#fff', '#e8d0dc', 1.6) + Ci(8, -98, 12, '#fff', '#e8d0dc', 1.6) + Ci(-2, -108, 11, '#fff', '#e8d0dc', 1.6) + Ci(-2, -122, 7, '#f2485c', '#b8182e', 1.4) + P('M-2,-128 q2,-8 8,-9', 'none', '#7a4a2a', 1.6);
      } },
    { id: 'pizza', n: 'ピザ', w: 150, h: 62, rc: false,
      draw() {
        return El(0, -28, 70, 26, '#f7c46c', '#c98a35') + El(0, -30, 60, 20, '#ff8a70') + El(0, -30, 54, 17, '#ffe08a') + [[-28, -34], [8, -40], [30, -28], [-6, -22], [-40, -24]].map((p) => El(p[0], p[1], 8, 4.6, '#f2485c', '#b8182e', 1.2)).join('') +
          [[-14, -40], [20, -20], [40, -36], [-26, -18]].map((p) => El(p[0], p[1], 4.6, 2.6, '#5fbf6a')).join('') + P('M0,-30 L-60,-30 M0,-30 L42,-44 M0,-30 L42,-16', 'none', '#e0a850', 1.6, 'opacity=".8"');
      } },
    { id: 'fruit', n: 'フルーツ', w: 130, h: 100, rc: false,
      draw() {
        return P('M-44,-62 C-20,-90 30,-84 40,-54', 'none', '#ffd24a', 15) + P('M-44,-62 C-20,-90 30,-84 40,-54', 'none', '#fff07a', 9) + Ci(-22, -52, 21, '#f2485c', '#b8182e') + P('M-22,-72 q2,-10 10,-12', 'none', '#7a4a2a', 2.6) + P('M-18,-76 q12,-8 18,0 q-10,6 -18,0Z', LEAF, LEAFL, 1.4) +
          [[22, -56], [36, -56], [29, -44], [16, -44], [42, -44], [29, -66]].map((p) => Ci(p[0], p[1], 9, '#a47bf5', '#6a3ac8', 1.6)).join('') + P('M-58,-40 C-58,-8 -30,0 0,0 C30,0 58,-8 58,-40Z', '#8ed4ff', '#3a8fe8') + P('M-52,-30 q52,14 104,0', 'none', '#fff', 4, 'opacity=".7"');
      } },
    { id: 'bento', n: 'おべんとう', w: 142, h: 72, rc: false,
      draw() {
        return RR(-66, -52, 132, 50, 14, '#f2485c', '#b8182e') + RR(-58, -60, 116, 42, 12, '#fff8ea', '#e0b88a', 2) + P('M2,-58 v38', 'none', '#e0b88a', 2) + P('M-50,-24 L-30,-56 L-10,-24Z', '#ffffff', '#d8d0e0', 2) + R(-39, -34, 18, 10, '#3a3446') + Ci(-30, -42, 2.6, '#f2485c') +
          RR(10, -54, 24, 14, 4, '#ffe37a', '#e0a020', 1.6) + Ci(46, -46, 8, '#f2485c', '#b8182e', 1.6) + P('M46,-54 l3,-4', 'none', LEAFL, 2.4) + Ci(18, -30, 7, LEAF, LEAFL, 1.6) + Ci(28, -32, 6, LEAF, LEAFL, 1.6) + RR(36, -34, 16, 10, 4, '#ff9a70', '#d9603a', 1.6);
      } },
    { id: 'pudding', n: 'プリン', w: 92, h: 84, rc: false,
      draw() {
        return plate(42) + P('M-30,-10 L-22,-52 Q0,-58 22,-52 L30,-10 Q0,-2 -30,-10Z', '#ffe08a', '#e0a850') + P('M-22,-52 Q0,-58 22,-52 L24,-42 Q0,-34 -24,-42Z', '#a8623c', '#6a3a1e', 1.6) + Ci(0, -60, 11, '#fff', '#e8d0dc', 1.6) + Ci(0, -72, 6.5, '#f2485c', '#b8182e', 1.4) + P('M0,-78 q2,-7 7,-8', 'none', '#7a4a2a', 1.6) + P('M-22,-34 q-2,10 -4,18', 'none', '#fff', 4, 'opacity=".6"');
      } },
  ]);

  /* ---------- なかま（キャラ・おとも） ---------- */
  const CS = 0.52, PS = 0.74;
  const charaDraw = (ch, env) => {
    const st = (env && env.sts && env.sts[ch]) || A.defaultOf(ch);
    return `<g transform="scale(${CS}) translate(-300,-772)">${A.character(Object.assign({}, st, { pet: 0 }), { live: !!(env && env.live) })}</g>`;
  };
  reg('chara', { layer: 'floor', small: 1, rc: false, tap: 'chara', w: 232, h: 372 }, [
    { id: '@girl', n: 'おんなのこ', chara: 0, draw: (c, it, env) => charaDraw(0, env) },
    { id: '@boy', n: 'おとこのこ', chara: 1, draw: (c, it, env) => charaDraw(1, env) },
  ]);
  reg('pet', { layer: 'floor', small: 1, rc: false, tap: 'pet', w: 104, h: 124 }, A.PETS.filter((p) => p.draw).map((p) => ({
    id: 'pet:' + p.id, n: p.n, h: Math.round((774 - p.tb[1]) * PS) + 4,
    draw: () => `<g transform="scale(${PS}) translate(-500,-774)">${p.draw()}</g>`,
  })));

  /* ================= へやの くみたて ================= */
  const LAYERS = ['wall', 'rug', 'floor', 'top'];
  A.hDraw = function (it, env) {
    const d = A.hItem[it.k]; if (!d) return '';
    const c = A.hscheme(it.c == null ? d.dc | 0 : it.c);
    return c.defs + d.draw(c, it, env || {});
  };
  const shadow = (d) => (d.layer === 'floor' ? El(0, -3, d.w * (d.chara != null ? 0.26 : 0.45), Math.min(13, d.w * 0.04 + 5), '#5a3070', null, 0, 'opacity=".13"') : '');
  /* 1こ ぶんの <g>（そと：いち ／ なか：おおきさ・むき） */
  A.hItemG = function (it, env, attrs) {
    const d = A.hItem[it.k]; if (!d) return '';
    const s = it.s || 1;
    return `<g ${attrs || ''} transform="translate(${f(it.x)},${f(it.y)})"><g class="hi-b"><g transform="scale(${f(s * (it.f ? -1 : 1))},${f(s)})">${shadow(d)}${A.hDraw(it, env)}</g></g></g>`;
  };
  /* えがく じゅんばん：かべ → ラグ → ゆかの もの（おくから てまえ）→ うえ。ちいさい ものは かぐの うえに のせられる */
  A.hOrder = function (items) {
    const ok = items.map((_, i) => i).filter((i) => A.hItem[items[i].k]);
    const D = (i) => A.hItem[items[i].k];
    const bigs = ok.filter((i) => D(i).layer === 'floor' && !D(i).small);
    const key = {};
    ok.forEach((i) => {
      const d = D(i), it = items[i];
      if (d.layer !== 'floor') { key[i] = 0; return; }
      let k = it.y;
      if (d.small) bigs.forEach((j) => { const F = items[j], fd = D(j), s = F.s || 1; if (Math.abs(it.x - F.x) < (fd.w * s) / 2 && it.y < F.y && it.y > F.y - fd.h * s) k = Math.max(k, F.y + 0.5 + it.y * 1e-4); });
      key[i] = k;
    });
    return ok.sort((a, b) => (LAYERS.indexOf(D(a).layer) - LAYERS.indexOf(D(b).layer)) || (key[a] - key[b]) || (a - b));
  };
  /* ゆうがた・よるの あかり */
  A.roomLight = function (room) {
    const t = room.time | 0; if (!t) return '';
    let s = R(-700, -500, 2400, 1900, t === 1 ? '#ff8a3c' : '#120a44', `opacity="${t === 1 ? 0.13 : 0.4}" pointer-events="none"`);
    (room.items || []).forEach((it) => {
      const d = A.hItem[it.k]; if (!d || !d.glow || it.on === 0) return;
      const gl = d.glow, sc = it.s || 1;
      s += glow(it.x + gl[0] * sc * (it.f ? -1 : 1), it.y + gl[1] * sc, gl[2] * sc, gl[3] || '#fff3b0', t === 1 ? 0.4 : 0.7);
    });
    return s;
  };
  A.roomInner = function (room, env) {
    env = Object.assign({ time: room.time | 0 }, env || {});
    const items = room.items || [];
    return A.roomBg(room) + A.hOrder(items).map((i) => A.hItemG(items[i], env)).join('') + A.roomLight(room);
  };
  A.roomSvg = function (room, env, o) {
    o = o || {};
    const vb = o.vb || [0, 0, A.ROOM.W, A.ROOM.H], cid = U.uid('rv');
    let inner = A.roomInner(room, env);
    if (o.frame && A.frame) inner += A.frame(o.frame, vb, o.date);
    if (o.stamps && A.stamp) inner += o.stamps.map((p) => A.stamp(p.id, p.x, p.y, p.s, p.r)).join('');
    const wh = o.w ? ` width="${o.w}" height="${Math.round(o.w * vb[3] / vb[2])}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}"${wh}${o.attrs ? ' ' + o.attrs : ''}>` +
      `<defs><clipPath id="${cid}"><rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}"/></clipPath></defs><g clip-path="url(#${cid})">${inner}</g></svg>`;
  };
  /* パネルの サムネ */
  A.hThumb = function (d, env) {
    const pad = 8, it = { k: d.id, on: 1 };
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-d.w / 2 - pad} ${-d.h - pad} ${d.w + pad * 2} ${d.h + pad * 2}">${A.hDraw(it, env)}</svg>`;
  };

  /* ---------- さいしょの おへや ---------- */
  const wi = (id) => Math.max(0, A.H_WALLS.findIndex((x) => x.id === id)), fi = (id) => Math.max(0, A.H_FLOORS.findIndex((x) => x.id === id));
  const I = (k, x, y, o) => Object.assign({ k: k, x: x, y: y, s: 1 }, o || {});
  A.houseDefault = function () {
    return { cur: 0, rooms: [
      { wall: wi('stripe'), floor: fi('wood'), time: 0, items: [
        I('window', 330, 336), I('garland', 690, 150), I('clock', 560, 246), I('pic_cat', 800, 300),
        I('rug_round', 470, 768), I('bookshelf', 118, 596), I('bed', 800, 612), I('flamp', 624, 590), I('ltable', 300, 716), I('teaset', 300, 640),
        I('teddy', 850, 514), I('cushion', 742, 520, { c: 1 }), I('monstera', 940, 770), I('blocks', 160, 780), I('pet:cat', 640, 790),
        I('@girl', 404, 744), I('@boy', 528, 764),
      ] },
      { wall: wi('star'), floor: fi('bluecarpet'), time: 0, items: [I('roundwin', 500, 330), I('moon', 760, 230), I('@boy', 500, 740)] },
      { wall: wi('sky'), floor: fi('grass'), time: 0, items: [I('tree', 150, 640), I('tent', 760, 640), I('@girl', 470, 740)] },
    ] };
  };
})(window);
